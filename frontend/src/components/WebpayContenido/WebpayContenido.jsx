import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        const cargarOrden = async () => {
            try {
                const res = await apiService.obtenerOrden(user.token, ordenId);
                setOrden(res.data);
            } catch (error) {
                console.error("Error cargando orden:", error);
                navigate("/carrito");
            }
        };

        if (user?.token && ordenId) {
            cargarOrden();
        }
    }, [ordenId, user, navigate]);

    const pagar = async () => {
        try {
            setLoading(true);
            setResultado(null);

            // ⏳ Simulación Webpay
            await new Promise((resolve) => setTimeout(resolve, 2500));

            await apiService.confirmarPago(user.token, ordenId);

            setResultado({
                exitoso: true,
                mensaje: "Pago realizado con éxito",
            });

            await clearCart();

            setTimeout(() => navigate("/cliente"), 2000);
        } catch (error) {
            console.error("Error en pago:", error);

            setResultado({
                exitoso: false,
                mensaje: "Error al procesar el pago",
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

                <input placeholder="Número de tarjeta" disabled />
                <input placeholder="Nombre del titular" disabled />

                <div className="webpay-row">
                    <input placeholder="MM/AA" disabled />
                    <input placeholder="CVV" disabled />
                </div>

                <button onClick={pagar} disabled={loading}>
                    {loading ? "Procesando..." : "Pagar"}
                </button>

                {loading && <p className="procesando">Validando información…</p>}

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
