// Dashboard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryService from './CategoryService';
import SubcategoryService from './SubcategoryService';
import './Dashboard.css';
import Header from '../components/Header';

const Dashboard = () => {
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryUrl, setCategoryUrl] = useState('');
  const [updateCategoryId, setUpdateCategoryId] = useState('');

  const [subcategories, setSubcategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategoryDescription, setSubCategoryDescription] = useState('');
  const [subCategoryUrl, setSubCategoryUrl] = useState('');
  const [subCategoryPrice, setSubCategoryPrice] = useState('');
  const [updateSubCategoryId, setUpdateSubCategoryId] = useState('');

  const [isAddSubcategoryFormVisible, setAddSubcategoryFormVisible] = useState(false);
  const [isUpdateSubcategoryFormVisible, setUpdateSubcategoryFormVisible] = useState(false);

  const [selectedCategoryIdForSubcategory, setSelectedCategoryIdForSubcategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchCategories = () => {
    CategoryService.getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchSubcategories = () => {
    SubcategoryService.getAllSubcategories()
      .then((response) => {
        setSubcategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error);
      });
  };

  const resetForm = () => {
    setCategoryName('');
    setCategoryDescription('');
    setCategoryUrl('');
    setSubCategoryName('');
    setSubCategoryDescription('');
    setSubCategoryUrl('');
    setSubCategoryPrice('');
  };

  const toggleAddForm = () => {
    setAddFormVisible((prev) => !prev);
    setUpdateFormVisible(false);
    resetForm();
  };

  const toggleUpdateForm = () => {
    if (isUpdateFormVisible) {
      setUpdateFormVisible(false);
      resetForm();
      setUpdateCategoryId('');
    } else {
      const userInput = window.prompt('Enter the Category ID to update:');

      if (userInput === null) {
        return;
      }

      const enteredCategoryId = parseInt(userInput);

      if (isNaN(enteredCategoryId)) {
        alert('Invalid Category ID. Please enter a valid numeric ID.');
        return;
      }

      CategoryService.getCategoryById(enteredCategoryId)
        .then((response) => {
          const categoryDetails = response.data;
          setCategoryName(categoryDetails.categoryName);
          setCategoryDescription(categoryDetails.description);
          setCategoryUrl(categoryDetails.imageUrl);
          setUpdateCategoryId(enteredCategoryId);
        })
        .catch((error) => {
          console.error('Error fetching category details:', error);
          alert('Error fetching category details');
        })
        .finally(() => {
          setUpdateFormVisible(true);
          setAddFormVisible(false);
        });
    }
  };

  const handleAddCategory = () => {
    const newCategory = {
      categoryName: categoryName,
      description: categoryDescription,
      imageUrl: categoryUrl,
    };

    CategoryService.addCategory(newCategory)
      .then(() => {
        alert('Category added successfully!');
        fetchCategories();
        toggleAddForm();
      })
      .catch((error) => {
        console.error('Error adding category:', error);
        alert('Error adding category');
      });
  };

  const handleUpdateCategory = () => {
    if (!updateCategoryId) {
      alert('Invalid Category ID');
      return;
    }

    const updatedCategory = {
      id: updateCategoryId,
      categoryName: categoryName,
      description: categoryDescription,
      imageUrl: categoryUrl,
    };

    CategoryService.updateCategory(updatedCategory)
      .then(() => {
        alert('Category updated successfully!');
        fetchCategories();
      })
      .catch((error) => {
        console.error('Error updating category:', error);
        alert('Error updating category');
      })
      .finally(() => {
        toggleUpdateForm();
        resetForm();
        setUpdateCategoryId('');
      });
  };

  const toggleAddSubcategoryForm = () => {
    const userInput = window.prompt('Enter the Category ID for the Subcategory:');
    const categoryId = parseInt(userInput);

    if (isNaN(categoryId)) {
      alert('Invalid Category ID. Please enter a valid numeric ID.');
      return;
    }

    setSelectedCategoryIdForSubcategory(categoryId);
    setAddSubcategoryFormVisible((prev) => !prev);
    setUpdateSubcategoryFormVisible(false);
    resetForm();
  };

  const toggleUpdateSubcategoryForm = () => {
    const userInputCategory = window.prompt('Enter the Category ID for the Subcategory:');
  
    if (userInputCategory === null) {
      return;
    }
  
    const enteredCategoryId = parseInt(userInputCategory);
  
    if (isNaN(enteredCategoryId)) {
      alert('Invalid Category ID. Please enter a valid numeric ID.');
      return;
    }
  
    setSelectedCategoryIdForSubcategory(enteredCategoryId);
  
    const userInputSubcategory = window.prompt('Enter the Subcategory ID to update:');
  
    if (userInputSubcategory === null) {
      return;
    }
  
    const enteredSubcategoryId = parseInt(userInputSubcategory);
  
    if (isNaN(enteredSubcategoryId)) {
      alert('Invalid Subcategory ID. Please enter a valid numeric ID.');
      return;
    }
  
    SubcategoryService.getSubcategoryById(enteredSubcategoryId)
      .then((response) => {
        const subcategoryDetails = response.data;
        setSubCategoryName(subcategoryDetails.name);
        setSubCategoryDescription(subcategoryDetails.description);
        setSubCategoryUrl(subcategoryDetails.url);
        setSubCategoryPrice(subcategoryDetails.price);
        setUpdateSubCategoryId(enteredSubcategoryId);
      })
      .catch((error) => {
        console.error('Error fetching subcategory details:', error);
        alert('Error fetching subcategory details');
      })
      .finally(() => {
        setUpdateSubcategoryFormVisible(true);
        setAddSubcategoryFormVisible(false);
      });
  };
  

  const handleAddSubcategory = () => {
    if (!selectedCategoryIdForSubcategory) {
      alert('Please select a Category for Subcategory first.');
      return;
    }

    const newSubcategory = {
      categoryId: selectedCategoryIdForSubcategory,
      name: subCategoryName,
      description: subCategoryDescription,
      url: subCategoryUrl,
      price: subCategoryPrice,
    };

    SubcategoryService.addSubcategory(newSubcategory)
      .then(() => {
        alert('Subcategory added successfully!');
        fetchSubcategories();
        toggleAddSubcategoryForm();
      })
      .catch((error) => {
        console.error('Error adding subcategory:', error);
        alert('Error adding subcategory');
      });
  };

  const handleUpdateSubcategory = () => {
    if (!selectedCategoryIdForSubcategory) {
      alert('Please select a Category for Subcategory first.');
      return;
    }

    const updatedSubcategory = {
      id: updateSubCategoryId,
      categoryId: selectedCategoryIdForSubcategory,
      name: subCategoryName,
      description: subCategoryDescription,
      url: subCategoryUrl,
      price: subCategoryPrice,
    };

    SubcategoryService.updateSubcategory(updatedSubcategory)
      .then(() => {
        alert('Subcategory updated successfully!');
        fetchSubcategories();
      })
      .catch((error) => {
        console.error('Error updating subcategory:', error);
        alert('Error updating subcategory');
      })
      .finally(() => {
        toggleUpdateSubcategoryForm();
        resetForm();
        setUpdateSubCategoryId('');
      });
  };

  const handleDeleteCategory = (categoryId) => {
    const userInput = window.prompt('Enter the Category ID to delete:');

    if (userInput === null) {
      return;
    }

    const enteredCategoryId = parseInt(userInput);

    if (isNaN(enteredCategoryId)) {
      alert('Invalid Category ID. Please enter a valid numeric ID.');
      return;
    }

    CategoryService.deleteCategory(enteredCategoryId)
      .then(() => {
        alert('Category deleted successfully!');
        fetchCategories();
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
        alert('Error deleting category');
      });
  };

  const handleDeleteSubcategory = (subcategoryId) => {
    const userInput = window.prompt('Enter the Subcategory ID to delete:');

    if (userInput === null) {
      return;
    }

    const enteredSubcategoryId = parseInt(userInput);

    if (isNaN(enteredSubcategoryId)) {
      alert('Invalid Subcategory ID. Please enter a valid numeric ID.');
      return;
    }

    SubcategoryService.deleteSubcategory(enteredSubcategoryId)
      .then(() => {
        alert('Subcategory deleted successfully!');
        fetchSubcategories();
      })
      .catch((error) => {
        console.error('Error deleting subcategory:', error);
        alert('Error deleting subcategory');
      });
  };

  return (
    <div>
      <Header />
      <h2>Dashboard</h2>
      <div className="admin-category-container">
        <div className="admin-actions">
          <button onClick={toggleAddForm}>Add Category</button>
          <button onClick={toggleUpdateForm}>Update Category</button>
          <button onClick={() => handleDeleteCategory(categories[0]?.id)}>Delete Category</button>
          <button onClick={toggleAddSubcategoryForm}>Add Subcategory</button>
          <button onClick={toggleUpdateSubcategoryForm}>Update Subcategory</button>
          <button onClick={() => handleDeleteSubcategory(subcategories[0]?.id)}>Delete Subcategory</button>
        </div>
        <div className="category-list">
          {categories.map((category) => (
            <Link
              to={`/subcategories/${category.id}`}
              className="category-card"
              key={category.id}
            >
              <img src={category.imageUrl} alt={category.categoryName} />
              <h3>{category.categoryName}</h3>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <div style={{ display: isAddFormVisible || isUpdateFormVisible || isAddSubcategoryFormVisible || isUpdateSubcategoryFormVisible ? 'flex' : 'none' }} className="overlay">
        {isAddFormVisible && (
          <div className="category-form">
            <button className="close-btn" onClick={toggleAddForm}>
              &times;
            </button>
            <label htmlFor="categoryName">Category Name:</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <label htmlFor="categoryDescription">Category Description:</label>
            <input
              type="text"
              id="categoryDescription"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
            <label htmlFor="categoryUrl">Category URL:</label>
            <input
              type="text"
              id="categoryUrl"
              value={categoryUrl}
              onChange={(e) => setCategoryUrl(e.target.value)}
            />
            <button onClick={handleAddCategory}>Add</button>
          </div>
        )}
        {isUpdateFormVisible && (
          <div className="category-form">
            <button className="close-btn" onClick={toggleUpdateForm}>
              &times;
            </button>
            <label htmlFor="categoryId">Category ID:</label>
            <input
              type="text"
              id="categoryId"
              value={updateCategoryId}
              disabled
            />
            <label htmlFor="categoryName">Category Name:</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <label htmlFor="categoryDescription">Category Description:</label>
            <input
              type="text"
              id="categoryDescription"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
            <label htmlFor="categoryUrl">Category URL:</label>
            <input
              type="text"
              id="categoryUrl"
              value={categoryUrl}
              onChange={(e) => setCategoryUrl(e.target.value)}
            />
            <button onClick={handleUpdateCategory}>Update</button>
          </div>
        )}
        {isAddSubcategoryFormVisible && (
          <div className="subcategory-form">
            <button className="close-btn" onClick={toggleAddSubcategoryForm}>
              &times;
            </button>
            <label htmlFor="subCategoryName">Subcategory Name:</label>
            <input
              type="text"
              id="subCategoryName"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
            />
            <label htmlFor="subCategoryDescription">Subcategory Description:</label>
            <input
              type="text"
              id="subCategoryDescription"
              value={subCategoryDescription}
              onChange={(e) => setSubCategoryDescription(e.target.value)}
            />
            <label htmlFor="subCategoryUrl">Subcategory URL:</label>
            <input
              type="text"
              id="subCategoryUrl"
              value={subCategoryUrl}
              onChange={(e) => setSubCategoryUrl(e.target.value)}
            />
            <label htmlFor="subCategoryPrice">Subcategory Price:</label>
            <input
              type="text"
              id="subCategoryPrice"
              value={subCategoryPrice}
              onChange={(e) => setSubCategoryPrice(e.target.value)}
            />
            <button onClick={handleAddSubcategory}>Add</button>
          </div>
        )}
        {isUpdateSubcategoryFormVisible && (
          <div className="subcategory-form">
            <button className="close-btn" onClick={toggleUpdateSubcategoryForm}>
              &times;
            </button>
            <label htmlFor="subCategoryId">Subcategory ID:</label>
            <input
              type="text"
              id="subCategoryId"
              value={updateSubCategoryId}
              disabled
            />
            <label htmlFor="subCategoryName">Subcategory Name:</label>
            <input
              type="text"
              id="subCategoryName"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
            />
            <label htmlFor="subCategoryDescription">Subcategory Description:</label>
            <input
              type="text"
              id="subCategoryDescription"
              value={subCategoryDescription}
              onChange={(e) => setSubCategoryDescription(e.target.value)}
            />
            <label htmlFor="subCategoryPrice">Subcategory Price:</label>
            <input
              type="text"
              id="subCategoryPrice"
              value={subCategoryPrice}
              onChange={(e) => setSubCategoryPrice(e.target.value)}
            />
            <button onClick={handleUpdateSubcategory}>Update</button>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Dashboard;