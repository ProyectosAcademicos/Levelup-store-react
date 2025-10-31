import React from 'react'
import Header from '../../components/Header/Header.jsx';
import HomeContenido from '../../components/HomeContentido/HomeContenido.jsx';
import Footer from '../../components/Footer/Footer.jsx';



const HomePage = () => {
    return(
        <div>
            <Header/>
            <HomeContenido/>
            <Footer/>
        </div>
        
    )
}

export default HomePage;