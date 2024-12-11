import React from 'react';
import '../styles/RestaurantOrdersTable.css';

const RestaurantOrdersTable = ({ orders, onMarkReady }) => {
    return (
      <div className="table-container">
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
              <th>Acciones</th> {/* Nueva columna para acciones */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.cliente}</td>
                <td>{order.telefono}</td>
                <td>{order.direccion}</td>
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
                <td>{order.estado}</td>
                <td>{order.total}</td>
                <td>
                  {order.estado === 'en preparación' && (
                    <button
                      onClick={() => onMarkReady(order.id)}
                      className="btn btn-primary"
                    >
                      Preparado para recoger
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default RestaurantOrdersTable;

