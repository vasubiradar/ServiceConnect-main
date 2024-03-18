// Homepage.js
import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Subcategories from './Subcategories';
import './Homepage.css';

const Homepage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/service22/service-category/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching service categories:', error.message);
      }
    };

    fetchData();
  }, []);

  const getStarted = () => {
    window.scrollTo({
      top: 700,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Header />
      <main className="main" id="main">
      <section className="section hero">
          <div className="hero__video-container">
            <video className="hero__video" autoPlay muted loop>
              <source src="v1.mp4" type="video/mp4" />
              {/* Your browser does not support the video tag. */}
            </video>

            <div className="hero__content">
              <h1 className="hero__title">
                Explore the Services <br />
                just one Click
              </h1>

              <button onClick={getStarted} className="button-hero">
                Get Started
              </button>
            </div>
          </div>
        </section>

        <div style={{ margin: '20px' }}>
          <div className="category-heading">Service Categories</div>
          <div className="category-container">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link to={`/subcategories/${category.id}`} key={category.id} className="category-card">
                  <div className="category-overlay">
                    <strong>{category.categoryName}</strong>: {category.description}
                  </div>
                  <img src={category.imageUrl} alt={`Category: ${category.categoryName}`} />
                </Link>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
          </div>
        </div>
        
        <Routes>
          {categories.map((category) => (
            <Route
              key={category.id}
              path={`/subcategories/${category.id}`}
              element={<Subcategories categoryId={category.id} />}
            />
          ))}
        </Routes>
      </main>
    </>
  );
};

export default Homepage;
