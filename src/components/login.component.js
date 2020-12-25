import React, { Component } from "react";
const axios = require("axios");

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }
  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  onSubmitSignIn = () => {
    let { username, password } = this.state;
    axios
      .post("http://localhost:5000/users/login", {
        username,
        password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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
