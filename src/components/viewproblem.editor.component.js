import React, {useState, Component} from 'react';
import { ControlledEditor } from "@monaco-editor/react";

export default class Editor extends Component    {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ControlledEditor
                value = {this.props.value}
                language = {this.props.mode}
                height = {"70vh"}
                onChange = {(event, value) => {
                    if (value !== undefined && this.props.onChange) this.props.onChange(value);
                }}
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
