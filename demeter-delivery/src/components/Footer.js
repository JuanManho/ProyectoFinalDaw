import React from 'react';
import '../styles/Footer.css'; // Archivo CSS específico para el footer

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <img src="/images/components/LogoDemeterSinFondo.png" alt="Logo" className="footer-logo" />
      <p className="footer-text">© Demeter Delivery | Aviso legal</p>
    </div>
  </footer>
);

export default Footer;