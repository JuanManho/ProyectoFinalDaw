import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AppNavBar from './components/AppNavBar';
import Footer from './components/Footer';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Restaurants from './pages/Restaurants';
import MenuPage from './pages/MenuPage';
import RestaurantOrders from './pages/RestaurantOrders';
import OwnerDashboard from './pages/OwnerDashboard';

// Componente para manejar la lógica de la clase "main-home"
const MainWithLocation = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <main className={isHome ? 'main-home' : ''}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/menu/:id" element={<MenuPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/cliente" element={<UserProfile />} />
        <Route path="/restaurant/:id/orders" element={<RestaurantOrders />} />
        <Route path="/owner" element={<OwnerDashboard />} />
      </Routes>
    </main>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <AppNavBar />
        <MainWithLocation />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
