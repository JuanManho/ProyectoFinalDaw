import React, { useEffect, useState } from 'react';
import config from '../config';

const DeliveryOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${config.API_BASE_URL}/orders/available`);
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const acceptOrder = (orderId) => {
    console.log(`Pedido ${orderId} aceptado para reparto`);
   
  };

  return (
    <div>
      <h1>Pedidos Disponibles</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Pedido #{order.id} - Restaurante: {order.restaurante} - Total: ${order.total}
            <button onClick={() => acceptOrder(order.id)}>Aceptar Pedido</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryOrders;
