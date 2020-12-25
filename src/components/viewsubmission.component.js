import React, { Component, memo } from "react";
import axios from "axios";

export default class ViewSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = { submissions: [] };
  }

  // get data from server
  componentDidMount() {
    axios
      .get("http://localhost:5000/viewsubmission/")
      .then((response) => {
        this.setState({ submissions: response.data });
        console.log(this.state.submissions);
      })
      .catch((error) => {
        console.log(error);
      });
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
            {" "}
            <a class="nav-link" href="">
              {" "}
              {submission.submission_id}{" "}
            </a>
          </th>
          <td>{submission.time_submitted}</td>
          <td>
            {" "}
            <a class="nav-link" href="">
              {" "}
              {submission.problem_id}{" "}
            </a>{" "}
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

    return (
      <div>
        <table class="table">
          <thead>{this.renderTableHeader()}</thead>

          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}
