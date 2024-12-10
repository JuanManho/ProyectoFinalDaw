import React from 'react';
import '../styles/RestaurantOrdersTable.css';

const RestaurantOrdersTable = ({ orders }) => {
  return (
    <div className="table-container">
      {/* <h1 className="table-title">Pedidos del Restaurante</h1> */}
      <table className="table">
        <thead>
          <tr>
            <th>Nº Pedido</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Dirección</th>
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
              <td>{order.telefono}</td> {/* Nueva columna Teléfono */}
              <td>{order.direccion}</td> {/* Nueva columna Dirección */}
              <td>
                {new Date(order.fecha_pedido).toLocaleString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false, 
                    })}
                </td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantOrdersTable;

