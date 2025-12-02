import React, { createContext, useState, useContext, useEffect } from 'react';
import * as apiService from '../services/api';
import { useAuth } from "../context/AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const token = user?.token;

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar carrito al iniciar sesión
    useEffect(() => {
        if (token) cargarCarritoDesdeAPI();
        else setCartItems([]);
    }, [token]);

    const cargarCarritoDesdeAPI = async () => {
        try {
            setLoading(true);
            const response = await apiService.obtenerCarrito(token);

            const items = Array.isArray(response.data) ? response.data : [];

            const itemsFormateados = items.map(item => ({
                id: item.id,
                productoId: item.productoId,
                nombre: item.nombre,
                descripcion: item.descripcion,
                precio: Number(item.precio),
                imagen: item.imagenFile || item.imagenUrl,
                quantity: item.cantidad,
                subtotal: item.subtotal
            }));

            setCartItems(itemsFormateados);
            setError(null);
        } catch (err) {
            console.error('Error cargando carrito:', err);
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (product, cantidad = 1) => {
        if (!token) return alert('Debes iniciar sesión');

        try {
            await apiService.agregarAlCarrito(token, product.id, cantidad);
            await cargarCarritoDesdeAPI();
        } catch (err) {
            console.error('Error agregando al carrito:', err);
            const msg = err.response?.data?.message || err.message;
            setError(msg);
            alert("Error agregando al carrito: " + msg);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await apiService.eliminarDelCarrito(token, itemId);
            await cargarCarritoDesdeAPI();
        } catch (err) {
            console.error('Error eliminando del carrito:', err);
            setError(err.message);
        }
    };

    const increaseQuantity = async (itemId) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item) await apiService.actualizarCantidadCarrito(token, itemId, item.quantity + 1).then(cargarCarritoDesdeAPI);
    };

    const decreaseQuantity = async (itemId) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item && item.quantity > 1) await apiService.actualizarCantidadCarrito(token, itemId, item.quantity - 1).then(cargarCarritoDesdeAPI);
    };

    const clearCart = async () => {
        try {
            await apiService.limpiarCarrito(token);
            setCartItems([]);
        } catch (err) {
            console.error('Error limpiando carrito:', err);
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            error,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            cargarCarritoDesdeAPI
        }}>
            {children}
        </CartContext.Provider>
    );
};


// import React, { createContext, useState, useContext, useEffect } from 'react';
// import * as apiService from '../services/api';
// import { useAuth } from "../context/AuthContext";


// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const { user } = useAuth();
//     const token = user?.token;


//     // Cargar carrito desde la API cuando hay token
//     useEffect(() => {
//         if (token) {
//             cargarCarritoDesdeAPI();
//         }
//     }, [token]);


//     const cargarCarritoDesdeAPI = async () => {
//         try {
//             setLoading(true);

//             const response = await apiService.obtenerCarrito(token);

//             console.log("Carrito recibido desde API:", response);

//             // Si response.data NO es array → convertirlo en []
//             const items = Array.isArray(response.data) ? response.data : [];

//             const itemsFormateados = items.map(item => ({
//                 id: item.id,
//                 productoId: item.productoId,
//                 nombre: item.nombre,
//                 descripcion: item.descripcion,
//                 precio: typeof item.precio === "string" ? parseFloat(item.precio) : item.precio,
//                 imagen: item.imagenFile,
//                 quantity: item.cantidad,
//                 subtotal: item.subtotal
//             }));

//             setCartItems(itemsFormateados);
//             setError(null);
//         } catch (err) {
//             console.error('Error cargando carrito:', err);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };


//     const addToCart = async (product) => {
//         if (!token) {
//             alert('Debes iniciar sesión para agregar productos al carrito');
//             return;
//         }

//         try {
//             // debug: mostrar token y payload
//             console.log("Añadir al carrito - token:", token);
//             const payload = { productoId: product.id, cantidad: 1 };
//             console.log("Payload agregarAlCarrito:", payload);

//             const response = await apiService.agregarAlCarrito(
//                 token,
//                 product.id,
//                 1
//             );

//             console.log("Response agregarAlCarrito:", response);

//             if (response && (response.success === true || response.id || response.data)) {
//                 // si tu API devuelve ApiResponse {success,message,data}
//                 await cargarCarritoDesdeAPI();
//             } else {
//                 console.warn("Respuesta inesperada al agregar al carrito:", response);
//                 // intenta recargar de todas formas para sincronizar
//                 await cargarCarritoDesdeAPI();
//             }
//         } catch (err) {
//             console.error('Error agregando al carrito:', err);
//             // mostrar error detallado
//             const apiMsg = err.response?.data || err.message;
//             setError(apiMsg);
//             alert("Error agregando al carrito: " + (apiMsg?.message || JSON.stringify(apiMsg)));
//         }
//     };

//     const removeFromCart = async (itemId) => {
//         try {
//             await apiService.eliminarDelCarrito(token, itemId);
//             await cargarCarritoDesdeAPI();
//         } catch (err) {
//             console.error('Error eliminando del carrito:', err);
//             setError(err.message);
//         }
//     };

//     const increaseQuantity = async (itemId) => {
//         const item = cartItems.find(i => i.id === itemId);
//         if (item) {
//             try {
//                 await apiService.actualizarCantidadCarrito(
//                     token,
//                     itemId,
//                     item.quantity + 1
//                 );
//                 await cargarCarritoDesdeAPI();
//             } catch (err) {
//                 console.error('Error aumentando cantidad:', err);
//             }
//         }
//     };

//     const decreaseQuantity = async (itemId) => {
//         const item = cartItems.find(i => i.id === itemId);
//         if (item && item.quantity > 1) {
//             try {
//                 await apiService.actualizarCantidadCarrito(
//                     token,
//                     itemId,
//                     item.quantity - 1
//                 );
//                 await cargarCarritoDesdeAPI();
//             } catch (err) {
//                 console.error('Error disminuyendo cantidad:', err);
//             }
//         }
//     };

//     const clearCart = async () => {
//         try {
//             await apiService.limpiarCarrito(token);
//             setCartItems([]);
//         } catch (err) {
//             console.error('Error limpiando carrito:', err);
//         }
//     };

//     const value = {
//         cartItems,
//         loading,
//         error,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         increaseQuantity,
//         decreaseQuantity,
//         cargarCarritoDesdeAPI // Exponer para recargar manual
//     };

//     return (
//         <CartContext.Provider value={value}>
//             {children}
//         </CartContext.Provider>
//     );
// };