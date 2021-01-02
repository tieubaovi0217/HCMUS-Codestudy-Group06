import React, { Component } from "react";

const axios = require("axios");

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      registerUsername: "",
      registerPassword: "",
    };
  }
  onUsernameChange = (event) => {
    this.setState({ registerUsername: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ registerPassword: event.target.value });
  };
  onSubmitSignUp = () => {
    let { registerUsername, registerPassword} = this.state;

    if(registerUsername === "") {
      alert("Username cannot be empty!");
      return;
    }
    else if(registerPassword === "") {
      alert("Password cannot be empty!");
      return;
    }
    
    let now = this;
    axios.post("http://localhost:5000/users/register", {
        username: registerUsername,
        password: registerPassword,
      })
      .then(function (response) {
        
        //this.props.handleSuccessfulAuth(response.data);

        console.log(response);
        alert('Congratulations, your account has been successfully created!');
        now.props.history.push('/login');
      })
      .catch(function (error) {
        alert('Username already exists. Please try with another one');
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