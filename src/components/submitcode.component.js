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
            memory_limit: '',
            too_long: false,
        }
        this.idx2LanguageName = {
            '54': 'cpp',
            '62': 'java',
            '71': 'python',
        }
        this.changeLanguage = this.changeLanguage.bind(this);
        this.usernamefake = localStorage.getItem("username");
        this.isLoggedIn = localStorage.getItem("isLoggedIn");

        // some constant number for judge0 api
        this.API_KEY = [
            "cdce9a4057msh927651e0ff3672ep12b97ejsn61d13f5ff00a",
            "fd5e06d943mshaab1ec1bc5a2669p14950fjsn58d3a4b3d295",
            "8a10748596msh2b9912ada0e6e7ap122fc7jsnf743fc57c95e",
            "9ec22d26eemsh667d4486f803c30p1b74cajsnfb7366256027",
            "01339e241dmsh3b766703701e14ep1732e0jsnbe8ff4dbd87b",
            "f678df5c66msh95ffdba00b36b9ep1e40bbjsn2e80aab66142",
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
        this.usernamefake = localStorage.getItem("username");
        this.isLoggedIn = localStorage.getItem("isLoggedIn");
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
        );
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
        if (this.state.too_long) {
            alert("You can not submit your code because it is too long!");
            return null;
        }
        e.preventDefault();
        await this.loadTestcases(this.state.problemID); // load testcases from database
        console.log("language_id = ", this.state.language_id);
        console.log("time limit = ", this.state.time_limit);
        console.log("mem limit = ", this.state.memory_limit);
        console.log("length of source code = ", this.state.source.length);

        // fix bug: telex text
        try {
            let sourceCodeConverted = btoa(this.state.source);
        } catch(err) {
            alert("Your code contain some banning characters");
            return null;
        }

        // fix bug: source code is too long
        

        if (this.state.inputs == null) {
            // problem not found
            alert("Problem ID not found !");
        } else {
            let ourSubmission = {
                submission_id: "",
                user_id: this.usernamefake,
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
            await axios.post('http://localhost:5000/viewsubmission/add', ourSubmission)
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
                if (parseFloat(result.time) > finalTime) finalTime = parseFloat(result.time);
                if (result.memory > finalMem) finalMem = result.memory;
                if (result.status.description !== "Accepted") {
                    finalResult = result.status.description;
                    break;
                }
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
        console.log(value.length);
        if (value.length > 64000) {
            this.setState({
                too_long: true,
            });
            alert("Your code is too long, our platform can not submit >= 64Kb");
        } else {
            this.setState ({
                too_long: false,
                source: value
            });
        }

    }

    onInputChange = (e) => {
        e.preventDefault();
        this.setState({problemID: e.target.value});
    }   

    render() {
        if (this.isLoggedIn)
        {
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
    
    else
    {
        return(
        <p> Please log in to Submit Code</p>
        );
    }
}
}
