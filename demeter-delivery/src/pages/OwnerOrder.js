import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config';

const OwnerOrders = () => {
  const { restaurantId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${config.API_BASE_URL}/orders/restaurant/${restaurantId}`);
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, [restaurantId]);

  const assignToDelivery = (orderId) => {
    console.log(`Asignar pedido ${orderId} a un repartidor`);
    // Aquí puedes implementar la funcionalidad de asignación
  };

  return (
    <div>
      <h1>Pedidos del Restaurante</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Pedido #{order.id} - Total: ${order.total} - Estado: {order.estado}
            <button onClick={() => assignToDelivery(order.id)}>Asignar a Repartidor</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerOrders;
