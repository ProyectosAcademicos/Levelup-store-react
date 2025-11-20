import React, { createContext, useState, useContext } from 'react';


// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear el "Hook" personalizado para usar el contexto fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

// 3. Crear el Proveedor (El componente que envuelve nuestra App)
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Función para agregar un producto
    const addToCart = (product) => {
        setCartItems(prevItems => {
            // 1. Verificar si el producto ya está en el carrito
            const itemFound = prevItems.find(item => item.id === product.id);

            if (itemFound) {
                // Si está, incrementa la cantidad
                return prevItems.map(item =>
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            }
            // Si no está, lo agrega con cantidad 1
            return [...prevItems, { ...product, quantity: 1 }];
        });
        console.log("Producto agregado:", product.nombre);
    };

    // Función para eliminar un producto
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Función para vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    // (Opcional) Funciones para + y - cantidad
    const increaseQuantity = (productId) => {
        setCartItems(prevItems => 
            prevItems.map(item =>
                item.id === productId 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems(prevItems => 
            prevItems.map(item =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 } 
                    : item
            ).filter(item => item.quantity > 0) 
        );
    };

    // 4. Exponer el estado y las funciones al resto de la App
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};