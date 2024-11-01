// src/components/Navbar.js
// Componente que contendrá el logotipo y los enlaces a cada botón del menú
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Demeter Delivery</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/restaurants">Restaurantes</Nav.Link>
          <Nav.Link href="/login">Inicio de sesión / Registro</Nav.Link>
          <Nav.Link href="/cart">Carrito</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default AppNavbar;
