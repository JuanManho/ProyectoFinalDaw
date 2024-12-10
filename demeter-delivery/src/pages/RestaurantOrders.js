import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import config from '../config'; // Asegúrate de que el archivo config tiene la base URL de la API

const RestaurantOrders = () => {
  const { id } = useParams(); // Obtenemos el ID del restaurante de la URL
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/orders/restaurant/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los pedidos del restaurante');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Cargando pedidos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1>Pedidos del Restaurante</h1>
      {orders.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total (€)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.cliente}</td>
                <td>{new Date(order.fecha_pedido).toLocaleString()}</td>
                <td>{order.estado}</td>
                <td>{order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">No hay pedidos para mostrar.</Alert>
      )}
    </Container>
  );
};

export default RestaurantOrders;
