import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import config from '../config';

const OrderConfirmation = () => {
  const { id } = useParams(); // Obtener el ID del pedido de la URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/orders/${id}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error al obtener los detalles del pedido:', error);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) {
    return <p>Cargando detalles del pedido...</p>;
  }

  return (
    <Container>
      <h1 className="my-4">Pedido #{order.id}</h1>
      <Card>
        <Card.Body>
          <p><strong>Total:</strong> €{order.total.toFixed(2)}</p>
          <p><strong>Estado:</strong> {order.estado}</p>
          <p><strong>Fecha:</strong> {new Date(order.fecha).toLocaleString()}</p>
          <h5>Detalles del pedido:</h5>
          <ul>
            {order.detalles.map((item) => (
              <li key={item.id_plato}>
                {item.nombre_plato} x {item.cantidad} - €{item.precio_unitario.toFixed(2)}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderConfirmation;
