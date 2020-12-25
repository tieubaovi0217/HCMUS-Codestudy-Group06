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
      <Link to={"/problemset/problem/" + props.problem.id}>
        {props.problem.id}
      </Link>
    </td>
    <td>
      <div style={{ float: "left" }}>
        <Link to={"/problemset/problem/" + props.problem.id}>
          {props.problem.name}
        </Link>
      </div>
    </td>
    <td>
      <span title="Difficulty">{props.problem.difficulty}</span>
    </td>
    <td>
      <a
        title="Participants solved the problem"
        href="/problemset/status/1462/problem/F"
      >
        {props.problem.num_solved}
      </a>
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
      .get("http://localhost:3000/problemset/")
      .then((response) => {
        this.setState({ problems: response.data });
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
                  <a className="_FilterByTagsFrame_addTagLink" href="!#">
                    Add&nbsp;tag
                  </a>
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
                <tr>
                  <td className="left  ">
                    <a href="/problemset/problem/1430/D">1430D</a>
                  </td>
                  <td className=" text-align-left">
                    <a href="/problemset/problem/1430/D">String Deletion</a>
                  </td>
                  <td className=" ">
                    <a href="/contest/1430/submission/96118697">96118697</a>
                  </td>
                </tr>
                <tr>
                  <td className="left  dark ">
                    <a href="/problemset/problem/1300/E">1300E</a>
                  </td>
                  <td className=" dark text-align-left">
                    <a href="/problemset/problem/1300/E">Water Balance</a>
                  </td>
                  <td className=" dark ">
                    <a href="/contest/1300/submission/72283642">72283642</a>
                  </td>
                </tr>
                <tr>
                  <td className="left bottom ">
                    <a href="/problemset/problem/1300/C">1300C</a>
                  </td>
                  <td className="bottom text-align-left">
                    <a href="/problemset/problem/1300/C">Anu Has a Function</a>
                  </td>
                  <td className="bottom ">
                    <a href="/contest/1300/submission/70948668">70948668</a>
                  </td>
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
            <tbody>
              {/*this.problemList()*/}
              <tr>
                <td className="id">
                  <a href="/problemset/problem/1463/F">1463F</a>
                </td>
                <td>
                  <div style={{ float: "left" }}>
                    <a href="/problemset/problem/1463/F">Max Correct Set</a>
                  </div>
                </td>
                <td>
                  <span title="Difficulty">1800</span>
                </td>
                <td>
                  <a
                    title="Participants solved the problem"
                    href="/problemset/status/1462/problem/F"
                  >
                    x2842
                  </a>
                </td>
              </tr>
              <tr>
                <td className="id">
                  <a href="/problemset/problem/1463/F">1463F</a>
                </td>
                <td>
                  <div style={{ float: "left" }}>
                    <a href="/problemset/problem/1463/F">Max Correct Set</a>
                  </div>
                </td>
                <td>
                  <span title="Difficulty">1800</span>
                </td>
                <td>
                  <a
                    title="Participants solved the problem"
                    href="/problemset/status/1462/problem/F"
                  >
                    x2842
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
