import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarVendedor from "../../components/UsuariosContenido/Sidebar/SidebarVendedor.jsx";
import { Outlet } from "react-router-dom";

const VendedorProfile = () => {
    return(
        <div className="d-flex flex-row p-0 m-0">
            <SidebarVendedor />
            <div className="flex-grow-1 p-3">
                <Outlet />
            </div>
        </div>
    )
};


export default VendedorProfile;
