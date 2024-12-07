// Archivo creado para cubrir el listado de restaurantes y poder añadir o quitar restaurantes de forma fácil

const restaurants = [
  {
    id: 1,
    name: 'Pizza Palace',
    type: 'Italian',
    deliveryTime: 25,
    deliveryCost: 2.99,
    rating: 4.5,
    image: 'https://via.placeholder.com/300?text=Pizza+Palace',
    menu: [
      { id: 101, name: 'Margherita Pizza', price: 9.99, image: 'https://via.placeholder.com/150?text=Margherita+Pizza' },
      { id: 102, name: 'Pepperoni Pizza', price: 12.99, image: 'https://via.placeholder.com/150?text=Pepperoni+Pizza' },
      { id: 103, name: 'Four Cheese Pizza', price: 11.99, image: 'https://via.placeholder.com/150?text=Four+Cheese+Pizza' },
    ],
  },
  {
    id: 2,
    name: 'Sushi World',
    type: 'Japanese',
    deliveryTime: 30,
    deliveryCost: 3.99,
    rating: 4.8,
    image: 'https://via.placeholder.com/300?text=Sushi+World',
    menu: [
      { id: 201, name: 'California Roll', price: 8.99, image: 'https://via.placeholder.com/150?text=California+Roll' },
      { id: 202, name: 'Spicy Tuna Roll', price: 11.99, image: 'https://via.placeholder.com/150?text=Spicy+Tuna+Roll' },
      { id: 203, name: 'Salmon Nigiri', price: 7.99, image: 'https://via.placeholder.com/150?text=Salmon+Nigiri' },
    ],
  },
  {
    id: 3,
    name: 'Burger Haven',
    type: 'American',
    deliveryTime: 20,
    deliveryCost: 1.99,
    rating: 4.3,
    image: 'https://via.placeholder.com/300?text=Burger+Haven',
    menu: [
      { id: 301, name: 'Cheeseburger', price: 9.49, image: 'https://via.placeholder.com/150?text=Cheeseburger' },
      { id: 302, name: 'Bacon Burger', price: 10.49, image: 'https://via.placeholder.com/150?text=Bacon+Burger' },
      { id: 303, name: 'Vegan Burger', price: 8.99, image: 'https://via.placeholder.com/150?text=Vegan+Burger' },
    ],
  },
];

export default restaurants;