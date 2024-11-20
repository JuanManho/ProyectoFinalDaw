// src/pages/Home.js
import React from 'react';
import AppNavBar from '../components/AppNavBar';
import SearchBar from '../components/SearchBar';
import RestaurantList from '../components/RestaurantList';
import Footer from '../components/Footer';
const Home = () => (
  <div>
    <AppNavBar />
    <SearchBar />
    <RestaurantList />
    <Footer />
   
  </div>
);

export default Home;
