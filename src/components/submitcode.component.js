import React, {Component} from 'react';
import '../css/submitcode.component.css'

export default class SubmitCode extends Component  {
    render() {
        return (
            // Your code goes here, must included in a <div>
            <div className="SubmitCode">

                <div className='Problem'>
                    <p>Problem:</p>
                    <input name='problemName' type='text'/>
                </div>

                <div className='Language'>
                    <p>Language:</p>
                    <select name="programmingLanguage" id="pl">
                        <option value="C++">C++</option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                    </select>
                </div>

                <div className='Code'>
                    <p>Source code:</p>
                    <div className='Editor' contentEditable='true' data-text='...'/>
                </div>
                <br/>
                <input class='submit' type='submit' value='Submit'/>
            </div>
        );
    }
}
