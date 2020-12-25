import React, { Component } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

import Editor from "./viewproblem.editor.component.js";

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
        title: "Greatest Common Divisor",
        timeLimit: "2",
        memLimit: "512",
        description:
          "Given two numbers a, b. You need to compute greatest common divisor of a, b",
        inputFormat:
          "The first line contain two number a, b respectively (1 <= a, b <= 1000000)",
        outputFormat:
          "One line contain single number is greatest common divisor of a, b",
        inputSample: "8 6",
        outputSample: "2",
      },
      data: [],
      dataWithTable: [],
      languages: ["cpp", "java", "python", "pascal"],
      test: "test",
    };
  }

  componentDidMount = () => {
    let data = null;
    let { id } = this.state; //id = this.state.id
    axios
      .get(`http://localhost:5000/problemset/viewproblem/${id}`)
      .then((response) => {
        this.setState({ test: "hehe" });

        data = response.data[0];

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
        console.log(description);
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

  render() {
    console.log(this.state.id);
    return (
      <Box>
        <Typography variant="h4" align="center" paragraph={true}>
          <p>{this.state.sampleProblem.title}</p>
        </Typography>
        <Typography variant="body2" align="center" paragraph={true}>
          Time Limit: {this.state.sampleProblem.timeLimit} sec
        </Typography>
        <Typography variant="body2" align="center" paragraph={true}>
          Mem Limit: {this.state.sampleProblem.memLimit} kB
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
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Box>
    );
  }
}
