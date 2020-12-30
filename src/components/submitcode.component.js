import React, {Component} from 'react';
import Editor from './viewproblem.editor.component'
import '../css/submitcode.component.css'
import {Button} from "@material-ui/core";
import {withRouter} from 'react-router-dom';
import axios from "axios";

export default class SubmitCode extends Component  {
    constructor(props)
    {
        super(props);
        this.state = {
            language_id : '54',
            source: '',
            problemID: '',
            inputs: null,
            outputs: null,
            time_limit: '',
            memory_limit: ''
        }
        this.idx2LanguageName = {
            '54': 'cpp',
            '62': 'java',
            '71': 'python',
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
        this.NUMBER_OF_API_KEY = this.API_KEY.length;
        this.HOST0 = [
            "judge0-extra-ce.p.rapidapi.com",
            "judge0-ce.p.rapidapi.com"
        ];
        this.HOST1 = [
            "https://judge0-extra-ce.p.rapidapi.com/submissions",
            "https://judge0-ce.p.rapidapi.com/submissions"
        ];
        this.HOST2 = [
            "?base64_encoded=true&wait=false&fields=*",
            "?base64_encoded=true&fields=*"
        ];
        this.MAIN_HOST0 = this.HOST0[1];
        this.MAIN_HOST1 = this.HOST1[1];
        this.MAIN_HOST2 = this.HOST2[1];
    }

    componentDidMount = async() => {
        if(this.props.location.state){
            let id = this.props.location.state.id;
            this.setState({problemID: id});
        }
    }

    changeLanguage(event) {
        this.setState(
            {language_id: event.target.value}
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
        let data = null;
        let id = this.state.problemID;
        // we got data here
        return this.state.inputs.map((input, index) => {
            return {
                source_code: btoa(currentSubmission.code),
                stdin: btoa(input),
                language_id: currentSubmission.language_id,
                expected_output: btoa(this.state.outputs[index]),
                memory_limit: JSON.stringify(this.state.memory_limit * 1000),
                cpu_time_limit: JSON.stringify(this.state.time_limit),
            }
        });
    }

    loadTestcases = async(problemID) => {
        let data = null;
        let id = problemID;
        const response = await axios
            .get(`http://localhost:5000/problemset/viewproblem/${id}`)
            .then((response) => {
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
                this.setState({inputs: inputs, outputs: outputs, time_limit: time_limit, memory_limit: mem_limit});
            })
            .catch((error) => {
                console.log(error);
            });
        return response;
    }

    
    submit = async (e) => {
        
        e.preventDefault();
        await this.loadTestcases(this.state.problemID); // load testcases from database
        console.log("language_id = ", this.state.language_id);
        console.log("time limit = ", this.state.time_limit);
        console.log("mem limit = ", this.state.memory_limit);
        if (this.state.inputs == null) {
            // problem not found
            console.log("problem id not found\n");
        } else {
            let ourSubmission = {
                submission_id: "",
                user_id: "doanphuduc123",
                problem_id: this.state.problemID,
                language_id: this.state.language_id,
                language: this.idx2LanguageName[this.state.language_id],
                verdict: "Running",
                time: '0',
                memory: '0',
                code: this.state.source,
            }
            // get last submission id + 1 for our submission
            await axios.post('http://localhost:5000/viewsubmission/last-submission-id')
                        .then(response => {
                            // console.log((parseInt(response.data[0].submission_id) + 1).toString().padStart(5, '0'));
                            ourSubmission.submission_id = (parseInt(response.data[0].submission_id) + 1).toString().padStart(5, '0');
                        })  
                        .catch(error => {
                            console.log(error);
                        });
            console.log("ourSubmission = ", ourSubmission);
            axios.post('http://localhost:5000/viewsubmission/add', ourSubmission)
                        .then(response => {
                            // console.log(response);
                        })  
                        .catch(error => {
                            console.log(error);
                        });
            this.props.history.push('viewsubmission');

            // create a list of submission info {source, stdin, language_id} test to submit
            const submissions = this.getSubmissions(ourSubmission);
            console.log("submissions = ", submissions);

            const submissionPromises = submissions.map(this.submitOneTest);
            // // judge all tests
            const ourResults = await Promise.all(submissionPromises);
            let finalResult = "Accepted";
            let finalTime = 0;
            let finalMem = 0;
            for (const result of ourResults) {
                console.log("result = ", result);
                if (result.status.description !== "Accepted") {
                    finalResult = result.status.description;
                    break;
                }
                if (parseFloat(result.time) > finalTime) finalTime = parseFloat(result.time);
                if (result.memory > finalMem) finalMem = result.memory;
            }

            let newSubmission = ourSubmission;
            newSubmission.verdict = finalResult;
            newSubmission.time = (finalTime * 1000).toString();
            newSubmission.memory = finalMem.toString();
            console.log("newSubmission = ", newSubmission);

            axios.post('http://localhost:5000/viewsubmission/modify', newSubmission)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {
                            console.log(error);
                        });
        }
    }

    changeSource = (value) => {
        this.setState ({
            source: value
        });

    }

    onInputChange = (e) => {
        e.preventDefault();
        this.setState({problemID: e.target.value});
    }   

    render() {
        return (
            // Your code goes here, must included in a <div>
            <div className="SubmitCode">
                <div className='Title'>
                    <p>
                        Submit Solution
                    </p>
                </div>
                <div className='Problem'>
                    <p>Problem:</p>
                    <input name='problemName' type='text' onChange = {this.onInputChange} value={this.state.problemID}/>
                </div>

                <div className='Language'>
                    <p>Language:</p>
                    <select name="programmingLanguage" id="pl" onChange={this.changeLanguage}>
                        <option value="54">C++</option>
                        <option value="62">Java</option>
                        <option value="71">Python</option>
                    </select>
                </div>

                <div className='Code'>
                    <p>Source code:</p>
                    <div className='Editor'>

                        <Editor 
                            mode={this.idx2LanguageName[this.state.language_id]} 
                            value={this.state.source} 
                            onChange={this.changeSource}/>    
                    </div>
                </div>
                <br/>
                <Button type="submit" onClick={this.submit}>
                        Submit
                </Button>
            </div>
        );
    }
}
