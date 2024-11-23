// src/components/Navbar.js
// Componente que contendrá el logotipo y los enlaces a cada botón del menú
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavBar = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Demeter Delivery</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/restaurants/1">Restaurantes</Nav.Link>
          <Nav.Link as={Link} to="/login">Inicio de sesión / Registro</Nav.Link>
          <Nav.Link as={Link} to="/cart">Carrito</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);




export default AppNavBar;
