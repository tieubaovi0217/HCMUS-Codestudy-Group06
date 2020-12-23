import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import Navbar from "./components/navbar.component"
import MainPage from "./components/mainpage.component";
import SubmitCode from "./components/submitcode.component";
import ProblemSets from "./components/problem-sets.component";
import Profile from "./components/profile.component";
import ViewSubmission from "./components/viewsubmission.component";
import ViewProblem from "./components/viewproblem.component";
import Login from "./components/login.component";
import Register from "./components/register.component";

import Footer from './footer'

function App() {
  return (
    
      <Router style={{height:"100vh"}}>
        <div className="container">
          <Navbar />
          <br/>
          <Route path="/" exact component={MainPage} />
          <Route exact path="/problemsets" component={ProblemSets} />
          <Route path="/submitcode" component={SubmitCode} />
          <Route path="/profile" component={Profile} />
          <Route path="/viewsubmission" component={ViewSubmission} />
          <Route path="/problemsets/viewproblem" component={ViewProblem} />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

           
        </div>
        <Footer />
      </Router>
  );
}

export default App;
