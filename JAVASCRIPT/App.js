import React from 'react';
import RestaurantList from './components/RestaurantList';
import Filter from './components/Filter';

function App() {
  return (
    <div>
      <h1>Restaurantes</h1>
      <Filter />
      <RestaurantList />
    </div>
  );
}
export default App;