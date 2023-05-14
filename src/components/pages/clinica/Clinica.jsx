import React from "react";
import { Link } from "react-router-dom";
import "./Clinica.css";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import { Footer } from "../../layouts/footer/Footer";
const myImage = new CloudinaryImage('sample', {cloudName: 'dfvxujvf8'}).resize(fill().width(100).height(150));

export const Clinica = () => {
  return (
    <>
      {/* <div className="barra">
        <h2>¿Quienes Somos?</h2>
      </div> */}

      <h2 className="Sedes">Nuestras sedes</h2>

      {/* <div class="container-sede">
        <div className="container-sedes-div">
        <img
          src="https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852205/Fresh_Smile_Cmills/SedeArmenia_idugit.png"
          alt="sede2"
        />
          <div className="content-sede">
            <h2>Odontoestetic</h2>
            <p className="p-sede">
            <strong>Dirección:</strong> Calle 6 #16A/54 Edificio Torre
            Valparaiso
            </p>
            <p className="p-sede">
            <strong>Horario:</strong> Lunes a Viernes de 9am a 6pm
            </p>
            <button className="btn-sede">
            <Link to="/Blog"><a class="linksblog" href="#blog">Leer más</a>
              </Link></button>
          </div>
        </div>
        </div>
      <div className="container-sedes">
        <img
          src="https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852205/Fresh_Smile_Cmills/SedeArmenia_idugit.png"
          alt="sede2"
        />
        <h2>Nuestra sede en Armenia</h2>

        <ul>
          <li>
            <strong>Dirección:</strong> Calle 6 #16A/54 Edificio Torre
            Valparaiso
          </li>
          <li>
            <strong>Horario:</strong> Lunes a Viernes de 9am a 6pm
          </li>
          <li>
            <strong>Teléfono:</strong> 3103594986
          </li>
        </ul>
        <button className="botton-sede">Agendar tu Cita</button>
      </div>

      <div className="container-sedes">
        <img
          src="https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852205/Fresh_Smile_Cmills/SedeArmenia_idugit.png"
          alt="sede2"
        />
        <h2>Nuestra sede en Génova</h2>

        <ul>
          <li>
            <strong>Dirección:</strong> Carrera 11 #26A-04
          </li>
          <li>
            <strong>Horario:</strong> Lunes a Viernes de 9am a 6pm
          </li>
          <li>
            <strong>Teléfono:</strong> +3188950833
          </li>
        </ul>
        <button className="botton-sede">Agendar tu Cita</button>
      </div>

      <div className="container-sedes">
        <img
          src="https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852197/Fresh_Smile_Cmills/sedeNeiva_fuo2wn.jpg"
          alt="sede2"
        />
        <h2>Nuestra sede en Tebaida</h2>

        <ul>
          <li>
            <strong>Dirección:</strong> Calle 12 CR 5 #4/93
          </li>
          <li>
            <strong>Horario:</strong> Lunes a Viernes de 9am a 6pm
          </li>
          <li>
            <strong>Teléfono:</strong> +3188950833
          </li>
        </ul>
        <button className="botton-sede">Agendar tu Cita</button>
      </div> */}


<div class="container-wrapper-sede">
        <div className="container-sede">
        <img
          src="https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852205/Fresh_Smile_Cmills/SedeArmenia_idugit.png"
          alt="sede2"
        />
          <div className="content-div">
            <h2>Nuestra sede en Armenia</h2>
            <p className="p-sede">
            <strong>Dirección:</strong> Calle 6 #16A/54 Edificio Torre
            Valparaiso
            </p>
            <p className="p-sede">
            <strong>Horario:</strong> Lunes a Viernes de 9am a 6pm
            </p>
            <p className="p-sede">
            <strong>Teléfono:</strong> 3103594986
            </p>
           
            <button className="btn-sede">
              <Link to="/Blog">
                <a class="linksblog" href="#blog">
                Agendar tu Cita
                </a>
              </Link>
            </button>
          </div>
        </div>
        <div className="container-sede">
        <img
          src="https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852197/Fresh_Smile_Cmills/sedeNeiva_fuo2wn.jpg"
          alt="sede2"
        />
          <div className="content-div">
            <h2>Nuestra sede en Génova</h2>
            <p className="p-sede">
            <strong>Dirección:</strong> Carrera 11 #26A-04
            </p>
            <p className="p-sede">
            <strong>Horario:</strong> Lunes a Viernes de 9am a 6pm
            </p>
            <p className="p-sede">
            <strong>Teléfono:</strong> 3188950833
            </p>
            <button className="btn-sede">
              <Link to="/Blog">
                <a class="linksblog" href="#blog">
                Agendar tu Cita
                </a>
              </Link>
            </button>
          </div>
        </div>
        <div className="container-sede">
        <img
          src="https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852197/Fresh_Smile_Cmills/sedeNeiva_fuo2wn.jpg"
          alt="sede2"
        />
          <div className="content-div">
            <h2>Nuestra sede en Tebaida</h2>
            <p className="p-sede">
            <strong>Dirección:</strong> Calle 12 CR 5 #4/93
            </p>
            <p className="p-sede">
            <strong>Horario:</strong> Lunes a Viernes de 9am a 6pm
            </p>
            <p className="p-sede">
            <strong>Teléfono:</strong> 3188950833
            </p>
            <button className="btn-sede">
              <Link to="/Blog">
                <a class="linksblog" href="#blog">
                Agendar tu Cita
                </a>
              </Link>
            </button>
          </div>
        </div>    
      </div>
      <Footer />
    </>
  );
};
