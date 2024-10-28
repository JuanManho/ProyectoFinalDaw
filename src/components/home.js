// src/pages/Home.js
import React from 'react';
import AppNavbar from '../components/Navbar';

const Home = () => (
  <div>
    <AppNavbar />
    <SearchBar />
    <RestaurantList />
    <Footer />
  </div>
);

export default Home;
