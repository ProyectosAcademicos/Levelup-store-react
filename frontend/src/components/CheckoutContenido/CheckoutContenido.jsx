import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as apiService from '../../services/api';

const CheckoutContenido = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        direccionEnvio: '',
        telefono: '',
        metodoPago: 'tarjeta',
        notas: ''
    });

    // Si no hay usuario logueado, puedes mostrar un aviso o redirigir
    useEffect(() => {
        if (!user) {
            // navigate('/login');
        }
    }, [user, navigate]);

    const total = cartItems.reduce(
        (acc, item) => acc + (item.precio * item.quantity),
        0
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleConfirmarCompra = async (e) => {
        e.preventDefault();

        if (!user || !user.token) {
            alert('Debes iniciar sesión para completar la compra.');
            navigate('/login');
            return;
        }

        if (cartItems.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        if (!formData.direccionEnvio || !formData.telefono) {
            alert('Por favor completa dirección y teléfono.');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const items = cartItems.map(item => ({
                productoId: item.productoId || item.id,
                cantidad: item.quantity,
                precioUnitario: item.precio
            }));

            const ordenRequest = {
                items,
                direccionEnvio: formData.direccionEnvio,
                telefono: formData.telefono,
                metodoPago: formData.metodoPago.toUpperCase(),
                notas: formData.notas,
                total
            };

            const respuesta = await apiService.crearOrden(user.token, ordenRequest);

            if (!respuesta.success) {
                throw new Error(respuesta.message);
            }

            const orden = respuesta.data;

            alert(`¡Compra N° ${orden.id} realizada exitosamente!`);

            await clearCart();
            navigate('/cliente');

        } catch (err) {
            console.error('Error creando orden:', err);

            let errorMessage = 'Error al procesar la compra. Inténtalo de nuevo.';

            if (err.response) {
                errorMessage = err.response.data.message || err.response.data.error || errorMessage;

                if (err.response.status === 401 || err.response.status === 403) {
                    alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
                    navigate("/login");
                }
            } else if (err.message.includes('Network Error')) {
                errorMessage = 'No se pudo conectar con el servidor.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Vista si el usuario NO está logueado
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
        <div className="container my-5">
            <h2 className="mb-4">Checkout</h2>

            {error && (
                <div className="alert alert-danger">{error}</div>
            )}

            <div className="row">
                {/* Formulario */}
                <div className="col-md-6">
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
                            className="btn btn-success w-100"
                            disabled={loading || cartItems.length === 0}
                        >
                            {loading ? 'Procesando...' : 'Confirmar compra'}
                        </button>
                    </form>
                </div>

                {/* Resumen de compra */}
                <div className="col-md-6">
                    <div className="border p-4 rounded bg-light">
                        <h5 className="mb-3">Resumen de la orden</h5>

                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <div key={index} className="d-flex justify-content-between mb-2">
                                    <span>{item.nombre} x{item.quantity}</span>
                                    <span>${(item.precio * item.quantity).toLocaleString()}</span>
                                </div>
                            ))
                        ) : (
                            <p>Tu carrito está vacío.</p>
                        )}

                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5">
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
