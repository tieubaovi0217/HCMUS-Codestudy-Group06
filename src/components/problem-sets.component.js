import React, { Component } from "react";
import "../css/problem-sets.component.css";
import { Link } from "react-router-dom";
import axios from "axios";

{
  /*For dynamic*/
}

const Problem = (props) => (
  <tr>
    <td className="id">
      <Link to={"/problemset/viewproblem/" + props.problem.problem_id}>
        {props.problem.problem_id}
      </Link>
    </td>
    <td>
      <div style={{ float: "left" }}>
        <Link to={"/problemset/viewproblem/" + props.problem.problem_id}>
          {props.problem.problem_name}
        </Link>
      </div>
    </td>
    <td>
      <span title="Difficulty">{props.problem.problem_difficulty}</span>
    </td>
    <td>
      <span title="Participants solved the problem">
        {props.problem.num_solved}
      </span>
    </td>
  </tr>
);

export default class ProblemSets extends Component {
  constructor(props) {
    super(props);

    this.state = { problems: [] };
  }

  componentDidMount() {
    axios
      .get("http://192.168.1.59:5000/problemset/")
      .then((response) => {
        this.setState({ problems: response.data });
        console.log(this.state.problems);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  problemList() {
    return this.state.problems.map((currentproblem) => {
      return <Problem problem={currentproblem} key={currentproblem._id} />;
    });
  }

  render() {
    return (
      // Your code goes here, must included in a <div>

      <div style={{ position: "relative" }}>
        <h3>View Problems</h3>
        {/*Filter*/}

        {/*Problems List*/}
        <div id="pageContent" class="content-with-sidebar">
          <table className="datatable">
            <thead className="thead-light">
              <tr>
                <th style={{ width: "3.75em" }} className="top left">
                  #
                </th>
                <th className="top">Name</th>
                <th style={{ width: "2.5em" }} className="top">
                  Difficulty
                </th>
                <th style={{ width: "4em" }} className="top right">
                  Solved
                </th>
              </tr>
            </thead>
            <tbody>{this.problemList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
