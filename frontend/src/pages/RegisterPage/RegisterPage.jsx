// RegisterPage.jsx
import React, { useState, useEffect } from "react";
import RegisterContenido from "../../components/RegisterContenido.jsx/RegisterContenido.jsx";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";


const RegisterPage = () => {
    return (
        <div>
            <Header/>
            <RegisterContenido />
            <Footer/>
        </div>
    
    );
}

export default RegisterPage;