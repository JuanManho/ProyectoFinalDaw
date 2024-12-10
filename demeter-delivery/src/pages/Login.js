import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Para redirigir y enlaces
import '../styles/Login.css'; // Ruta hacia tu archivo CSS
import config from '../config'; // Configuración con URL de la API
import { UserContext } from '../context/UserContext'; // Importa el contexto del usuario

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    contraseña: '', // Cambiado a 'contraseña' para coincidir con el backend
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook para redirigir
  const { setUser } = useContext(UserContext); // Obtén la función para actualizar el contexto del usuario

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Datos enviados:', formData); // Verifica que `email` y `contraseña` tengan valores

    try {
      const response = await fetch(`${config.API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('La respuesta del servidor no es JSON válida');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Actualizar el estado del usuario en el contexto
      setUser(data.user);

      // Guardar el usuario en localStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      setMessage(`Bienvenido, ${data.user.nombre}`);

      // Redirigir según el rol del usuario
      if (data.user.rol === 'cliente') {
        navigate('/cliente');
      } else if (data.user.rol === 'propietario') {
        navigate('/owner');
      } else if (data.user.rol === 'repartidor') {
        navigate('/repartidor');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña" // Cambiado a 'contraseña'
            value={formData.contraseña} // Cambiado a 'contraseña'
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {message && <p>{message}</p>}
      <p className="register-link">
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;

