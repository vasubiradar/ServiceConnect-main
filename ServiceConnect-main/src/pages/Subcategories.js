import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Subcategories.css';
import Header from '../components/Header';

// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import './../CSS/Subcategories.css';
// import Header from '../Components/Header';

const Subcategories = () => {
  const { id } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/SubCategory/subcategories/category/${id}`);

        setSubcategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subcategories:', error.message);
        setError('Error fetching subcategories. Please try again.');
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [id]);

  if (loading) {
    return <p>Loading subcategories...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header />
      <div className="subcategories-container">
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              to={`/booking/${subcategory.id}`}
              className="subcategory-card"
            >
              <h3>{subcategory.name}</h3>
              <p>{subcategory.description}</p>
              <img src={subcategory.url} alt={`Subcategory: ${subcategory.name}`} />
            </Link>
          ))
        ) : (
          <p>No subcategories found for the given category.</p>
        )}
      </div>
    </div>
  );
  
};

export default Subcategories;