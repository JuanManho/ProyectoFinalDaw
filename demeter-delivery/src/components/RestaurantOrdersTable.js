import React from 'react';
import '../styles/RestaurantOrdersTable.css';

const RestaurantOrdersTable = ({ orders }) => {
  return (
    <div className="table-container">
      {/* <h1 className="table-title">Pedidos del Restaurante</h1> */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total (€)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.cliente}</td>
              <td>{new Date(order.fecha_pedido).toLocaleString()}</td>
              <td>{order.estado}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantOrdersTable;

