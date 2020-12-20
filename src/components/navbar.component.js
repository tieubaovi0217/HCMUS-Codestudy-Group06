import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from './logo_transparent.png'



export default class Navbar extends Component {
  render() {
    return (    
		<div>
			<Link class="navbar-brand mt-2" href="/">
				<img src={logo} width="200" height="60" alt="logo"/>
			</Link>
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
