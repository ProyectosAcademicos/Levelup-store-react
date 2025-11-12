// components/CarritoContenido/CarritoContenido.jsx
import React from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import './CarritoContenido.css';

const formatPrice = (value) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(value);
};

const CarritoContenido = () => {
    const { 
        cartItems, 
        removeFromCart, 
        increaseQuantity, 
        decreaseQuantity 
    } = useCart();
    
    const navigate = useNavigate();
    const total = cartItems.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

    const handlePagar = () => {
        console.log("Navegando a la página de pago...");
        navigate('/checkout');
    };

    return (
        <div className="container my-4 carrito-container">
            <h2 className="mb-4">Carro de Compras</h2>
            <div className="row">
                
                {/* Columna de productos */}
                <div className="col-md-8 carrito-items">
                    {cartItems.length === 0 ? (
                        <div className="alert alert-secondary text-center" role="alert">
                            Tu carrito está vacío. 
                            <Link to="/catalogo"> ¡Empieza a comprar!</Link>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div className="card mb-3 shadow-sm" key={item.id}>
                                <div className="row g-0">
                                    <div className="col-md-2 d-flex align-items-center justify-content-center p-2">
                                        <img src={item.imagen} className="img-fluid rounded" alt={item.nombre} style={{ maxHeight: '100px', objectFit: 'contain' }}/>
                                    </div>
                                    <div className="col-md-10">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <h5 className="card-title">{item.nombre}</h5>
                                                <button 
                                                    className="btn-close" 
                                                    aria-label="Close"
                                                    onClick={() => removeFromCart(item.id)}
                                                ></button>
                                            </div>
                                            <p className="card-text">{item.descripcion}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(item.id)}>-</button>
                                                    <span className="mx-2">{item.quantity}</span>
                                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
                                                </div>
                                                <strong className="text-muted fs-5">
                                                    {formatPrice(item.precio * item.quantity)}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Resumen del carrito */}
                <div className="col-md-4">
                    <div className="border p-4 rounded shadow-sm">
                        <h5 className="mb-3">Resumen del pedido</h5>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span className="fw-bold">{formatPrice(total)}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                            <span>Total:</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                        <input type="text" className="form-control mb-3" placeholder="Cupón de descuento" />
                        <button className="btn btn-dark w-100 mb-2">Aplicar cupón</button>
                        
                        <button 
                            className="btn btn-success w-100" 
                            id="btn-pagar"
                            onClick={handlePagar}
                            disabled={cartItems.length === 0} 
                        >
                            IR A PAGAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarritoContenido;