import React, {Component} from 'react';
import Editor from './viewproblem.editor.component'
import '../css/submitcode.component.css'

export default class SubmitCode extends Component  {
    constructor(props)
    {
        super(props);
        this.state = {
            language : 'cpp'
        }

        this.changeLanguage = this.changeLanguage.bind(this);
    }

    changeLanguage(event) {
        this.setState(
            {language: event.target.value}
        );
    }

    render() {
        const {language} = this.state;
        return (
            // Your code goes here, must included in a <div>
            <div className="SubmitCode">

                <div className='Problem'>
                    <p>Problem:</p>
                    <input name='problemName' type='text'/>
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
                        <Editor mode={language}/>    
                    </div>
                </div>
                <br/>
                <input class='submit' type='submit' value='Submit'/>
            </div>
        );
    }
}
