// CarritoPage.jsx
import React from "react";
import CarritoContenido from "../../components/CarritoContenido/CarritoContenido.jsx";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const CarritoPage = () => {
    return (
        <div>
            <Header />
            <CarritoContenido />
            <Footer />
        </div>
    );
}

export default CarritoPage;