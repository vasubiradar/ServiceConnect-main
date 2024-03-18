import React from "react";
import styled from "styled-components";
import  { jwtDecode, InvalidTokenError, JwtDecodeOptions } from "jwt-decode";
//import * as jwtDecode from 'jwt-decode';

import { setToLocalStorage } from "./localStorageUtil"; 
import UserService from "./UserService"; // Make sure this path is correct

const Togle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

class Google extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleCallbackResponse = this.handleCallbackResponse.bind(this);
    this.generateRandomPassword = this.generateRandomPassword.bind(this);
  }

  handleCallbackResponse(response) {
    console.log("Encoded JWT ID to token:" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);

    // Send the email data to the server
    if (userObject.email_verified) {
      const email = userObject.email;
      

      // Check if the user with the given email already exists
      UserService.getItems()
        .then((response) => {
          const existingUsers = response.data;
          const userExists = existingUsers.some((user) => user.email === email);
          if (userExists) {
            // User already exists, no need to create a new account
            console.log("User already exists");
          } else {
            // User doesn't exist, create a new account
            const password = this.generateRandomPassword();
            const role = "user";
            UserService.addItem({ email, password, role })
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error("Error while creating a new user:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error while fetching existing users:", error);
        });

      // Set isAuthenticated to true if the email is verified
      setToLocalStorage("isAuthenticated", true);
      setToLocalStorage("isUser", true);
      setToLocalStorage("userEmail", email);
    }
  }

  generateRandomPassword() {
    return "123"; // Replace this with your random password generation logic
  }

  componentDidMount() {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "1044756422193-lag30oq7opgravoin7fcj6tf1m0k4sq6.apps.googleusercontent.com",
      callback: this.handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }

  render() {
    return (
      <Togle>
        <div>
          <div id="signInDiv"></div>
        </div>
      </Togle>
    );
  }
}

export default Google;