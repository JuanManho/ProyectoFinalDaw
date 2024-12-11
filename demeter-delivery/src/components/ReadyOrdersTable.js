import React from 'react';

const ReadyOrdersTable = ({ orders, onAssign }) => {
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
            <th>Total (€)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.cliente}</td>
              <td>{order.telefono}</td>
              <td>{order.direccion_cliente}</td>
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
              <td>{order.total.toFixed(2)}</td>
              <td>
                <button onClick={() => onAssign(order.id)} className="btn btn-primary">
                  Asignar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadyOrdersTable;