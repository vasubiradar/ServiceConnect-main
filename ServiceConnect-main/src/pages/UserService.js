import axios from "axios";

const User_REST_API_URL = "http://localhost:8082/User/login/users";

class UserService {
  getItems() {
    return axios.get(User_REST_API_URL);
  }

  addItem(user) {
    return axios.post(User_REST_API_URL, user);
  }

  getUserById(userId) {
    return axios.get(`${User_REST_API_URL}/${userId}`);
  }

  updateItem(item) {
    return axios.put(`${User_REST_API_URL}/${item.id}`, item);
  }

  deleteItem(itemId) {
    return axios.delete(`${User_REST_API_URL}/${itemId}`);
  }
}

export default new UserService();
