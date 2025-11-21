import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin/index.jsx';
import HomeContenido from '../../../components/HomeContentido/HomeContenido.jsx';
import FooterAdmin from '../../../components/Footer/Footer.jsx';



const HomePageAdmin = () => {
    return(
        <div>
            <HeaderAdmin/>
            <HomeContenido/>
            <FooterAdmin/>
        </div>
        
    )
}

export default HomePageAdmin;