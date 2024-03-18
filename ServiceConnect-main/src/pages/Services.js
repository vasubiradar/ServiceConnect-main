import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Services = () => {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8082/service22/service-category/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching service categories:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center', padding: '20px', background: 'content-box' }}>
        <h2>Service Categories</h2>
      </div>

      <div className="category-container">
        {categories.map((category) => (
          <Link to={`/subcategories/${category.id}`} key={category.id} className="category-card">
            <img src={category.imageUrl} alt={category.categoryName} />
            <div>
              <strong>{category.categoryName}</strong>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
