
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Añadiremos mas rutas aquí adelante */}
      </Routes>
    </Router>
  );
}

export default App;

