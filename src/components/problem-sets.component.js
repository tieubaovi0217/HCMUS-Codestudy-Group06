import React, { Component } from "react";
import "../css/problem-sets.component.css";
import { Link } from "react-router-dom";
import { MathComponent } from "mathjax-react";
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
      .get("http://localhost:5000/problemset/")
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
        <div id="sidebar">
          <div className="roundbox sidebox _FilterByTagsFrame_main">
            <div className="roundbox-lt">&nbsp;</div>
            <div className="roundbox-rt">&nbsp;</div>
            <div className="caption titled">
              &rarr; Filter Problems
              <div className="top-links"></div>
            </div>
            <div className="roundbox _FilterByTagsFrame_tagBoxPrototype">
              <div className="roundbox-lt">&nbsp;</div>
              <div className="roundbox-rt">&nbsp;</div>
              <div className="roundbox-lb">&nbsp;</div>
              <div className="roundbox-rb">&nbsp;</div>
              <span
                className="_FilterByTagsFrame_tagBoxItem"
                data-name=""
                title=""
              >
                <span className="_FilterByTagsFrame_tagBoxCaption">&nbsp;</span>{" "}
                <img src="//sta.codeforces.com/s/58111/images/icons/close-10x10.png" />
              </span>
            </div>

            <div style={{ padding: "0.5em" }}>
              <form action="" method="get">
                <div className="_FilterByTagsFrame_difficulty">
                  <label>
                    Difficulty:{" "}
                    <span style={{ float: "right" }}>
                      <input name="minDifficulty" value="" /> &mdash;{" "}
                      <input name="maxDifficulty" value="" />
                    </span>
                  </label>
                </div>

                <div
                  style={{ overflow: "auto" }}
                  className="_FilterByTagsFrame_tagBoxes"
                ></div>

                <div className="_FilterByTagsFrame_addTag smaller">
                  <label
                    className="_FilterByTagsFrame_addTagLabel"
                    style={{ display: "none" }}
                  ></label>
                  <a className="_FilterByTagsFrame_addTagLink">Add&nbsp;tag</a>
                </div>

                <div className="_FilterByTagsFrame_button">
                  <input type="submit" value="Apply" />
                </div>
              </form>
            </div>
          </div>
          {/*Last unsolved*/}
          <div className="roundbox sidebox" style={{}}>
            <div className="roundbox-lt">&nbsp;</div>
            <div className="roundbox-rt">&nbsp;</div>
            <div className="caption titled">
              → Last unsolved
              <div className="top-links"></div>
            </div>
            <table className="rtable smaller">
              <tbody>
                <tr>
                  <th className="left " style={{ width: "2.25em" }}>
                    #
                  </th>
                  <th className=" text-align-left">Name</th>
                  <th className=" " style={{ width: "5em" }}>
                    Last submission
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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
