import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/SubCategory/subcategories';

const SubcategoryService = {
  getAllSubcategories: () => axios.get(API_BASE_URL),

  getSubcategoryById: (id) => axios.get(`${API_BASE_URL}/${id}`),

  addSubcategory: (subcategoryData) => axios.post(API_BASE_URL, subcategoryData),

  updateSubcategory: (subcategoryData) => axios.put(`${API_BASE_URL}/${subcategoryData.id}`, subcategoryData),

  deleteSubcategory: (id) => axios.delete(`${API_BASE_URL}/${id}`),
};

export default SubcategoryService;
