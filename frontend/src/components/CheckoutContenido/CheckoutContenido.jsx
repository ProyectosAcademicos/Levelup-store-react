import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as apiService from '../../services/api';
import './CheckoutContenido.css';

const CheckoutContenido = () => {

    // Carrito y función para limpiarlo
    const { cartItems, clearCart } = useCart();

    // Usuario autenticado
    const { user } = useAuth();

    // Para redirecciones
    const navigate = useNavigate();

    // Estados de carga y error
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Formulario del checkout
    const [formData, setFormData] = useState({
        direccionEnvio: '',
        telefono: '',
        metodoPago: 'tarjeta',
        notas: ''
    });

    // Si el usuario no está logueado, puedes bloquear o permitir vista con mensaje
    useEffect(() => {
        if (!user) {
            // navigate('/login');  <— opcional
        }
    }, [user, navigate]);

    // Total del carrito
    const total = cartItems.reduce(
        (acc, item) => acc + (item.precio * item.quantity),
        0
    );

    // Manejo de cambios del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // === Confirmar compra ===
    const handleConfirmarCompra = async (e) => {
        e.preventDefault();

        // Validación de usuario
        if (!user || !user.token) {
            alert('Debes iniciar sesión para completar la compra.');
            navigate('/login');
            return;
        }

        // Validación de carrito vacío
        if (cartItems.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        // Validación de datos obligatorios
        if (!formData.direccionEnvio || !formData.telefono) {
            alert('Por favor completa dirección y teléfono.');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Convertir items al formato que espera el backend
            const items = cartItems.map(item => ({
                productoId: item.productoId || item.id,
                cantidad: item.quantity,
                precioUnitario: item.precio
            }));

            // Objeto de orden
            const ordenRequest = {
                items,
                direccionEnvio: formData.direccionEnvio,
                telefono: formData.telefono,
                metodoPago: formData.metodoPago.toUpperCase(),
                notas: formData.notas,
                total
            };

            // Enviar orden al backend
            const respuesta = await apiService.crearOrden(user.token, ordenRequest);

            if (!respuesta.success) {
                throw new Error(respuesta.message);
            }

            const orden = respuesta.data;

            alert(`¡Compra N° ${orden.id} realizada exitosamente!`);

            // Vaciar carrito y redirigir
            await clearCart();
            navigate('/cliente');

        } catch (err) {
            console.error('Error creando orden:', err);

            let errorMessage = 'Error al procesar la compra. Inténtalo de nuevo.';

            // Respuesta de API con error
            if (err.response) {
                errorMessage = err.response.data.message || err.response.data.error || errorMessage;

                // Error de autenticación
                if (err.response.status === 401 || err.response.status === 403) {
                    alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
                    navigate("/login");
                }
            }
            // Problema de conexión
            else if (err.message.includes('Network Error')) {
                errorMessage = 'No se pudo conectar con el servidor.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // === Vista si el usuario NO está logueado ===
    if (!user) {
        return (
            <div className="container my-5 text-center">
                <h3>Necesitas iniciar sesión para finalizar la compra</h3>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate('/login')}
                >
                    Iniciar Sesión
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-container container my-5">

            {/* Título principal */}
            <h2 className="checkout-title mb-4">Checkout</h2>

            {/* Mensaje de error del backend */}
            {error && (
                <div className="alert alert-danger">{error}</div>
            )}

            <div className="row">

                {/* === Formulario de compra === */}
                <div className="col-md-6 checkout-form">
                    <form onSubmit={handleConfirmarCompra}>

                        <div className="mb-3">
                            <label className="form-label">Dirección de envío</label>
                            <input
                                type="text"
                                className="form-control"
                                name="direccionEnvio"
                                value={formData.direccionEnvio}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Método de pago</label>
                            <select
                                className="form-select"
                                name="metodoPago"
                                value={formData.metodoPago}
                                onChange={handleChange}
                            >
                                <option value="tarjeta">Tarjeta de crédito</option>
                                <option value="transferencia">Transferencia bancaria</option>
                                <option value="efectivo">Efectivo contra entrega</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Notas adicionales</label>
                            <textarea
                                className="form-control"
                                name="notas"
                                value={formData.notas}
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="checkout-btn w-100"
                            disabled={loading || cartItems.length === 0}
                        >
                            {loading ? 'Procesando...' : 'Confirmar compra'}
                        </button>

                    </form>
                </div>

                {/* === Resumen de la compra === */}
                <div className="col-md-6">
                    <div className="checkout-summary">

                        <h5 className="mb-3">Resumen de la orden</h5>

                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <div key={index} className="checkout-item">
                                    <span>{item.nombre} x{item.quantity}</span>
                                    <span>${(item.precio * item.quantity).toLocaleString()}</span>
                                </div>
                            ))
                        ) : (
                            <p className="empty-cart">Tu carrito está vacío.</p>
                        )}

                        <div className="checkout-total">
                            <span>Total:</span>
                            <span>${total.toLocaleString()}</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutContenido;
