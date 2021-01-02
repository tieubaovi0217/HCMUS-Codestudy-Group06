import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import MainPage from "./components/mainpage.component";
import SubmitCode from "./components/submitcode.component";
import ProblemSets from "./components/problem-sets.component";
import Profile from "./components/profile.component";
import ViewSubmission from "./components/viewsubmission.component";
import ViewProblem from "./components/viewproblem.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import NotFoundPage from "./components/notfoundpage.component";
import Footer from "./footer";
import ViewOneSubmission from "./components/view-one-submission.component"
import { Link, NavLink } from "react-router-dom";
import logo from "./pictures/logo_transparent.png";

class App extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: "",
      button1: "Login",
      button2: "Register",
      link1: "/login",
      link2: "/register",
    };
  }

  componentDidMount() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if(isLoggedIn === "LOGGED_IN") {
      this.setState({
        loggedInStatus: isLoggedIn,
        button1: localStorage.getItem("username"),
        button2: "Logout",
        link1: "/profile",
        link2: "/login",
      });
    }
    else {
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        button1: "Login",
        button2: "Register",
        link1: "/login",
        link2: "/register",
      });
    }
  }


  handler(check)  {
    let stat = "";
    if (check === true) {
      stat = "LOGGED_IN";
      this.setState({
        loggedInStatus: stat,
        button1: localStorage.getItem("username"),
        button2: "Logout",
        link1: "/profile",
        link2: "/login",
      });
    } else {
      stat = "NOT_LOGGED_IN";
      this.setState({
        loggedInStatus: stat,
        button1: "Login",
        button2: "Register",
        link1: "/login",
        link2: "/register",
      });
    }
    localStorage.setItem("isLoggedIn", stat);
  }

  handleOnClickButton2 = () => {
    //console.log(localStorage.getItem("isLoggedIn"));
    let isLoggedIn = localStorage.getItem("isLoggedIn")
    if(isLoggedIn) {
      localStorage.clear();
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        button1: "Login",
        button2: "Register",
        link1: "/login",
        link2: "/register",
      });
    } 
  }

  render() {
    return (
    <BrowserRouter style={{ height: "100vh" }}>
      <div className="container">
      {/* <h1>{this.state.loggedInStatus}</h1> */}
          {/* BEGIN OF NAVBAR  */}
          <div>
            <div className="mt-2 d-flex align-items-center">
              <Link className="navbar-brand flex-grow-1" href="/">
                <img src={logo} width="200" height="60" alt="logo" />
              </Link>

              <NavLink exact to={this.state.link1} className="nav-link border border-primary rounded mr-2">
                {this.state.button1}
              </NavLink>

              <NavLink exact to={this.state.link2} className="nav-link border border-primary rounded" onClick={this.handleOnClickButton2}>
                {this.state.button2}
              </NavLink>
            </div>

            <nav className="nav nav-pills nav-justified bg-light ">
              <NavLink exact to="/" className="nav-link border border-primary rounded mr-2">
                Main Page
              </NavLink>
              <NavLink exact to="/problemset" className="nav-link border border-primary rounded mr-2">
                Problem Sets
              </NavLink>
              <NavLink exact to="/submitcode" className="nav-link border border-primary rounded mr-2">
                Submit Code
              </NavLink>
              <NavLink exact to="/profile" className="nav-link border border-primary rounded mr-2">
                Profile 
              </NavLink>
              <NavLink exact to="/viewsubmission" className="nav-link border border-primary rounded">
                View Submission
              </NavLink>
            </nav>
          </div>
          {/* END OF NAVBAR */}
        <br />
        <Switch>
          <Route exact path="/" exact component={MainPage} />
     
          <Route exact path="/problemset" component={ProblemSets} />
       
          <Route exact path="/problemset/viewproblem" component={ViewProblem} />

          <Route exact path="/problemset/viewproblem/:id" render={(props) => {return <ViewProblem {...props}/>}} />
       
          <Route exact path="/submitcode" component={SubmitCode} />
     
          <Route exact path="/profile" component={Profile} />
    
          <Route exact path="/viewsubmission" component={ViewSubmission} />
      
          <Route exact path="/login"
              render={(props) => {
                return <Login handler={this.handler} {...props} />;
              }} />
      
          <Route exact path="/register" component={Register} />


          <Route component={NotFoundPage}/>
        </Switch>

      </div>
      {/* Footer */}
      <Footer className="bg-success" />
    </BrowserRouter>
    )
  };
}

export default App;
