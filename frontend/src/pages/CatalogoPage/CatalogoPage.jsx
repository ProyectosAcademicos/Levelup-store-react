import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CatalogoContenido from "../../components/CatalogoContenido/CatalogoContenido.jsx";

const CatalogoPage = () => {
  return (
    <div>
      <Header />
      <CatalogoContenido />
      <Footer />
    </div>
  );
};

export default CatalogoPage;
