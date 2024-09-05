import React, { useState, useEffect } from "react";

function ListBookings() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/duffel-flights-list-orders", {
        method: "GET",
      });
      const data = await response.json();
      setOrders(data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input />
        <input />
        <button>Search</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} className="list-item">
              <div>Total Amount: {order.total_amount}</div>
              <div>Total Currency: {order.total_currency}</div>
              <div>Marketing Carrier: {order.slices[0].segments[0].marketing_carrier.name}</div>
              <div>Created At: {new Date(order.created_at).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListBookings;
