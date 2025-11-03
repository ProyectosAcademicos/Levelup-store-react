import React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/UsuariosContenido/Sidebar/Sidebar.jsx";

const ClienteProfile = () => {
    return(
        <div className="d-flex flex-row p-0 m-0">
            <Sidebar />
            <main className="flex-grow-1 p-3">
                 <Outlet /> 
            </main>
        </div>
    )
};

export default ClienteProfile;
