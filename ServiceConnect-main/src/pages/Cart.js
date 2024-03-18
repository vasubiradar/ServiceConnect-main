// Cart.js
import React, { useState, useEffect } from 'react';

const Cart = ({ onRemoveItem }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems && cartItems.length > 0 ? (
        cartItems.map(item => (
          <div key={item.id}>
            <img src={item.url} alt={`Subcategory: ${item.name}`} />
            <p>Name: {item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: Rs {item.totalPrice}</p>
            <button onClick={() => onRemoveItem(item.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
