import React, {Component} from 'react';
import Editor from './viewproblem.editor.component'
import '../css/submitcode.component.css'
import {Button} from "@material-ui/core";
import {withRouter} from 'react-router-dom';
const axios = require('axios')

export default class SubmitCode extends Component  {
    constructor(props)
    {
        super(props);
        this.state = {
            language : 'cpp',
            source: '',
            problemID: '',

        }
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    changeLanguage(event) {
        this.setState(
            {language: event.target.value}
        );
    }
    
    submit = async (e) => {
        e.preventDefault();
        console.log("clicked\n");
        console.log(this.state.problemID);
        console.log(this.state.language);
        console.log(this.state.source);
        let ourSubmission = {
            submission_id: "S0010",
            user_id: "doanphuduc",
            problem_id: this.state.problemID,
            time_submitted: new Date(),
            language: "C++",
            verdict: "Running",
            time: "1",
            memory: "2048"
        }
        axios.post('http://localhost:5000/submission/add', 
                    ourSubmission)
                    .then(response => {
                        console.log(response);
                    })  
                    .catch(error => {
                        console.log(error);
                    });
    }

    changeSource = (value) => {
        this.setState ({
            source: value
        });

    }

    render() {
        return (
            // Your code goes here, must included in a <div>
            <div className="SubmitCode">

                <div className='Problem'>
                    <p>Problem:</p>
                    <input name='problemName' type='text' onChange = {(e) => {
                        e.preventDefault();
                        this.setState({problemID: e.target.value});
                    }}/>
                </div>

                <div className='Language'>
                    <p>Language:</p>
                    <select name="programmingLanguage" id="pl" onChange={this.changeLanguage}>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                    </select>
                </div>

                <div className='Code'>
                    <p>Source code:</p>
                    <div className='Editor'>
                        <Editor 
                            mode={this.state.language} 
                            value={this.state.source} 
                            onChange={this.changeSource}/>    
                    </div>
                </div>
                <br/>
                <Button color="primary" type="submit" onClick={this.submit}>
                        Submit
                </Button>
            </div>
        );
    }
}
