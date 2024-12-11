import React, { useState, useEffect } from 'react';
import ReadyOrdersTable from '../components/ReadyOrdersTable';
import AssignedOrdersTable from '../components/AssignedOrdersTable';
import config from '../config';

const DeliveryDashboard = () => {
  const [readyOrders, setReadyOrders] = useState([]);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [error, setError] = useState('');

  // Obtener pedidos en estado "listo"
  const fetchReadyOrders = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/orders/ready`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener pedidos listos.');
      }
      
      console.log('Pedidos listos en el cliente:', data); // LOG PARA DEPURACIÓN
      setReadyOrders(data);

    } catch (err) {
      setError(err.message);
    }
  };

  // Obtener pedidos asignados al repartidor
  const fetchAssignedOrders = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await fetch(`${config.API_BASE_URL}/orders/user/${user.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener pedidos asignados.');
      }

      setAssignedOrders(data.filter((order) => order.estado !== 'entregado'));
    } catch (err) {
      setError(err.message);
    }
  };

  // Asignar un pedido al repartidor
  const handleAssignOrder = async (orderId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await fetch(`${config.API_BASE_URL}/orders/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, repartidorId: user.id }),
      });

      if (!response.ok) {
        throw new Error('Error al asignar el pedido.');
      }

      // Refrescar las tablas
      fetchReadyOrders();
      fetchAssignedOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  // Marcar un pedido como "en camino"
  const handleMarkInTransit = async (orderId) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/orders/in-transit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error('Error al marcar el pedido como en camino.');
      }

      // Refrescar las tablas
      fetchAssignedOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  // Completar un pedido
  const handleCompleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/orders/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error('Error al completar el pedido.');
      }

      // Refrescar las tablas
      fetchAssignedOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchReadyOrders();
    fetchAssignedOrders();
  }, []);

  console.log('Estado de pedidos listos:', readyOrders);


  return (
    <div>
      <h1>Panel de Repartidor</h1>
      {error && <p className="error">{error}</p>}
      <h2>Pedidos Listos para Recoger</h2>
      <ReadyOrdersTable orders={readyOrders} onAssign={handleAssignOrder} />
      <h2>Mis Pedidos</h2>
      <AssignedOrdersTable 
        orders={assignedOrders} 
        onMarkInTransit={handleMarkInTransit} 
        onComplete={handleCompleteOrder} 
      />
    </div>
  );
};

export default DeliveryDashboard;
