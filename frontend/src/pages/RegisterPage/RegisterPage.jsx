// RegisterPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import "./RegisterPage.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const api = axios.create({ baseURL: API_BASE });

const RegisterPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        rut: "",
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        telefono: "",
        direccion: "",
        regionId: "",
        comunaId: "",
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);

    // --- Cargar regiones al montar ---
    useEffect(() => {
        api.get("/api/regiones")
            .then(res => setRegiones(res.data))
            .catch(err => console.error("Error cargando regiones", err));
    }, []);

    // --- Cargar comunas cuando cambia la región ---
    useEffect(() => {
        if (!form.regionId) {
            setComunas([]);
            setForm(prev => ({ ...prev, comunaId: "" }));
            return;
        }
        api.get(`/api/comunas/region/${form.regionId}`)
            .then(res => setComunas(res.data))
            .catch(err => {
                console.error("Error cargando comunas", err);
                setComunas([]);
            });
    }, [form.regionId]);

    const handleChange = e => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
    };

    const validate = () => {
        const err = {};
        if (!form.rut) err.rut = "RUT obligatorio.";
        if (!form.nombre) err.nombre = "Nombre obligatorio.";
        if (!form.apellido) err.apellido = "Apellido obligatorio.";
        if (!form.correo) err.correo = "Correo obligatorio.";
        if (!form.contrasena) err.contrasena = "Contraseña obligatoria.";
        if (!form.direccion) err.direccion = "Dirección obligatoria.";
        if (!form.regionId) err.regionId = "Seleccione una región.";
        if (!form.comunaId) err.comunaId = "Seleccione una comuna.";
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setApiError("");
        if (!validate()) return;

        try {
            await api.post("/api/auth/register", {
                ...form,
                regionId: Number(form.regionId),
                comunaId: Number(form.comunaId),
            });
            alert("Registro exitoso. Redirigiendo al login...");
            navigate("/login");
        } catch (err) {
            console.error(err);
            setApiError(err.response?.data?.message || "Error inesperado.");
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={7} lg={5}>
                    <Card className="shadow-lg p-4">
                        <h3 className="text-center mb-4">Registro de Usuario</h3>
                        {apiError && <Alert variant="danger">{apiError}</Alert>}

                        <Form onSubmit={handleSubmit} noValidate>
                            <Form.Group className="mb-3" controlId="rut">
                                <Form.Label>RUT</Form.Label>
                                <Form.Control type="text" value={form.rut} onChange={handleChange} isInvalid={!!errors.rut} />
                                <Form.Control.Feedback type="invalid">{errors.rut}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" value={form.nombre} onChange={handleChange} isInvalid={!!errors.nombre} />
                                <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="apellido">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" value={form.apellido} onChange={handleChange} isInvalid={!!errors.apellido} />
                                <Form.Control.Feedback type="invalid">{errors.apellido}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="correo">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" value={form.correo} onChange={handleChange} isInvalid={!!errors.correo} />
                                <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="contrasena">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" value={form.contrasena} onChange={handleChange} isInvalid={!!errors.contrasena} />
                                <Form.Control.Feedback type="invalid">{errors.contrasena}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="telefono">
                                <Form.Label>Teléfono (opcional)</Form.Label>
                                <Form.Control type="tel" value={form.telefono} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="direccion">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control type="text" value={form.direccion} onChange={handleChange} isInvalid={!!errors.direccion} />
                                <Form.Control.Feedback type="invalid">{errors.direccion}</Form.Control.Feedback>
                            </Form.Group>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="regionId">
                                        <Form.Label>Región</Form.Label>
                                        <Form.Select value={form.regionId} onChange={handleChange} isInvalid={!!errors.regionId} required>
                                            <option value="">Seleccione una región</option>
                                            {regiones.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.regionId}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group controlId="comunaId">
                                        <Form.Label>Comuna</Form.Label>
                                        <Form.Select value={form.comunaId} onChange={handleChange} isInvalid={!!errors.comunaId} required disabled={!comunas.length}>
                                            <option value="">Seleccione una comuna</option>
                                            {comunas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.comunaId}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button type="submit" variant="primary" className="w-100">Registrarse</Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;
