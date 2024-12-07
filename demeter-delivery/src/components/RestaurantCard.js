// src/components/RestaurantCard.js
// Este componente representará cada tarjeta de restaurante individualmente, con una imagen, nombre, tipo, tiempo de entrega, precio de envío, y calificación.
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const RestaurantCard = ({ id, name, type, deliveryTime, deliveryCost, rating, image }) => (
  <Card className="m-2" style={{ width: '18rem' }}>
    {/* Imagen del restaurante */}
    <Card.Img variant="top" src={image} alt={name} className="card-img-top" />
    <Card.Body>
      <Card.Title>
        <Link to={`/restaurants/${id}`}>{name}</Link>
      </Card.Title>
      <Card.Text>{type}</Card.Text>
      <Card.Text>{deliveryTime} min • ${deliveryCost} delivery</Card.Text>
      <Card.Text>Rating: {rating} ★</Card.Text>
    </Card.Body>
  </Card>
);

export default RestaurantCard;