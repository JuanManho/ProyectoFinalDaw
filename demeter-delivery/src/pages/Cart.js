// src/pages/Cart.js
import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import config from '../config'; // Archivo de configuración con la URL de la API

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext); // clearCart añadido para vaciar el carrito
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Datos del pedido para enviar al backend
    const orderData = {
      total,
      items: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      id_usuario: JSON.parse(localStorage.getItem('user')).id, // Obtener el ID del usuario actual
      id_restaurante: cart[0]?.restaurantId || null, // Asumiendo que todos los elementos son de un solo restaurante
    };

    try {
      const response = await fetch(`${config.API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al procesar el pedido');
      }

      alert('Compra finalizada con éxito');
      clearCart(); // Vaciar el carrito tras finalizar la compra
      navigate('/cliente'); // Redirigir al perfil del cliente
    } catch (error) {
      console.error('Error al finalizar la compra:', error.message);
      alert(`Error al finalizar la compra: ${error.message}`);
    }
  };
  return (
    <Container style={{ minHeight: 'calc(90vh - 10rem)' }}>
      <h1 className="my-4">Carrito de Compras</h1>
      {cart.length > 0 ? (
        <>
          <Row>
            {cart.map((item) => (
              <Col key={item.id} xs={12} className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5>
                    <p>€{item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Quitar
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
          <h3 className="my-4">Total: ${total.toFixed(2)}</h3>
          <Button variant="success" onClick={handleCheckout}>
            Finalizar Compra
          </Button>
        </>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </Container>
  );
};

export default Cart;
