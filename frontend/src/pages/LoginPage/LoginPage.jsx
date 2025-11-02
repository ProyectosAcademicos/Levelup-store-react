import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import LoginContenido from "../../components/LoginContenido/LoginContenido.jsx";

const LoginPage = () => {
  return (
    <div>
      <Header />
      <LoginContenido />
      <Footer />
    </div>
  );
};

export default LoginPage;
