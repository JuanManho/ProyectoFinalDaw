// src/pages/Cart.js
import React from 'react';

const Cart = () => {
  const cartItems = [
    { id: 1, name: 'California Roll', price: 9.99, quantity: 2 },
    { id: 2, name: 'Spicy Tuna Roll', price: 12.99, quantity: 1 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <h2>Total: ${total.toFixed(2)}</h2>
      <button>Finalizar Compra</button>
    </div>
  );
};

export default Cart;