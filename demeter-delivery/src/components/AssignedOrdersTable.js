import React from 'react';
import '../styles/AssignedReadyOrders.css';

const AssignedOrdersTable = ({ orders, onMarkInTransit, onComplete }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Nº Pedido</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Restaurante</th> 
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total (€)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.cliente}</td> 
              <td>{order.telefono_cliente}</td> 
              <td>{order.direccion_cliente}</td>
              <td>{order.restaurante}</td> 
              <td>
                {new Date(order.fecha_pedido).toLocaleString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </td>
              <td>{order.estado}</td>
              <td>{order.total.toFixed(2)}</td>
              <td>
                {order.estado === 'asignado' && (
                  <button
                    onClick={() => onMarkInTransit(order.id)}
                    className="btn btn-warning"
                  >
                    Marcar En Camino
                  </button>
                )}
                {order.estado === 'en camino' && (
                  <button
                    onClick={() => onComplete(order.id)}
                    className="btn btn-success"
                  >
                    Completar
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

export default AssignedOrdersTable;
