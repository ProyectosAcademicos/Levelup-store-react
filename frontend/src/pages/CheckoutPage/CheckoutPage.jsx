import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CheckoutContenido from "../../components/checkout/CheckoutContenido.jsx";

const CheckoutPage = () => {
    return (
        <div>
            <Header />
            <CheckoutContenido />
            <Footer />
        </div>
    );
};

export default CheckoutPage;
