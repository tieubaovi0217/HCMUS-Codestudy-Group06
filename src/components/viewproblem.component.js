import React, { Component } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

export default class ViewProblem extends Component {
  classes = makeStyles((theme) => ({
    divider: {
      margin: theme.spacing(1),
    },
    editor: {
      height: "400px",
      width: "100%",
    },
  }));

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      sampleProblem: {
        title: "",
        timeLimit: "",
        memLimit: "",
        description: "",
        inputFormat: "",
        outputFormat: "",
        inputSample: "",
        outputSample: "",
      },
      data: [],
      dataWithTable: [],
      languages: ["cpp", "java", "python", "pascal"],
      redirect: "",
    };
  }

  componentDidMount = () => {
    let data = null;
    let { id } = this.state; //id = this.state.id
    let now = this;
    axios
      .get(`http://localhost:5000/problemset/viewproblem/${id}`)
      .then((response) => {
        data = response.data[0];

        if (!data) {
          alert("Oops, We don't have a problem with ID:" + id);
          now.props.history.push("/problemset");
          return;
        }

        let {
          description,
          input_format,
          inputs,
          mem_limit,
          num_solved,
          output_format,
          outputs,
          problem_difficulty,
          problem_id,
          problem_name,
          time_created,
          time_limit,
        } = data;

        let newSampleProblem = {
          description: description,
          inputFormat: input_format,
          inputSample: inputs[0],
          memLimit: mem_limit,
          outputFormat: output_format,
          outputSample: outputs[0],
          title: problem_name,
          timeLimit: time_limit,
        };
        this.setState({ sampleProblem: newSampleProblem });

        this.setState({
          data: [
            {
              name: "Description",
              content: this.state.sampleProblem.description,
            },
            {
              name: "Input Format",
              content: this.state.sampleProblem.inputFormat,
            },
            {
              name: "Output Format",
              content: this.state.sampleProblem.outputFormat,
            },
          ],
          dataWithTable: [
            { name: "Input", content: this.state.sampleProblem.inputSample },
            { name: "Output", content: this.state.sampleProblem.outputSample },
          ],
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  onClickSubmit = () => {
    this.setState({ redirect: "/submitcode" });
  };

  render() {
    if (this.state.redirect)
      return (
        <Redirect
          to={{ pathname: this.state.redirect, state: { id: this.state.id } }}
        />
      );
    return (
      <Box>
        <Typography variant="h4" align="center" paragraph={true}>
          <p>{this.state.sampleProblem.title}</p>
        </Typography>
        <Typography variant="body2" align="center" paragraph={true}>
          Time Limit: {this.state.sampleProblem.timeLimit} sec
        </Typography>
        <Typography variant="body2" align="center" paragraph={true}>
          Mem Limit: {this.state.sampleProblem.memLimit} MB
        </Typography>

        {this.state.data.map((problemInfo) => (
          <div>
            <Typography variant="h6" paragraph={true}>
              {problemInfo.name}
            </Typography>
            <Typography
              variant="body3"
              paragraph={true}
              style={{ whiteSpace: "pre-line" }}
            >
              {problemInfo.content}
            </Typography>
          </div>
        ))}
        <Typography variant="h6" paragraph={true}>
          Examples
        </Typography>
        {this.state.dataWithTable.map((problemInfoWithTable) => (
          <div>
            <table width="100%" border="1">
              <tr>
                <td> {problemInfoWithTable.name} </td>
              </tr>
              <tr style={{ whiteSpace: "pre-line" }}>
                <td> {problemInfoWithTable.content} </td>
              </tr>
            </table>
            <br />
          </div>
        ))}

        <Divider className={this.classes.divider} />
        <Button
          class="btn btn-primary btn-sm btn-block"
          color="primary"
          type="submit"
          onClick={this.onClickSubmit}
        >
          Submit
        </Button>
      </Box>
    );
  }
}
