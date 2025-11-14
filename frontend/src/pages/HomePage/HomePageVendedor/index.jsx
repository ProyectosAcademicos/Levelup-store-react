import React from 'react'
import HeaderVen from '../../../components/Header/HeaderVendedor/index.jsx';
import HomeContenido from '../../../components/HomeContentido/HomeContenido.jsx';
import Footer from '../../../components/Footer/Footer.jsx';



const HomePageVendedor = () => {
    return(
        <div>
            <HeaderVen/>
            <HomeContenido/>
            <Footer/>
        </div>
        
    )
}

export default HomePageVendedor;