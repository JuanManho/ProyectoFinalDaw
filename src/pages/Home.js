// src/pages/Home.js
import React from 'react';
import AppNavBar from '../components/AppNavBar';
import SearchBar from '../components/SearchBar';
import RestaurantList from '../components/RestaurantList';
const Home = () => (
  <div>
    <AppNavBar />
    <SearchBar />
    <RestaurantList />
   
  </div>
);

export default Home;
