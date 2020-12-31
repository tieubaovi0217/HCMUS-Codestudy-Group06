import React, { Component } from "react";
const axios = require("axios");

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginUsername: "",
      loginPassword: "",
    };
  }

  onUsernameChange = (event) => {
    this.setState({ loginUsername: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ loginPassword: event.target.value });
  };

 
  onSubmitSignIn = () => {
    
    let { loginUsername, loginPassword } = this.state;
    let now = this;
    axios
      .post("http://localhost:5000/users/login", {
        username: loginUsername,
        password: loginPassword,
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("username", loginUsername);
        let username = localStorage.getItem("username");

        console.log(username);
        alert("You have successfully logged in!!!");

        localStorage.setItem("isLoggedIn", true);
        now.props.handler(true);
        now.props.history.push('/profile');
      })
      .catch(function (error) {
        console.log(error);
        alert("Login failed");
      });
      
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col"></div>
          <div className="col-sm-7 col-md-6 col-lg-5">
            <div className="card shadow border-0">
              <div className="card-body">
                <h1 className="text-center">Login</h1>
                <div>
                  <div className="form-group">
                    <label for="">Username</label>
                    <input
                      onChange={this.onUsernameChange}
                      type="text"
                      name="username"
                      className="form-control"
                      id="exampleInputUsername"
                      placeholder="Username"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your username.
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="">Password</label>
                    <input
                      onChange={this.onPasswordChange}
                      type="password"
                      name="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your password.
                    </div>
                  </div>
                  <button
                    onClick={this.onSubmitSignIn}
                    type="submit"
                    className="btn btn-danger btn-block"
                  >
                    Login
                  </button>
                </div>
                <div className="mt-2 text-center">
                  Don't have an account?
                  <a href="/register"> Sign Up</a>
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
