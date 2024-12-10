import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AppNavBar from './components/AppNavBar';
import Footer from './components/Footer';
import Register from './pages/Register'; 
import UserProfile from './pages/UserProfile';
import Restaurants from './pages/Restaurants'; // Importa el componente Restaurants
import MenuPage from './pages/MenuPage'; 
import RestaurantOrders from './pages/RestaurantOrders';
import OwnerDashboard from './pages/OwnerDashboard';

// import Cliente from './pages/Cliente';
// import Propietario from './pages/Propietario';
// import Repartidor from './pages/Repartidor';

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Contenedor general con Grid */}
        <AppNavBar /> {/* Cabecera */}
        <main> {/* Contenedor para las páginas */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} /> {/* Nueva ruta */}
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/menu/:id" element={<MenuPage />} /> {/* Nueva ruta */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} /> {/* Página de login */}
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<UserProfile />} /> 
            <Route path="/cliente" element={<UserProfile />} /> {/* Ruta para cliente */}
            <Route path="/restaurant/:id/orders" element={<RestaurantOrders />} />
            <Route path="/owner" element={<OwnerDashboard />} />

            {/* <Route path="/cliente" element={<Cliente />} />
            <Route path="/propietario" element={<Propietario />} />
            <Route path="/repartidor" element={<Repartidor />} /> */}
          </Routes>
        </main>
        <Footer /> {/* Footer al final */}
      </div>
    </Router>
  );
}

export default App;
