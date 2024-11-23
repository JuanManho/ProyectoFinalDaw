
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
//import Login from './pages/Login';
//import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        {/* /*{ Añadiremos mas rutas aquí adelante }*/ }
      </Routes>
    </Router>
  );
}

export default App;

