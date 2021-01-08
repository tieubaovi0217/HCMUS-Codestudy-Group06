import React, { Component } from "react";

const axios = require("axios");

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      registerUsername: "",
      registerPassword: "",
      registerEmail: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value });
  };

  onUsernameChange = (event) => {
    this.setState({ registerUsername: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ registerPassword: event.target.value });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateUsername = (username) => {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(username);
  };

  onSubmitSignUp = () => {
    let { registerUsername, registerPassword, registerEmail } = this.state;

    if (registerEmail === "") {
      alert("Email cannot be empty!");
      return;
    } else if (registerUsername === "") {
      alert("Username cannot be empty!");
      return;
    } else if (registerPassword === "") {
      alert("Password cannot be empty!");
      return;
    }

    if (!this.validateEmail(registerEmail)) {
      alert("Invalid form email adress!");
      return;
    }

    if (!this.validateUsername(registerUsername)) {
      alert(
        "Invalid username! Your username should contain only a-z, A-Z, 0-9 characters!"
      );
      return;
    }

    if (registerPassword.length < 5) {
      alert("Your password should contain at least 5 characters!");
      return;
    }

    let now = this;
    axios
      .post("http://localhost:5000/users/register", {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
      })
      .then(function (response) {
        console.log(response);
        alert("Congratulations, your account has been successfully created!");
        now.props.history.push("/login");
      })
      .catch(function (error) {
        alert("Username or Email already exists. Please try with another one");
        console.log(error);
      });
  };

  render() {
    return (
      // Your code goes here, must included in a <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col"></div>
          <div className="col-sm-7 col-md-6 col-lg-5 ">
            <div className="card shadow border-0">
              <div className="card-body">
                <h1 className="text-center">Sign Up</h1>
                <p>
                  <small className="text-muted">
                    Fields marked * are required.
                  </small>
                </p>
                <div>
                  <div className="form-group">
                    <label for="">Email*</label>
                    <input
                      onChange={this.onEmailChange}
                      type="email"
                      name="email"
                      className="form-control"
                      id="exampleInputEmail"
                      placeholder="abc@gmail.com"
                      required
                    />
                    <div className="invalid-feedback">
                      Please choose an email
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="">Username*</label>
                    <input
                      onChange={this.onUsernameChange}
                      type="text"
                      name="username"
                      className="form-control"
                      id="exampleInputUsername"
                      placeholder="tieubao123"
                      required
                    />
                    <div className="invalid-feedback">
                      Please choose a username.
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="">Password*</label>
                    <input
                      onChange={this.onPasswordChange}
                      type="password"
                      name="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a password.
                    </div>
                  </div>

                  <button
                    onClick={this.onSubmitSignUp}
                    type="submit"
                    className="btn btn-danger btn-block"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="mt-2 text-center">
                  Have an account?
                  <a href="/login"> Login</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col"> </div>
        </div>
      </div>
    );
  }
}
