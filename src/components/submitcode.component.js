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
            language_id : '2',
            source: '',
            problemID: '',
        }
        this.mapToLanguageName = {
            '2': 'C++',
            '4': 'Java',
            '10': 'Python',
        }
        this.changeLanguage = this.changeLanguage.bind(this);


        // some constant number for judge0 api
        this.API_KEY = [
            "9455719a56msh35d983faa40a200p13022bjsn39f7624d578c",
            "1a690a0e05msh9e8bab5d6175994p1ab7a0jsnb5e79d340c45",
            "1002e69d2emsh7008355dd01bcaep17f172jsn5e21178e52ec",
            "bc64132133msh807f97bac3da72ep1eec79jsnbf7f36d7c8c9",
            "5f17bf13f5mshf89f557263a63fep1ef213jsnf68b654b1960",
            "4f42740c49mshb897c55a9a595eep1dabcajsna9621b124f9a",
            "da79fa596fmsh54d45dfa57a6e1dp17f924jsn004375a52168",
            "f4d88088c4msh634ccaf0e2666a4p1fbd0bjsnbef0402a5eac"
        ]
        this.NUMBER_OF_API_KEY = this.API_KEY.length
        this.HOST0 = [
            "judge0-extra-ce.p.rapidapi.com",
            "judge0-ce.p.rapidapi.com"
        ]
        this.HOST1 = [
            "https://judge0-extra-ce.p.rapidapi.com/submissions",
            "https://judge0-ce.p.rapidapi.com/submissions"
        ]
        this.HOST2 = [
            "?base64_encoded=true&wait=false&fields=*",
            "?base64_encoded=true&fields=*"
        ]
        this.MAIN_HOST0 = this.HOST0[0];
        this.MAIN_HOST1 = this.HOST1[0];
        this.MAIN_HOST2 = this.HOST2[0];
    }

    changeLanguage(event) {
        this.setState(
            {language: event.target.value}
        );
    }

    submitOneTest = async (submissionInfo, index) => {
        const response = await fetch(
            `${this.MAIN_HOST1}${this.MAIN_HOST2}`,
            {
                method: "POST",
                headers: {
                    "x-rapidapi-host": this.MAIN_HOST0,
                    "x-rapidapi-key": this.API_KEY[index % this.NUMBER_OF_API_KEY], // Get yours for free at https://rapidapi.com/hermanzdosilovic/api/judge0
                    "content-type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(submissionInfo),
            }
        )
        const jsonResponse = await response.json();

        let jsonGetSolution = {
          status: { description: "In Queue" },
          stderr: null,
          compile_output: null,
        };

        while (
          (jsonGetSolution.status.description === "In Queue" ||
          jsonGetSolution.status.description === "Processing") &&
          jsonGetSolution.stderr == null &&
          jsonGetSolution.compile_output == null
        ) {
            if (jsonResponse.token) {
                let url = `${this.MAIN_HOST1}/${jsonResponse.token}${this.MAIN_HOST2}` 
                const getSolution = await fetch(url, {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": this.MAIN_HOST0,
                        "x-rapidapi-key": this.API_KEY[index % this.NUMBER_OF_API_KEY], // Get yours for free at https://rapidapi.com/hermanzdosilovic/api/judge0
                        "content-type": "application/json",
                    },
                });
                jsonGetSolution = await getSolution.json();
                // waiting 5 seconds to produce new get request
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
        return jsonGetSolution;
    }

    getSubmissions = currentSubmission => {
        return [
            {
                source_code: btoa(currentSubmission.code),
                stdin: btoa("1 0"),
                language_id: currentSubmission.language_id,
                expected_output: btoa("1"),
                stack_limit: "256",
                memory_limit: "2048"  
            },
            {
                source_code: btoa(currentSubmission.code),
                stdin: btoa("0 1"),
                language_id: currentSubmission.language_id,
                expected_output: btoa("1"),
                stack_limit: "256",
                memory_limit: "2048"
            }
        ];
    }

    
    submit = async (e) => {
        e.preventDefault();
        console.log("clicked\n");
        console.log(this.state.problemID);
        console.log(this.state.language);
        console.log(this.state.source);
        let ourSubmission = {
            submission_id: "",
            user_id: "doanphuduc123",
            problem_id: this.state.problemID,
            language_id: this.state.language_id,
            language: this.mapToLanguageName[this.state.language_id],
            verdict: "Running",
            time: "1",
            memory: "2048",
            code: this.state.source,
        }
        // get last submission id + 1 for our submission
        await axios.post('http://localhost:3000/viewsubmission/last-submission-id')
                    .then(response => {
                        console.log((parseInt(response.data[0].submission_id) + 1).toString().padStart(5, '0'));
                        ourSubmission.submission_id = (parseInt(response.data[0].submission_id) + 1).toString().padStart(5, '0');
                    })  
                    .catch(error => {
                        console.log(error);
                    });

        axios.post('http://localhost:3000/viewsubmission/add', ourSubmission)
                    .then(response => {
                        console.log(response);
                    })  
                    .catch(error => {
                        console.log(error);
                    });

        // create a list of submission info {source, stdin, language_id} test to submit
        const submissions = this.getSubmissions(ourSubmission);
        const submissionPromises = submissions.map(this.submitOneTest);
        // // judge all tests
        const ourResults = await Promise.all(submissionPromises);
        // console.log(typeof ourResults);
        let finalResult = "Accepted"
        for (const result of ourResults) {
            if (result.status.description !== "Accepted") {
                console.log(result);
                finalResult = result.status.description;
                break;
            }
        }

        let newSubmission = ourSubmission;
        newSubmission.verdict = finalResult;

        axios.post('http://localhost:3000/viewsubmission/modify', newSubmission)
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
                        <option value="2">C++</option>
                        <option value="4">Java</option>
                        <option value="10">Python</option>
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
