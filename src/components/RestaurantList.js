// src/components/RestaurantList.js
// Muestra una lista de tarjetas de restaurantes usando el componente RestaurantCard.
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RestaurantCard from './RestaurantCard';
import restaurants from '../data/restaurants';


const RestaurantList = () => (
  <Container>
    <h3 className="my-4">Restaurantes</h3>
    <Row>
        {restaurants.map((restaurant) => (
        <Col key={restaurant.id} xs={12} sm={6} md={4} lg={3}>
          <RestaurantCard {...restaurant} />
        </Col>
      ))}
    </Row>
  </Container>
);

export default RestaurantList;
