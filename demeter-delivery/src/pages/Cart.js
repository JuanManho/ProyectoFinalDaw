import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Verificar si el usuario está logueado
    if (!user) {
      alert('Debes iniciar sesión para finalizar la compra');
      navigate('/login');
      return;
    }

    // Verificar el rol del usuario
    if (user.rol !== 'cliente') {
      alert('Solo los clientes pueden finalizar compras');
      return;
    }

    // Verificar si el carrito está vacío
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Validar que todos los productos pertenecen al mismo restaurante
    const restaurantIds = [...new Set(cart.map((item) => item.restaurantId))];

    if (restaurantIds.length > 1) {
      alert('Todos los productos deben pertenecer al mismo restaurante.');
      return;
    }

    // Validar que restaurantId no sea nulo o indefinido
    const id_restaurante = restaurantIds[0];
    if (!id_restaurante) {
      alert('El restaurante asociado al pedido no es válido.');
      return;
    }

    const orderData = {
      total,
      items: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      id_usuario: user.id,
      id_restaurante, // Usar el restaurantId válido
    };

    console.log('Datos enviados al backend:', orderData);

    try {
      const response = await fetch(`${config.API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const responseText = await response.text(); // Leer la respuesta como texto
      console.log('Respuesta del servidor:', responseText);

      if (!response.ok) {
        let errorData;
        try {
          // Intentar parsear la respuesta como JSON para obtener detalles del error
          errorData = JSON.parse(responseText);
        } catch (e) {
          console.error('Respuesta no es JSON válido:', responseText);
        }
        throw new Error(errorData?.message || 'Error al procesar el pedido');
      }

      const data = JSON.parse(responseText); // Si es válida, parsearla como JSON
      console.log('Datos procesados con éxito:', data);

      // Éxito: limpiar el carrito y redirigir
      alert('Compra finalizada con éxito');
      clearCart();
      navigate('/cliente');
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
          <h3 className="my-4">Total: €{total.toFixed(2)}</h3>
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
