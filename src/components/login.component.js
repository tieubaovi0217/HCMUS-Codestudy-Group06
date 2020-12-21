import React, {Component} from 'react';
const axios = require('axios');

export default class Login extends Component    {

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }
    onUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }
    onSubmitSignIn = () => {
        let {username, password} = this.state
        axios.post('http://localhost:3000/users/login', {
            username,
            password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    render() {
        return (
            <div class="container mt-5">
                <div class="row">
                <div class="col"></div>
                <div class="col-sm-7 col-md-6 col-lg-5">
                    <div class="card shadow border-0">
                    <div class="card-body">
                        <h1 class="text-center">Login</h1>
                        <div>
                        <div class="form-group">
                            <label for="">Username</label>
                            <input onChange={this.onUsernameChange} type="text" name="username" class="form-control" id="exampleInputUsername" placeholder="Username" required/>
                            <div class="invalid-feedback">
                            Please enter your username.
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="">Password</label>
                            <input onChange={this.onPasswordChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required/>
                            <div class="invalid-feedback">
                            Please enter your password.
                            </div>
                        </div>
                        <button onClick={this.onSubmitSignIn} type="submit" class="btn btn-danger btn-block">Login</button>
                        </div>
                        <div class="mt-2 text-center">
                        Don't have an account?
                        <a href="/register"> Sign Up</a>
                        </div>
                    </div>
                    </div>

                </div>
                <div class="col"> </div>
                </div>
            </div>
        );
    }
}