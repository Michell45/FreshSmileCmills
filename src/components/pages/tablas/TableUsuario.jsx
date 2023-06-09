import React, { useEffect, useState } from 'react';
import './tables.css';
import swal from 'sweetalert';
import 'sweetalert2/src/sweetalert2.scss';

const TableUsuario = () => {
  const [data, setData] = useState([]);
  const [especialistas, setEspecialistas] = useState({});
  const [procedimientos, setProcedimientos] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarCitas')
      .then(response => response.json())
      .then(data => {
        // Filtrar las citas por el id_paciente que coincida con userId
        const citasUsuario = data.filter(cita => cita.id_paciente === parseInt(userId));
        setData(citasUsuario);

        // Obtener una lista de identificaciones de especialistas únicos en las citas
        const especialistasIds = [...new Set(citasUsuario.map(cita => cita.id_especialista))];

        // Realizar una solicitud para obtener los nombres de los especialistas
        Promise.all(
          especialistasIds.map(id =>
            fetch(`https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/BuscarEspecialista/${id}`)
              .then(response => response.json())
          )
        )
          .then(especialistasData => {
            // Crear un objeto con las identificaciones de los especialistas como clave y sus nombres como valor
            const especialistasMap = {};
            especialistasData.forEach(especialista => {
              especialistasMap[especialista.identificacion_especialista] = especialista.nombre_completo;
            });
            setEspecialistas(especialistasMap);
          })
          .catch(error => console.error(error));

        // Obtener una lista de identificaciones de procedimientos únicos en las citas
        const procedimientosIds = [...new Set(citasUsuario.map(cita => cita.id_procedimiento))];

        fetch('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarProcedimientos')
          .then(response => response.json())
          .then(procedimientosData => {
            // Filtrar los procedimientos por los ids coincidentes
            const procedimientosFiltrados = procedimientosData.filter(procedimiento =>
              procedimientosIds.includes(procedimiento.identificacion_procedimientos)
            );

            // Crear un objeto con las identificaciones de los procedimientos como clave,
            // sus nombres y costos como valores
            const procedimientosMap = {};
            procedimientosFiltrados.forEach(procedimiento => {
              procedimientosMap[procedimiento.identificacion_procedimientos] = {
                nombre: procedimiento.nombre,
                costo: procedimiento.costo
              };
            });
            setProcedimientos(procedimientosMap);
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }, [userId]);

  const formatFechaCreacion = fecha => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };

  const modificarEstadoCita = (idCita) => {
    const accessToken = localStorage.getItem('accessToken');
  
    const updatedData = data.map(cita => {
      if (cita.identificacion_citas === idCita) {
        // Actualizar el estado_cita localmente a "Cancelada"
        return { ...cita, estado_cita: 'Cancelada' };
      }
      return cita;
    });
  
    // Actualizar los datos localmente
    setData(updatedData);
  
    // Realizar la solicitud PUT a la API para actualizar el estado de la cita
    fetch(`https://freshsmile.azurewebsites.net/FreshSmile/ModificarCita/${idCita}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ estado_cita: 'Cancelada' }) // Enviar el nuevo estado en el cuerpo de la solicitud
    })
      .then(response => {
        if (response.ok) {
          // Mostrar mensaje de éxito si la solicitud es exitosa
          swal('Cita cancelada', 'La cita ha sido cancelada exitosamente', 'success');
        } else {
          // Mostrar mensaje de error si la solicitud no es exitosa
          swal('Error', 'Ocurrió un error al cancelar la cita', 'error');
          // Revertir los cambios locales en caso de error
          setData(data);
        }
      })
      .catch(error => {
        console.error(error);
        swal('Error', 'Ocurrió un error al cancelar la cita', 'error');
        // Revertir los cambios locales en caso de error
        setData(data);
      });
  };
  

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Identificación de la cita</th>
            <th>Número de Documento</th>
            <th>Nombre Completo</th>
            <th>Tipo de Documento</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Especialista</th>
            <th>Identificacion Paciente</th>
            <th>Motivo</th>
            <th>Fecha de Creacion</th>
            <th>Estado Cita</th>
            <th>Valor cita</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.identificacion_citas}</td>
              <td>{item.numero_documento}</td>
              <td>{item.nombre_completo}</td>
              <td>{item.tipo_documento}</td>
              <td>{item.fecha}</td>
              <td>{item.hora}</td>
              <td>{especialistas[item.id_especialista]}</td>
              <td>{item.id_paciente}</td>
              <td>{procedimientos[item.id_procedimiento]?.nombre}</td>
              <td>{formatFechaCreacion(item.fecha_de_creacion)}</td>
              <td>{item.estado_cita}</td>
              <td>{procedimientos[item.id_procedimiento]?.costo?.toFixed(3)}</td>
              <td>
              {item.estado_cita === 'Programada' && (
  <button className="cancel-button" onClick={() => modificarEstadoCita(item.identificacion_citas)}>
    Cancelar
  </button>
)}

</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsuario;
