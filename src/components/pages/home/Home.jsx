import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Footer } from "../../layouts/footer/Footer";
import Chatbot from "../../layouts/chatbot/Chatbot";

const myImage = new CloudinaryImage("sample", {
  cloudName: "dfvxujvf8",
}).resize(fill().width(100).height(150));

export const Home = () => {
  const [especialistas, setEspecialistas] = useState([]);

  useEffect(() => {
    const fetchEspecialistas = async () => {
      try {
        const response = await fetch(
          "https://freshsmile.azurewebsites.net/FreshSmile/Especialistas/ConsultarEspecialista"
        );
        const data = await response.json();
        const filteredEspecialistas = data.filter(
          (_, index) => index === 15 || index === 16 || index === 17
        );
        setEspecialistas(filteredEspecialistas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEspecialistas();
  }, []);

  return (
    <>
      <div className="container_banner">
        <div className="container_home">
          <h1>¡Bienvenidos a la clínica!</h1>
          <div className="container-btn">
            <button className="boton-home">
              <a
                className="linksinicio2"
                href="https://res.cloudinary.com/smilecmills/image/upload/v1683852210/Fresh_Smile_Cmills/galeria2_g3rumg.jpg"
              >
                Buscar Clínica
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="barra">
        <h2 className="">Nuestros Procedimientos</h2>
      </div>
      <div className="container-wrapper-Home">
        <div className="card-procedimientos-home">
          <img
            src="https://res.cloudinary.com/smilecmills/image/upload/v1684267038/Fresh_Smile_Cmills/pexels-karolina-grabowska-6627600_rr7web.jpg"
            alt="Título de la tarjeta 1"
            class="card-image-proce"
          />
          <button className="card-button">
            <Link to="/Procedimientos">
              <h2 className="card-title">Blanqueamiento Dental</h2>
            </Link>
          </button>
        </div>

        <div className="card-procedimientos-home">
          <img
            src="https://res.cloudinary.com/smilecmills/image/upload/v1683852202/Fresh_Smile_Cmills/carillas_hbazmk.jpg"
            alt="Título de la tarjeta 2"
            class="card-image-proce"
          />
          <button className="card-button">
            <Link to="/Procedimientos">
              <h2 className="card-title">Diseño de Sonrisa</h2>
            </Link>
          </button>
        </div>

        <div className="card-procedimientos-home">
          <img
            src="https://res.cloudinary.com/smilecmills/image/upload/v1683852210/Fresh_Smile_Cmills/implantes_keq38a.jpg"
            alt="Título de la tarjeta 3"
            class="card-image-proce"
          />
          <button className="card-button">
            <Link to="/Procedimientos">
              <h2 className="card-title">Implante Dental</h2>
            </Link>
          </button>
        </div>

      </div>

      <div className="barra-2">
      <h2 className="">Nuestros Especialistas</h2>
      </div>

      <div className="container-nosotros-home">
        {especialistas.slice(0, 3).map((especialista, index) => (
          <div className="card-nosotros-home" key={index}>
            <img
              src={especialista.foto_perfil}
              alt={`Imagen ${index + 1}`} />          
              <h3 className="nombreespecialista">{especialista.nombre_completo}</h3>
              <p className="Especialidad">Se le conoce por ser el mejor especilista en {especialista.especialidad}</p>

          </div>
        ))}
      </div>

      
      <div className="barra-2">
        <h2 className="">Sobre Nosotros</h2>
      </div>
      {/* <h2 className="title-barra">¿Quiénes Somos?</h2> */}
      <div className="container-nosotros-home2">
        <div className="image-nosotros">
          <img src="https://res.cloudinary.com/smilecmills/image/upload/v1683852217/Fresh_Smile_Cmills/nosotros_ax9xkz.jpg" alt="Imagen" />
        </div>
        <div className="content-nosotros">
          {/* <h2>¿Quiénes Somos?</h2> */}
          <p>Fresh Smile Cmills es una reconocida clínica de ortodoncia
              comprometida con ofrecer soluciones de alta calidad para la salud
              dental de nuestros pacientes. Con una amplia experiencia y
              conocimientos en el campo de la ortodoncia, nos hemos ganado la
              confianza de numerosos individuos y familias que buscan mejorar su
              sonrisa y salud bucal.</p>
            <p>Comprendemos la importancia de una sonrisa
              hermosa y saludable, no solo en términos estéticos, sino también
              en cuanto a la función y el bienestar general de nuestros
              pacientes. Por ello, nos enfocamos en brindar tratamientos
              personalizados y eficientes para corregir una amplia variedad de
              problemas dentales y maxilofaciales.</p>
          <button className="btn-nosotros-home">
          <Link to="/Nosotros">
          <a className="linksblog" href="#procedimientos">
          Conocer más
                </a>
          </Link>
         
          </button>
        </div>
      </div>


      {/* Chat WhatsAPP */}
      <div class="space-wpp">
        <a
          href="https://api.whatsapp.com/send?phone=3204415807&text=Hola, estoy interesada en sacar una cita"
          class="float"
          target="_blank "
        >
          <i class="fa fa-whatsapp my-float"></i>
        </a>
      </div>
<Chatbot/>
      <Footer />
    </>
  );
};