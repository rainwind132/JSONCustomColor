import React from 'react';
import './style.scss';

export default class CustomPage extends React.Component {
    static propTypes = {
    };
    syntaxHighlight = (json) => {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');

        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function(match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
    render() {
        let previewJSON = {a: 3, b:[
          1,2,3
        ]};
        previewJSON = JSON.stringify(previewJSON);
        previewJSON = JSON.parse(previewJSON);
        previewJSON = this.syntaxHighlight(previewJSON);
        return (
            <React.Fragment>
                <pre dangerouslySetInnerHTML={{ __html: previewJSON }}/>
            </React.Fragment>
        );
    }
}
