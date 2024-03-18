import React, { Component } from "react";
import UserService from "./UserService";
import { setToLocalStorage} from "./localStorageUtil";
import "./Signup.css";
import Header from "../components/Header";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      email: "",
      password: "",
      userData: null,
    };
  }

  componentDidMount() {
    console.log("mounting is done");
    this.fetchItems();
  }

  fetchItems() {
    UserService.getItems().then((response) => {
      this.setState({ user: response.data });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const userData = this.state.user.find((user) => user.email === email);

    if (userData && userData.password === password) {
      // Store user information in local storage
      setToLocalStorage("userid", userData.id);
      setToLocalStorage("role", userData.role);
      setToLocalStorage("isAuthenticated", true);
      window.location.href = "/";

      alert('Welcome! ' + userData.role);

    } else {
      alert('Invalid credentials');
    }
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        
        <img className="Signupbg" src="https://static.wixstatic.com/media/913ec8_41bddbc92c7d424fbf05c9e1204fa2db~mv2.png/v1/fill/w_640,h_356,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/913ec8_41bddbc92c7d424fbf05c9e1204fa2db~mv2.png"></img> 
        <Header></Header>
      <div className="signup-container">
        <div className="signup-box">
          <h2>Sign In</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email address:</label>
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default Signin;