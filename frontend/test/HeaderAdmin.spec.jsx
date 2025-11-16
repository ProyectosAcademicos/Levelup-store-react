import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../src/components/UsuariosContenido/Sidebar/SideBarAdmin.jsx";

const renderSidebarAdmin = () => {
    render(
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    );
}

describe("SidebarAdmin Component", () => {
    it("renderiza el título Herramientas", () => {
        renderSidebarAdmin();
        expect(screen.getByText("Herramientas")).toBeInTheDocument();
    })
});