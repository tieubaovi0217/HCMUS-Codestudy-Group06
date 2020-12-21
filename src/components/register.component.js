import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
const axios = require('axios')
export default class Register extends Component    {

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
    onSubmitSignUp = () => {
        let {username, password} = this.state
        axios.post('http://localhost:3000/users/add', {
            username,
            password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          this.props.history.push('/login');
    }


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
                    <small className="text-muted">Fields marked * are required.</small>
                    </p>
                    <div>
                    
                        <div className="form-group">
                            <label for="">Username*</label>
                            <input onChange={this.onUsernameChange}  type="text" name="username" className="form-control" id="exampleInputUsername" placeholder="tieubao123" required/>
                            <div className="invalid-feedback">
                            Please choose a username.
                        </div>
                        </div>
                        <div className="form-group">
                            <label for="">Password*</label>
                            <input onChange={this.onPasswordChange} type="password" name="password" className="form-control" id="exampleInputPassword1" required/>
                            <div className="invalid-feedback">
                            Please enter a password.
                            </div>
                        </div>
                    
                        <button onClick={this.onSubmitSignUp} type="submit" className="btn btn-danger btn-block">Sign Up</button>
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