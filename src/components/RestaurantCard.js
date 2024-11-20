// src/components/RestaurantCard.js
// Este componente representará cada tarjeta de restaurante individualmente, con una imagen, nombre, tipo, tiempo de entrega, precio de envío, y calificación.
import React from 'react';
import { Card } from 'react-bootstrap';

const RestaurantCard = ({ name, type, deliveryTime, deliveryCost, rating }) => (
  <Card className="m-2" style={{ width: '18rem' }}>
    <Card.Img variant="top" src="https://via.placeholder.com/150" />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>{type}</Card.Text>
      <Card.Text>{deliveryTime} min • ${deliveryCost} delivery</Card.Text>
      <Card.Text>Rating: {rating} ★</Card.Text>
    </Card.Body>
  </Card>
);

export default RestaurantCard;