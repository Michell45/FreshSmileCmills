import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/home/Home";
import { Header } from "./components/layouts/header/Header";
import { Footer } from "./components/layouts/footer/Footer";
import { Procedimientos } from "./components/pages/procedimientos/Procedimientos";
import { Nosotros } from "./components/pages/nosotros/Nosotros";
import { Register } from "./components/layouts/Register/Register";
import { Blog } from "./components/pages/blog/Blog";
import Contacto from "./components/pages/contacto/Contacto";
import { Clinica } from "./components/pages/clinica/Clinica";
import { Informacion1 } from "./components/pages/procedimientos/Informacion1/Informacion1";
import { Informacion2 } from "./components/pages/procedimientos/Informacion2/Informacion2";
import { Informacion3 } from "./components/pages/procedimientos/Informacion3/Informacion3";
import { Informacion4 } from "./components/pages/procedimientos/Informacion4/Informacion4";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Procedimientos" element={<Procedimientos />} />
        <Route path="/Register/Register" element={<Register />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Clinica" element={<Clinica />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/Informacion1" element={<Informacion1 />} />
        <Route path="/Informacion2" element={<Informacion2 />} />
        <Route path="/Informacion3" element={<Informacion3 />} />
        <Route path="/Informacion4" element={<Informacion4 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
