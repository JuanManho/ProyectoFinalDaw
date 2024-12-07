// Detalle de cada restaurante al pulsar en la imagen 
// src/pages/RestaurantDetail.js
// src/pages/RestaurantDetail.js
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import restaurants from '../data/restaurants';
import { CartContext } from '../context/CartContext';

const RestaurantDetail = () => {
  const { id } = useParams();
  const { cart, addToCart } = useContext(CartContext); // Accedemos al carrito y a la función para añadir elementos
  const restaurant = restaurants.find((rest) => rest.id === parseInt(id));

  if (!restaurant) {
    return (
      <Container className="text-center my-5">
        <h2>Restaurante no encontrado</h2>
      </Container>
    );
  }

  const menu = restaurant.menu || [];

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>{restaurant.name}</h1>
          <p><strong>Tipo de comida:</strong> {restaurant.type}</p>
          <p><strong>Tiempo de entrega:</strong> {restaurant.deliveryTime} min</p>
          <p><strong>Costo de entrega:</strong> ${restaurant.deliveryCost.toFixed(2)}</p>
          <p><strong>Calificación:</strong> {restaurant.rating} ★</p>
        </Col>
      </Row>

      <h2>Menú</h2>
      <Row>
        {menu.map((dish) => (
          <Col key={dish.id} xs={12} sm={6} md={4}>
            <Card className="mb-3">
              <Card.Img variant="top" src={dish.image} alt={dish.name} />
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>
                  <strong>Precio:</strong> ${dish.price.toFixed(2)}
                </Card.Text>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(dish)}
                >
                  Añadir al carrito
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Sección del carrito */}
      <h2 className="mt-5">Tu Carrito</h2>
      {cart.length > 0 ? (
        <Row>
          {cart.map((item) => (
            <Col key={item.id} xs={12} className="mb-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <p>Tu carrito está vacío. Añade algunos platos para empezar.</p>
      )}
    </Container>
  );
};

export default RestaurantDetail;
