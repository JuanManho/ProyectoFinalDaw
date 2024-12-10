// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const testimonials = [
    {
      name: 'María González',
      comment: '¡El servicio es excelente! La comida llegó a tiempo y estaba deliciosa.',
      image: '/images/customers/customer1.jpg', // Reemplaza con la ruta de tu imagen
    },
    {
      name: 'Juan Pérez',
      comment: 'Gran variedad de restaurantes, siempre encuentro algo que me encanta.',
      image: '/images/customers/customer2.jpg', // Reemplaza con la ruta de tu imagen
    },
    {
      name: 'Lucía Martínez',
      comment: 'Fácil de usar y siempre con buenas ofertas. Lo recomiendo al 100%.',
      image: '/images/customers/customer3.jpg', // Reemplaza con la ruta de tu imagen
    },
  ];

  const navigate = useNavigate();
  const handleExploreClick = () => {
    navigate('/restaurants');
  };

  return (
    <div>
      {/* Banner de Bienvenida */}
      <div className="banner">
        <div className="banner-content">
          <h1>¡Bienvenido a Demeter Delivery!</h1>
          <p>Tu comida favorita, entregada con rapidez y confianza.</p>
          {/* <button className="banner-button">Explora Restaurantes</button> */}
          <button onClick={handleExploreClick} className="banner-button">
          Explora Restaurantes
          </button>

        </div>
      </div>

      {/* Testimonios de Clientes */}
      <div className="testimonials-section">
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              <p className="testimonial-comment">"{testimonial.comment}"</p>
              <p className="testimonial-name">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
