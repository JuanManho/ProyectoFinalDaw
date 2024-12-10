import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener datos del usuario del almacenamiento local
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      // Si no está logueado, redirigir al login
      navigate('/login');
    } else {
      setUserData(user);
      fetchOrderHistory(user.id);
    }
  }, [navigate]);

  // Obtener el historial de pedidos del usuario desde el backend
  const fetchOrderHistory = async (userId) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/orders/user/${userId}`);
      if (!response.ok) {
        throw new Error('Error al obtener el historial de pedidos');
      }
      const data = await response.json();
      setOrderHistory(data);
    } catch (error) {
      console.error('Error al cargar el historial de pedidos:', error.message);
    }
  };

  // Función para formatear la fecha en formato europeo
  const formatFechaEuropea = (fecha) => {
    const date = new Date(fecha);
    if (isNaN(date)) return 'Fecha no disponible';

    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="user-profile">
      {userData && (
        <div>
          <h1>Bienvenido, {userData.nombre}</h1>
          <p>Email: {userData.email}</p>
        </div>
      )}
      <h2>Historial de Pedidos</h2>
      {orderHistory.length > 0 ? (
        <ul>
          {orderHistory.map((order) => (
            <li key={order.id}>
              <p>Pedido #{order.id}</p>
              <p>Restaurante: {order.restaurante}</p>
              <p>Total: €{order.total.toFixed(2)}</p>
              <p>Fecha: {formatFechaEuropea(order.fecha_pedido)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes pedidos registrados.</p>
      )}
    </div>
  );
};

export default UserProfile;

