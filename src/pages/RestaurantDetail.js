// src/pages/RestaurantDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import restaurants from '../data/restaurants';

const RestaurantDetail = () => {
  const { id } = useParams(); // Extrae el ID del restaurante desde la URL
  const restaurant = restaurants.find((rest) => rest.id === parseInt(id)); // Busca el restaurante por ID

  if (!restaurant) {
    return <h2>Restaurante no encontrado</h2>; // Maneja el caso en que el restaurante no exista
  }

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>Tipo de comida: {restaurant.type}</p>
      <p>Tiempo de entrega: {restaurant.deliveryTime} min</p>
      <p>Costo de entrega: ${restaurant.deliveryCost}</p>
      <p>Calificación: {restaurant.rating} ★</p>

      <h2>Menú</h2>
      <ul>
        {restaurant.menu.map((dish) => (
          <li key={dish.id}>
            {dish.name} - ${dish.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDetail;