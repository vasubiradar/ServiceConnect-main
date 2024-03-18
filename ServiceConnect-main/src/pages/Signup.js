import React, { Component } from "react";
import UserService from "./UserService";
import "./Signup.css";
import Header from "../components/Header";
import Google from "./Google";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      email: "",
      password: "",
      confirmPassword: "",
      user: [],
      redirectToLogin: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddItem = () => {
    const { email, password, confirmPassword, role } = this.state;

    if (password !== confirmPassword) {
      window.alert("Password and Confirm Password do not match.");
      return;
    }

    const emailExists = this.state.user.some((user) => user.email === email);
    if (emailExists) {
      window.alert("Email already exists. Please use a different email.");
      return;
    }

    const newUser = {
      email: email,
      password: password,
      role: role,
    };
    console.log(newUser)
    UserService.addItem(newUser)
      .then((response) => {
        console.log(response.data);
        // Assuming you have a fetchItems method to update the user list
        this.fetchItems();
        this.setState({
          email: "",
          password: "",
          confirmPassword: "",
          redirectToLogin: true,
        });
        if (this.props.isAdmin) {
          window.alert("Admin added successfully!");
        } else {
          window.alert("Signup is done!");
        }
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        window.alert("Error adding user. Please try again later.");
      });
  };

  fetchItems() {
    // Assuming you have a method to fetch user items from the backend
    UserService.getItems().then((response) => {
      this.setState({ user: response.data });
    });
  }

  render() {
    const { email, password, confirmPassword, role } = this.state;

    return (
      <div>
        <Header></Header>
        <img className="Signupbg" src="https://static.wixstatic.com/media/913ec8_41bddbc92c7d424fbf05c9e1204fa2db~mv2.png/v1/fill/w_640,h_356,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/913ec8_41bddbc92c7d424fbf05c9e1204fa2db~mv2.png"></img> 
        <div className="signup-container">
        <div className="signup-box">
          <h3>Sign Up</h3>
          <div className="form-group">
            <label>Email address:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Create password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
  <label>Role:</label>
  <select
    name="role"
    value={role}
    onChange={this.handleInputChange}
    required
  >
    <option value="">Select Role</option>
    <option value="Customer">Customer</option>
    <option value="ServiceProvider">Service Provider</option>
  </select>
</div>
          <div className="form-group">
            <button type="button" onClick={this.handleAddItem}>
              Sign Up
            </button>
          </div>
          <p>
            Already a member? <a href="/signin">Log in</a>
          </p>

          <Google>
          
        </Google>
        </div>
        

      </div>
      </div>
    );
  }
}

export default Signup;