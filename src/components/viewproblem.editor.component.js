import React, {useState, Component} from 'react';
import { ControlledEditor } from "@monaco-editor/react";

export default class Editor extends Component    {
    constructor(props) {
        super(props);
        this.editorProps = {
            mode: 'cpp',
            value: "",
            autoheight: false
        };
    }
    render() {
        return (
            <ControlledEditor
                value = {this.editorProps.value}
                language = {this.props.mode}
                height = {"70vh"}
                options={{
                    readOnly: false,
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
        );
    }
}
