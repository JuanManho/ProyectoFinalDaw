// src/components/RestaurantList.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RestaurantCard from './RestaurantCard';

const restaurants = [
  { name: 'Restaurant 1', type: 'Italian', deliveryTime: 30, deliveryCost: 3.99, rating: 4.5 },
  { name: 'Restaurant 2', type: 'Chinese', deliveryTime: 25, deliveryCost: 2.99, rating: 4.7 },
  // Añade más restaurantes aquí...
];

const RestaurantList = () => (
  <Container>
    <h3 className="my-4">Restaurantes</h3>
    <Row>
      {restaurants.map((restaurant, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3}>
          <RestaurantCard {...restaurant} />
        </Col>
      ))}
    </Row>
  </Container>
);

export default RestaurantList;
