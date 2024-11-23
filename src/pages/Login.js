// src/pages/Login.js
import React from 'react';

const Login = () => {
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;