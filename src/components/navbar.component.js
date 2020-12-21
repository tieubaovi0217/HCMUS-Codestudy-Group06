import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from './logo_transparent.png'



export default class Navbar extends Component {
  render() {
    return (    
		<div>
			<div class="mt-2 d-flex align-items-center">
				<Link class="navbar-brand flex-grow-1" href="/">
					<img src={logo} width="200" height="60" alt="logo"/>
				</Link>
				<NavLink exact to="/login" className="nav-link">Login</NavLink>
				<NavLink exact to="/register" className="nav-link">Register</NavLink>
			</div>
	
			<nav class="nav nav-pills nav-justified bg-light ">
				<NavLink exact to="/" className="nav-link">Main Page</NavLink>
				<NavLink to="/problemsets" className="nav-link">Problem Sets</NavLink>
				<NavLink to="/submitcode" className="nav-link" >Submit Code</NavLink>
				<NavLink to="/profile" className="nav-link">Profile</NavLink>
				<NavLink to="/viewsubmission" className="nav-link">View Submission</NavLink>

			</nav>
	  </div>
    );
  }
}
