import React, { Component, memo } from "react";
import axios from "axios";
import { ControlledEditor } from "@monaco-editor/react";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default class ViewOneSubmission extends Component {
  
    constructor(props) {
    super(props);

    this.state = {
        language_id : '2',
        source: '#include<iostream>\nusing namespace <std>\nint main()\n{\n\treturn 0;\n}',
        problemID: '',
    }
    this.mapToLanguageName = {
        '2': 'cpp',
        '4': 'java',
        '10': 'python',
    }
}



  render() {

    return(
        <Popup trigger={<button> Trigger</button>} modal>
        <div>

        <div className="header"> Submission #00001 </div>   
        <br></br>
        <ControlledEditor
        value = {this.state.source}
        language = {this.mapToLanguageName[this.state.language_id]}
        height = {"40vh"}
        options={{
            readOnly: true,
            scrollBeyondLastColumn: 0,
            scrollBeyondLastLine: false,
            minimap: {
              enabled: false
            },
            scrollbar: {
              alwaysConsumeMouseWheel: false
            }
          }}
    />
    </div>
     </Popup>  
    );
}
}
