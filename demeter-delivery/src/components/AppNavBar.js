import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Añadido useNavigate
import { UserContext } from '../context/UserContext'; // Importa el contexto del usuario
import '../styles/AppNavBar.css';

const AppNavBar = () => {
  const { user, logout } = useContext(UserContext); // Obtén el usuario y la función de logout
  const navigate = useNavigate(); // Hook para redirigir

  const handleUserNavigation = () => {
    if (user) {
      if (user.rol === 'propietario' && user.restaurantId) {
        navigate(`/owner`); // Usa el restaurantId del localStorage
      } else {
        navigate('/user'); // Redirigir a perfil general
      }
    }
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/images/components/LogoDemeterSinFondo.png" // Ruta de tu logo
            alt="Demeter Delivery Logo"
            className="navbar-logo" // Clase CSS para el logo
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/restaurants">Restaurantes</Nav.Link>

            {user ? ( // Si el usuario está logueado
              <>
                <Nav.Link onClick={handleUserNavigation}>
                  Hola, {user.nombre}
                </Nav.Link>
                <Nav.Link onClick={logout}>Cerrar sesión</Nav.Link>
              </>
            ) : ( // Si no hay usuario logueado
              <Nav.Link as={Link} to="/login">Inicio de sesión/Registro</Nav.Link>
            )}

            <Nav.Link as={Link} to="/cart">Carrito</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;
