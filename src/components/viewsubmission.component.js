import React, { Component, memo } from "react";
import axios from "axios";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { ControlledEditor } from "@monaco-editor/react";

export default class ViewSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      usernamefake: localStorage.getItem("username"),
      isLoggedIn: localStorage.getItem("isLoggedIn"),
    };
  }

  // get data from server
  componentDidMount() {
    console.log("did mount");
    this.state.usernamefake = localStorage.getItem("username");
    this.state.isLoggedIn = localStorage.getItem("isLoggedIn");
    if (this.state.isLoggedIn) {
      this.getData();
      this.timer = setInterval(() => this.getData(), 4000);
    }
  }

  getData() {
    console.log("get data");
    axios
      .get(`http://localhost:5000/viewsubmission/${this.state.usernamefake}`)
      .then((response) => {
        this.setState({ submissions: response.data });
        console.log(this.state.submissions);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    console.log("unmount");
    clearInterval(this.timer);
    this.timer = null;
  }

  renderTableHeader() {
    return (
      <tr>
        <th>Submission ID</th>
        <th>When</th>
        <th>Problem</th>
        <th>Lang</th>
        <th>Verdict</th>
        <th>Time</th>
        <th>Memory</th>
      </tr>
    );
  }

  renderTableData() {
    const renderAuthButton = (verdict) => {
      if (verdict === "Accepted") {
        return <td class="p-3 mb-2 bg-success text-white"> {verdict}</td>;
      } else if (verdict === "In queue" || verdict === "Running") {
        return <td class="p-3 mb-2 bg-secondary text-white"> {verdict}</td>;
      } else if (verdict === "Compile error" || verdict === "Runtime error") {
        return <td class="p-3 mb-2 bg-warning text-white"> {verdict}</td>;
      } else if (verdict === "Wrong answer") {
        return <td class="p-3 mb-2 bg-danger text-white"> {verdict}</td>;
      } else {
        return <td class="p-3 mb-2 bg-info text-white"> {verdict}</td>;
      }
    };

    console.log(this.state.submissions[0]);
    return this.state.submissions.map((submission, index) => {
      return (
        <tr key={submission.submission_id}>
          <th scope="row">
            <Popup
              trigger={<a class="nav-link">{submission.submission_id}</a>}
              modal
            >
              <div>
                <div className="header">
                  {" "}
                  {"Submission #" + submission.submission_id}{" "}
                </div>
                <br></br>
                <ControlledEditor
                  value={submission.code}
                  language={submission.language}
                  height={"50vh"}
                  options={{
                    readOnly: true,
                    scrollBeyondLastColumn: 0,
                    scrollBeyondLastLine: false,
                    minimap: {
                      enabled: false,
                    },
                    scrollbar: {
                      alwaysConsumeMouseWheel: false,
                    },
                  }}
                />
              </div>
            </Popup>
          </th>
          <td>{submission.time_submitted}</td>
          <td>
            <a
              class="nav-link"
              href={"/problemset/viewproblem/" + submission.problem_id}
            >
              {submission.problem_id}
            </a>
          </td>
          <td>{submission.language}</td>
          {renderAuthButton(submission.verdict)}
          <td>{submission.time} ms</td>
          <td>{submission.memory} KB</td>
        </tr>
      );
    });
  }

  render() {
    console.log(this.state.submissions[1]);
    console.log(this.state.usernamefake);
    console.log(this.state.isLoggedIn);
    let { isLoggedIn } = this.state;
    if (isLoggedIn) {
      return (
        <div>
          <table class="table">
            <thead>{this.renderTableHeader()}</thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>
      );
    } else {
      return <p> Please log in to View your Submission</p>;
    }
  }
}
