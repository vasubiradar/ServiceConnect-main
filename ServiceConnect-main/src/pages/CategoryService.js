import axios from "axios";

const ServiceCategory_REST_API_URL = "http://localhost:8082/service22/service-category/categories";

class CategoryService {
  getAllCategories() {
    return axios.get(ServiceCategory_REST_API_URL);
  }

  getCategoryById(id) {
    return axios.get(`${ServiceCategory_REST_API_URL}/${id}`);
  }

  addCategory(category) {
    return axios.post(ServiceCategory_REST_API_URL, category);
  }

  updateCategory(category) {
    return axios.put(`${ServiceCategory_REST_API_URL}/${category.id}`, category);
  }

  deleteCategory(id) {
    return axios.delete(`${ServiceCategory_REST_API_URL}/${id}`);
  }
}

export default new CategoryService();
