import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarAdmin from "../../components/UsuariosContenido/Sidebar/SideBarAdmin.jsx";
import { Outlet } from "react-router-dom";

const AdminProfile = () => {
    return(
        <div className="d-flex flex-row p-0 m-0">
            <SidebarAdmin />
            <main className="flex-grow-1 p-3">
                 <Outlet /> 
            </main>
        </div>
    )
};

export default AdminProfile;
