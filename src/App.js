import React from "react";
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

function App() {
  return (
    <BrowserRouter style={{ height: "100vh" }}>
      <div className="container">
        <Navbar />
        <br />
        <Switch>
          <Route exact path="/" exact component={MainPage} />
     
          <Route exact path="/problemsets" component={ProblemSets} />
       
          <Route exact path="/problemsets/viewproblem" component={ViewProblem} />
       
          <Route exact path="/submitcode" component={SubmitCode} />
     
          <Route exact path="/profile" component={Profile} />
    
          <Route exact path="/viewsubmission" component={ViewSubmission} />
      
          <Route exact path="/login" component={Login} />
      
          <Route exact path="/register" component={Register} />

          <Route component={NotFoundPage}/>
        </Switch>

      </div>
      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
