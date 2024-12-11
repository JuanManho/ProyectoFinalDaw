import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import RestaurantOrdersTable from '../components/RestaurantOrdersTable'; // Importar la tabla reutilizable

const OwnerDashboard = () => {
  const [orders, setOrders] = useState([]); // Estado para guardar los pedidos
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || user.rol !== 'propietario') {
          navigate('/login'); // Si no es propietario, redirigir al login
          return;
        }

        const restaurantId = user.restaurantId; // Obtener el ID del restaurante
        if (!restaurantId) {
          throw new Error('No se encontró el ID del restaurante en el usuario.');
        }

        const response = await fetch(`${config.API_BASE_URL}/orders/restaurant/${restaurantId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error desconocido al obtener los pedidos.');
        }

        setOrders(data); // Guardar los pedidos en el estado
      } catch (err) {
        console.error('Error al obtener los pedidos:', err.message);
        setError(err.message); // Mostrar el error en la pantalla
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleMarkReady = async (orderId) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/orders/${orderId}/ready`, {
        method: 'PUT',
      });
  
      if (!response.ok) {
        throw new Error('Error al marcar el pedido como preparado');
      }
  
      // Actualizar el estado local para reflejar el cambio
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, estado: 'listo' } : order // Cambiar a 'listo'
        )
      );
    } catch (error) {
      console.error('Error al marcar el pedido como preparado:', error.message);
    }
  };

  return (
    <div>
      <h1>Pedidos del Restaurante</h1>
      {error ? (
        <div className="error">{error}</div> // Mostrar el error si ocurre
      ) : orders.length === 0 ? (
        <p>No hay pedidos para mostrar.</p>
      ) : (
        <RestaurantOrdersTable orders={orders} onMarkReady={handleMarkReady} /> // Pasar la función como prop
      )}
    </div>
  );
};

export default OwnerDashboard;
