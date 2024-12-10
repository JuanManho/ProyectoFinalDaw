import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null); // Nuevo estado para el restaurantId actual

  // Añadir un plato al carrito
  const addToCart = (dish) => {
    setCart((prevCart) => {
      // Si el carrito está vacío, establece el restaurantId
      if (prevCart.length === 0) {
        setRestaurantId(dish.restaurantId);
        return [{ ...dish, quantity: 1 }];
      }

      // Verificar si el plato pertenece al mismo restaurante
      if (dish.restaurantId !== restaurantId) {
        alert('Todos los productos deben pertenecer al mismo restaurante.');
        return prevCart; // No modificar el carrito
      }

      const existingDish = prevCart.find((item) => item.id === dish.id);
      if (existingDish) {
        // Si ya existe, incrementa la cantidad
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      // Si no existe, agrégalo con cantidad 1
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  // Quitar un plato del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      // Si el carrito queda vacío, reinicia el restaurantId
      if (updatedCart.length === 0) {
        setRestaurantId(null);
      }
      return updatedCart;
    });
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
    setRestaurantId(null); // Reiniciar el restaurantId
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
