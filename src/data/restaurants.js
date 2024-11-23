// Archivo creado para cubrir el listado de restaurantes y poder añadir o quitar restaurantes de forma fácil

const restaurants = [
    {
      id: 1,
      name: 'Pizza Palace',
      type: 'Italian',
      deliveryTime: 25,
      deliveryCost: 2.99,
      rating: 4.5,
      menu: [
        { id: 101, name: 'Margherita Pizza', price: 9.99 },
        { id: 102, name: 'Pepperoni Pizza', price: 12.99 },
      ],
    },
    {
      id: 2,
      name: 'Sushi World',
      type: 'Japanese',
      deliveryTime: 30,
      deliveryCost: 3.99,
      rating: 4.8,
      menu: [
        { id: 201, name: 'California Roll', price: 8.99 },
        { id: 202, name: 'Spicy Tuna Roll', price: 11.99 },
      ],
    },
    // Añade más restaurantes aquí...
  ];
  
  
  export default restaurants;
  