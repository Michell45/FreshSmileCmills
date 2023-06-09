import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from '../Cloudinary/CloudinaryUploadWidget';


const RegistroFormulario = () => {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombrescompletos, setNombrescompletos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [procedimientos, setProcedimientos] = useState([]);
  const [especialidad, setEspecialidad] = useState("");
  const [foto, setFoto] = useState("");
  const [codigoValido, setCodigoValido] = useState(false);

  const handleTipoDocumentoChange = (event) => {
    setTipoDocumento(event.target.value);
  };

  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10}$/;

  const handleNumeroDocumentoChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setNumeroDocumento(value);
    }
  };

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los procedimientos
    axios.get('https://freshsmile.azurewebsites.net/FreshSmile/ConsultarProcedimientos')
      .then(response => {
        // Guardar los procedimientos en el estado
        setProcedimientos(response.data);
      })
      .catch(error => {
        // Manejar el error en caso de que la solicitud falle
        console.error('Error al obtener los procedimientos:', error);
      });
  }, []);

  const handleNombresChange = (event) => {
    const value = event.target.value;
    if (/^[a-zA-ZñÑ\s]*$/.test(value)) {
      setNombrescompletos(value);
    }
  };


  const handleDireccionChange = (event) => {
    setDireccion(event.target.value);
  };

  const handleTelefonoChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setTelefono(value);
    }
  };

  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
  };

  const handleContraseñaChange = (event) => {
    const contraseña = event.target.value;
    setContraseña(contraseña);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setCodigo("");
    if (codigoValido) {
      handleGuardarClick();
    }
  };
  const handleGuardarClick = () => {
    handleSubmit();
  };
  
  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };

  const handleEspecialidadChange = (event) => {
    setEspecialidad(event.target.value);
  };

  const handleRolChange = (event) => {
    setRol(event.target.value);
    if (event.target.value === "Especialista") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };
  const handlePasswordClick = () => {
    Swal.fire({
      icon: "info",
      title: "Recordatorio",
      text: "La contraseña debe tener 10 caracteres.",
      customClass: {
        confirmButton: "custom-swal-button",
      },
      buttonsStyling: false,
    });
  };

  const opcionesTipoDocumento = [
    { value: "Cédula de ciudadanía", label: "Cédula de ciudadanía" },
    { value: "Tarjeta de identidad", label: "Tarjeta de identidad" },
    { value: "Cédula de extranjería", label: "Cédula de extranjería" },
    // Add more options as needed
  ];

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Inicio de sesion");
  };

  const validarCodigo = async () => {
    try {
      const response = await axios.get(
        "https://freshsmile.azurewebsites.net/FreshSmile/ConsultarCodigo"
      );

      const codigos = response.data; // Arreglo de objetos de códigos
      const codigoValido = codigos.some((obj) => obj.codigo === codigo);

      return codigoValido;
    } catch (error) {
      console.error("Error al validar el código:", error);
      // Manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
      throw error; // Opcionalmente, puedes lanzar el error para que se maneje en otro lugar
    }
  };

  const validarCorreo = async (correo, rol) => {
    let apiEndpoint = "";

    if (rol === "Especialista") {
      apiEndpoint =
        "https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ConsultarEspecialista";
    } else if (rol === "Paciente") {
      apiEndpoint =
        "https://freshsmile.azurewebsites.net/FreshSmile/ConsultarPacientes";
    }

    try {
      const response = await axios.get(apiEndpoint);
      const usuarios = response.data;
      const correoRegistrado = usuarios.some(
        (usuario) => usuario.correo === correo
      );
      return correoRegistrado;
    } catch (error) {
      console.error("Error al validar el correo:", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }    

    if (numeroDocumento.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Número de documento inválido",
        text: "El número de documento debe tener exactamente 10 caracteres.",
      });
      return; // Detener el proceso de registro
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Swal.fire({
        icon: "error",
        title: "Correo electrónico inválido",
        text: "La dirección de correo electrónico no es válida.",
        customClass: {
          confirmButton: "custom-swal-button",
        },
      });
      return;
    }
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10}$/;
    if (regex.test(contraseña)) {
      // Aquí puedes hacer lo que necesites con la contraseña válida
      console.log("Contraseña válida:", contraseña);
    }
    let apiEndpoint = "";
    let datosFormulario = {};

    if (rol === "Especialista") {
      const codigoValido = await validarCodigo();

      if (!codigoValido) {
        Swal.fire({
          icon: "error",
          title: "Código inválido",
          text: "El código ingresado no es válido.",
        });
        return;
      }

      apiEndpoint =
        "https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/CrearEspecialista";
      datosFormulario = {
        identificacion_especialista: numeroDocumento,
        tipo_documento: tipoDocumento,
        nombre_completo: nombrescompletos,
        telefono: telefono,
        direccion: direccion,
        especialidad: especialidad,
        correo: correo,
        contraseña: contraseña,
        foto_perfil : foto
      };
    } else if (rol === "Paciente") {
      apiEndpoint =
        "https://freshsmile.azurewebsites.net/FreshSmile/CrearPacientes";
      datosFormulario = {
        identificacion_paciente: numeroDocumento,
        tipo_documento: tipoDocumento,
        nombre_completo: nombrescompletos,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
        contraseña: contraseña,
      };
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosFormulario),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "¡Se ha registrado correctamente!",
        }).then(() => {
          // Resetear los valores de los campos
          setTipoDocumento("");
          setNumeroDocumento("");
          setNombrescompletos("");
          setDireccion("");
          setTelefono("");
          setEspecialidad("");
          setCorreo("");
          setContraseña("");
          setRol("");
          setCodigo("");
          setFoto("");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en el registro",
          text: "Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: "Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        buttonsStyling: false,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(foto)
  },[foto])

  return (
    <div className="Registro">
      <div className="left-side">
        {/* <img className="img-left-side" src="https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852201/Fresh_Smile_Cmills/equipo_ychejy.png" alt="" /> */}
        <h1 className="title-left"></h1>
      </div>
      <div className="right-side">
        <h1>Registro</h1>
        <form className="form-input-container" onSubmit={handleSubmit}>
          <div className="form-group">
            {/* <h1 className="registro-h1">Registro</h1> */}
            <label htmlFor="tipoDocumento">
              <i className="fas fa-id-card" id='i'></i> Tipo de documento</label>
            <select
              id="tipoDocumento"
              className="form-input-select"
              value={tipoDocumento}
              onChange={handleTipoDocumentoChange}
            >
              <option value="">Seleccione un tipo de documento</option>
              {opcionesTipoDocumento.map((opcion) => (
                <option key={opcion.value} value={opcion.value}>
                  {opcion.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="numeroDocumento"><i className="fas fa-file-alt" id='i'></i> Número de documento</label>

            <input
              type="text"
              id="numeroDocumento"
              value={numeroDocumento}
              onChange={handleNumeroDocumentoChange}
              required
              placeholder='Aquí digite su número de documento'
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombrescompletos"><i className="fas fa-user" id='i'></i>Nombre completo</label>
            <input
              type="text"
              id="nombrescompletos"
              value={nombrescompletos}
              onChange={handleNombresChange}
              required
              placeholder='Aquí digite su nombre completo'
            />
          </div>
          {rol === "Especialista" && (
            <>
              <div className="form-group">
                <label>Especialidad</label>
                <select
                  className="form-control"
                  value={especialidad}
                  onChange={handleEspecialidadChange}
                >
                  <option value="">Seleccionar especialidad</option>
                  {procedimientos.map(procedimiento => (
                    <option key={procedimiento.id} value={procedimiento.nombre}>
                      {procedimiento.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group form-img" id="fotoespecialista">
                <p>Sube una foto tuya (laboral) </p>
                <br></br>
                <br></br>
                <CloudinaryUploadWidget sendInfo={setFoto}/>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="direccion"><i className="fas fa-map-marker-alt" id='i'></i> Dirección
            </label>
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={handleDireccionChange}
              required
              placeholder='Aquí digite su dirección'
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono"><i className="fas fa-phone" id='i'></i>Teléfono</label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={handleTelefonoChange}
              required
              placeholder='Aquí digite su teléfono'
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo" id='correo'><i className="fas fa-envelope" id='i'></i>Correo electrónico</label>
            <input
              type="email"
              id="correoi"
              value={correo}
              onChange={handleCorreoChange}
              required
              placeholder='Aquí digite su correo electrónico'
            />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña"><i className="fas fa-lock" id='i'></i>Contraseña</label>
            <input
              type="password"
              id="contraseña"
              value={contraseña}
              onChange={handleContraseñaChange}
              onClick={handlePasswordClick}
              required
              placeholder='Aquí digite su contraseña'
            />
          </div>
          <div className="form-group">
            <label htmlFor="rol"><i className="fas fa-user" id='i'></i>Rol</label>
            <select
              id="rol"
              value={rol}
              onChange={handleRolChange}
              className="form-input-select"
            >
              <option value="">Seleccione un rol</option>
              <option value="Especialista" onClick={handleOpenModal} >Especialista</option>
              <option value="Paciente">Paciente</option>
            </select>
          </div>
          <button
            className="BotonRegistro"
            type="submit"
            onClick={handleSubmit}
          >
            Registrar
          </button>

          <div className="login-link">
            <p>¿Ya tienes una cuenta?</p>
            <button className="btn btn-link" onClick={handleLoginClick}>
              Iniciar sesión
            </button>
          </div>
        </form>
        {rol === "Especialista" && (
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
            className="custom-modal" // Aplica una clase CSS personalizada a la ventana modal
          >
            <Modal.Header>
              <Modal.Title className="ModalTitle">Ingresar código</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className="InputCodigo"
                type="text"
                value={codigo}
                onChange={handleCodigoChange}
                placeholder="Ingrese el código"
              />
            </Modal.Body>
            <Modal.Footer>
              <button className="BotonModalCancelar" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button className="BotonModalGuardar" onClick={handleGuardarClick}>
                Guardar
              </button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default RegistroFormulario;