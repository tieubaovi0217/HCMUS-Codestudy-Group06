import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import MainPage from "./components/mainpage.component";
import SubmitCode from "./components/submitcode.component";
import ProblemSets from "./components/problem-sets.component";
import Profile from "./components/profile.component";
import ViewSubmission from "./components/viewsubmission.component";


function Footer() {
  return (
    <footer class="text-center text-lg-start bg-light">
      <div class="text-center p-3 text-secondary">
        HCMUS - Software Engineering - 18CNTN - GROUP 06
        <br></br>
        © 2020 Copyright:  
        <a class="text-primary " href="/">Codestudy.vn</a>
      </div>
    </footer>
  );
}


function App() {
  return (


    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={MainPage} />
        <Route path="/problemsets" component={ProblemSets} />
        <Route path="/submitcode" component={SubmitCode} />
        <Route path="/profile" component={Profile} />
        <Route path="/viewsubmission" component={ViewSubmission} />

        <Footer />
      </div>

    </Router>
  );
}

export default App;
