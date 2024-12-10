import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import config from '../config'; // Configuración para la API
import { CartContext } from '../context/CartContext'; // Importa el contexto del carrito
import '../styles/MenuPage.css';

const MenuPage = () => {
  const { id } = useParams(); // Obtener el ID del restaurante de la URL
  const [menu, setMenu] = useState([]);
  const { addToCart } = useContext(CartContext); // Obtener la función para añadir al carrito
  const [showEffect, setShowEffect] = useState(null); // Estado para manejar el efecto

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/menus/restaurant/${id}`);
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error('Error al obtener el menú:', error);
      }
    };
    fetchMenu();
  }, [id]);

  const handleAddToCart = (dish) => {
    const cartItem = {
      id: dish.id,
      name: dish.nombre_plato,
      price: dish.precio,
      quantity: 1,
      restaurantId: parseInt(id), // Asignar el ID del restaurante
    };
    addToCart(cartItem); // Añadir el plato al carrito

    // Mostrar el efecto de "+1"
    setShowEffect(dish.id); // Usamos el ID del plato para distinguir los efectos
    setTimeout(() => setShowEffect(null), 1000); // Ocultar el efecto después de 1 segundo
  };

  return (
    <Container>
      <h1 className="my-4">Menú</h1>
      <Row>
        {menu.map((dish) => (
          <Col key={dish.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="menu-card">
              <Card.Body>
                <Card.Title>{dish.nombre_plato}</Card.Title>
                <Card.Text>{dish.descripcion}</Card.Text>
                <Card.Text>{dish.precio.toFixed(2)} €</Card.Text>
                <Button onClick={() => handleAddToCart(dish)} variant="primary" style={{ position: 'relative' }}>
                  Añadir al Carrito
                  {showEffect === dish.id && (
                    <span className="add-to-cart-effect">+1</span>
                  )}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MenuPage;
