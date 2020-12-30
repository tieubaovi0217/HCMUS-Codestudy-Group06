import React, { Component } from "react";

export default class MainPage extends Component {
  render() {
    return (
      // Your code goes here, must included in a <div>

      <div className="container">
        <p>
          You are on the <strong>Main Page</strong> component! Welcome to Code
          Study!
          <br></br>Click "Problem Set" to view problems and solve it.
          <br></br>Click "Submit code" to solve a specific problem.
          <br></br>Click "Profile" to view your information and change it.
          <br></br>Click "View Submission" to view your own submissions' result.
          <br></br>If you have any idea or want to contribute problems, feel
          free to contact us at{" "}
          <a href="mailto:codestudy@gmail.com">Code Study</a>
        </p>
      </div>
    );
  }
}
