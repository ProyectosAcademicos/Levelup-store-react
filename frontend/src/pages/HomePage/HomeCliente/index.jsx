import React from 'react';
import HeaderCliente from '../../../components/Header/HeaderCliente/index.jsx';
import HomeContenido from '../../../components/HomeContentido/HomeContenido.jsx';
import Footer from '../../../components/Footer/Footer.jsx';



const HomeCliente = () => {
    return(
        <div>
            <HeaderCliente/>
            <HomeContenido/>
            <Footer/>
        </div>
        
    )
}

export default HomeCliente;