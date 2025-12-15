import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import * as apiService from "../../services/api";
import "./WebpayContenido.css";
import webpayLogo from "../../assets/img/webpay-logo.png";

const WebpayContenido = () => {
    const { ordenId } = useParams();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const { user } = useAuth();

    const [orden, setOrden] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState(null);

    // ====== Estados formulario ======
    const [tarjeta, setTarjeta] = useState("");
    const [titular, setTitular] = useState("");
    const [fecha, setFecha] = useState("");
    const [cvv, setCvv] = useState("");

    // ====== CARGAR ORDEN ======
    const cargarOrden = useCallback(async () => {
        try {
            const res = await apiService.obtenerOrden(user.token, ordenId);
            setOrden(res.data);
        } catch (error) {
            console.error("Error cargando orden:", error);
            navigate("/carrito");
        }
    }, [user, ordenId, navigate]);

    useEffect(() => {
        if (user?.token && ordenId) {
            cargarOrden();
        }
    }, [cargarOrden, user, ordenId]);

    // ====== VALIDACIONES ======
    const validarFormulario = () => {
        if (tarjeta.length !== 16) return "Número de tarjeta inválido";
        if (!/^[A-Za-z\s]{3,}$/.test(titular)) return "Nombre del titular inválido";
        if (!/^\d{2}\/\d{2}$/.test(fecha)) return "Fecha inválida (MM/AA)";
        if (cvv.length !== 3) return "CVV inválido";
        return null;
    };

    // ====== SIMULACIÓN WEBPAY ======
    const simularRespuestaWebpay = (numeroTarjeta) => {
        const tarjetasAprobadas = [
            "4242424242424242",
            "4111111111111111",
        ];

        const tarjetasRechazadas = [
            "4000000000000000",
        ];

        if (tarjetasAprobadas.includes(numeroTarjeta)) {
            return { aprobado: true };
        }

        if (tarjetasRechazadas.includes(numeroTarjeta)) {
            return { aprobado: false, mensaje: "Tarjeta rechazada por el banco" };
        }

        return { aprobado: false, mensaje: "Tarjeta inválida" };
    };

    // ====== PAGO ======
    const pagar = async () => {
        const errorValidacion = validarFormulario();
        if (errorValidacion) {
            setResultado({ exitoso: false, mensaje: errorValidacion });
            return;
        }

        setLoading(true);
        setResultado(null);

        // ⏳ Simulación espera Webpay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 💳 Simular resultado tarjeta
        const resultadoWebpay = simularRespuestaWebpay(tarjeta);

        if (!resultadoWebpay.aprobado) {
            setResultado({
                exitoso: false,
                mensaje: resultadoWebpay.mensaje,
            });
            setLoading(false);
            return;
        }

        try {
            // ✅ Confirmar pago en backend
            await apiService.confirmarPago(user.token, ordenId);

            setResultado({
                exitoso: true,
                mensaje: "Pago realizado con éxito",
            });

            await clearCart();
            setTimeout(() => navigate("/cliente"), 2000);
        } catch (error) {
            console.error("Error confirmando pago:", error);
            setResultado({
                exitoso: false,
                mensaje: "Error al confirmar el pago",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!orden) {
        return <p className="text-center mt-5">Cargando pago...</p>;
    }

    return (
        <div className="webpay-bg">
            <div className="webpay-card">
                <img src={webpayLogo} alt="Webpay" className="webpay-logo" />

                <h4>Pago con tarjeta</h4>
                <p className="orden-info">Orden N° {orden.id}</p>
                <p className="monto">
                    Total a pagar: <strong>${orden.total.toLocaleString()}</strong>
                </p>

                <input
                    placeholder="Número de tarjeta"
                    maxLength={16}
                    value={tarjeta}
                    onChange={(e) =>
                        setTarjeta(e.target.value.replace(/\D/g, ""))
                    }
                />

                <input
                    placeholder="Nombre del titular"
                    value={titular}
                    onChange={(e) => setTitular(e.target.value)}
                />

                <div className="webpay-row">
                    <input
                        placeholder="MM/AA"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                    <input
                        placeholder="CVV"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) =>
                            setCvv(e.target.value.replace(/\D/g, ""))
                        }
                    />
                </div>

                <button onClick={pagar} disabled={loading}>
                    {loading ? "Procesando..." : "Pagar"}
                </button>

                {loading && (
                    <p className="procesando">Validando información…</p>
                )}

                {resultado && (
                    <p className={resultado.exitoso ? "ok" : "error"}>
                        {resultado.mensaje}
                    </p>
                )}
            </div>
        </div>
    );
};

export default WebpayContenido;
