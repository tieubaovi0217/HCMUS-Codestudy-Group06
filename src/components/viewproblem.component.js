import React, {Component} from 'react';
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
    TableCell
  } from "@material-ui/core";

import Editor from './viewproblem.editor.component.js'

export default class ViewProblem extends Component    {
    classes = makeStyles(theme => ({
        divider: {
          margin: theme.spacing(1)
        },
        editor: {
          height: "400px",
          width: "100%"
        }
    }));

    constructor(props) {
        super(props);
        this.sampleProblem = {
            title: "Greatest Common Divisor",
            timeLimit: "2",
            memLimit: "512",
            description: "Given two numbers a, b. You need to compute greatest common divisor of a, b",
            inputFormat: "The first line contain two number a, b respectively (1 <= a, b <= 1000000)",
            outputFormat: "One line contain single number is greatest common divisor of a, b",
            inputSample: "8 6",
            outputSample: "2"
        };
        this.data = [
            {name: "Description", content: this.sampleProblem.description},
            {name: "Input Format", content: this.sampleProblem.inputFormat},
            {name: "Output Format", content: this.sampleProblem.outputFormat},
        ]
        this.dataWithTable = [
            {name: "Input", content: this.sampleProblem.inputSample},
            {name: "Output", content: this.sampleProblem.outputSample}
        ]
        this.languages = ["cpp", "java", "python", "pascal"]
    }

    render() {
        return (
            <Box>
                <Typography variant="h4" align = "center" paragraph={true}>
                    <p>{this.sampleProblem.title}</p>
                </Typography>
                <Typography variant="body2" align = "center" paragraph={true}>
                    Time Limit: {this.sampleProblem.timeLimit} sec
                </Typography>
                <Typography variant="body2" align = "center" paragraph={true}>
                    Mem Limit: {this.sampleProblem.memLimit} kB
                </Typography>

                {this.data.map((problemInfo) => (
                    <div>
                        <Typography variant="h6" paragraph={true}>
                            {problemInfo.name} 
                        </Typography>
                        <Typography variant="body3" paragraph={true}>
                            {problemInfo.content}
                        </Typography>
                    </div>
                ))}
                <Typography variant="h6" paragraph={true}>
                    Examples
                </Typography>
                {this.dataWithTable.map((problemInfoWithTable) => (
                    <div>
                        <table width="100%" border="1">
                            <tr>
                                <td> {problemInfoWithTable.name} </td>
                            </tr>
                            <tr>
                                <td> {problemInfoWithTable.content} </td>
                            </tr>
                        </table> 
                        <br/>
                    </div>
                ))}

                <Typography variant="h6" paragraph={true}>
                    Submit Code
                </Typography>
                <Divider className={this.classes.divider} />
                <form> 
                    <Editor />
                    <Select
                        displayEmpty
                        required
                        value = {"cpp"}>

                        <MenuItem value=""> Lang </MenuItem> {
                            this.languages.map(language => (
                                <MenuItem key = {language} value = {language}>
                                    {language}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    <Button color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        );
    }
}
