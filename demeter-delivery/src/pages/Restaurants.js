import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import config from '../config';
import { Link } from 'react-router-dom';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  // Obtener datos de restaurantes desde la API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/restaurants`);
        if (!response.ok) {
          throw new Error('Error al obtener la lista de restaurantes');
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRestaurants();
  }, []);
  return (
    <Container>
      <h1 className="my-4">Restaurantes</h1>
      <Row>
        {restaurants.map((restaurant) => (
          <Col key={restaurant.id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={restaurant.logo || 'https://via.placeholder.com/150'} // Usa el logo si existe, o un placeholder
                alt={restaurant.nombre}
              />
              <Card.Body>
                <Card.Title>{restaurant.nombre}</Card.Title>
                <Card.Text>
                  {restaurant.direccion} <br />
                  Tipo: {restaurant.tipo_comida}
                </Card.Text>
                <Button as={Link} to={`/menu/${restaurant.id}`} variant="primary">Ver Menú</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Restaurants;
