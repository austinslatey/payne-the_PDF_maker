import React, { useState } from 'react';
import './InputPage.css';

function InputPage() {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  };

  return (
    <div className="input-page-container">
      <form className="input-form" onSubmit={handleSubmit}>
        <h2 className="input-form-title">Enter price and quantity:</h2>
        <div className="input-field">
          <label htmlFor="price-input">Price:</label>
          <input
            type="text"
            id="price-input"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="quantity-input">Quantity:</label>
          <input
            type="text"
            id="quantity-input"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputPage;
