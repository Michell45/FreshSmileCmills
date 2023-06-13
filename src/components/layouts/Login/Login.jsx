import React, { useState, useEffect } from "react";
import "./Login.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setRol }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalType, setModalType] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    if (modalType === "success") {
      setTimeout(() => {
        setModalText("");
        setModalType("");
      }, 5000);
    }
  }, [modalType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let url;
      if (role === "paciente") {
        url = "https://freshsmile.azurewebsites.net/login/paciente";
      } else if (role === "especialista") {
        url = "https://freshsmile.azurewebsites.net/login/especialista";
      } else {
        throw new Error("Rol no válido");
      }

      const accessToken = localStorage.getItem("accessToken"); // Obtener el token de acceso del almacenamiento local
      const response = await axios.post(url, { email, password })

      setLoading(false);

      if (response.status === 200) {
        const data = response.data;
        setModalText(data.message);
        setModalType("success");
        setRol(role);
        navigate("/Inicio");
        localStorage.setItem("accessToken",response.data.token);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("rol", role);
      } else {
        const errorData = response.data;
        throw new Error(errorData.message);
      }
    } catch (error) {
      setModalText(error.message);
      setModalType("error");
    }
  };

  useEffect(() => {
    if (modalType === "error") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: modalText,
        customClass: {
          confirmButton: "custom-swal-button",
        },
        buttonsStyling: false,
      });
    }
  }, [modalType]);

  return (

    <div className="login-container">
      <div className="left-login">
        <img src="https://i.pinimg.com/736x/a4/8c/b2/a48cb248e8b5886a8843daf3dbb1fa15.jpg" alt="Imagen de inicio de sesión" className="login-image" />
      </div>
      <div className="right-login">
        <h1 className="login-title">Iniciar Sesión</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Correo:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label className="login-label">
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label className="login-label">
            Rol:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="login-select"
            >
              <option value="">Seleccione un rol</option>
              <option value="paciente">Paciente</option>
              <option value="especialista">Especialista</option>
            </select>
          </label>
          <br />
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;