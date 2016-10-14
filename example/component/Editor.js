/**
 * @file Editor
 * @author leon <ludafa@outlook.com>
 */

import CodeMirror from 'codemirror';
import React, {Component, PropTypes} from 'react';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldgutter.css';
import jsonlint from '../util/jsonlint';

/* eslint-disable babel/new-cap */
CodeMirror.registerHelper('lint', 'json', function (text) {
    const found = [];
    jsonlint.parseError = function (str, hash) {
        const loc = hash.loc;
        found.push({
            from: CodeMirror.Pos(loc.first_line - 1, loc.first_column),
            to: CodeMirror.Pos(loc.last_line - 1, loc.last_column),
            message: str
        });
    };
    try {
        jsonlint.parse(text);
    }
    catch (e) {}
    return found;
});
/* eslint-enable babel/new-cap */

export default class Editor extends Component {

    componentDidMount() {

        const {
            readOnly,
            onChange
        } = this.props;

        const cm = new CodeMirror(this.refs.main, {
            value: this.props.value || '',
            mode: 'application/json',
            indentUnit: 2,
            lineNumbers: true,
            lineWrapping: true,
            indentWithTabs: false,
            styleActiveLine: true,
            theme: 'material',
            autoCloseBrackets: true,
            gutters: ['CodeMirror-lint-markers', 'CodeMirror-foldgutter'],
            lint: true,
            foldGutter: true,
            readOnly
        });

        cm.on('change', () => {

            if (!this.isChanging) {
                onChange({
                    value: cm.getDoc().getValue()
                });
            }

            this.isChanging = false;

        });

        this.cm = cm;

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value
            && nextProps.value !== this.cm.getDoc().getValue()
        ) {
            this.cm && this.cm.setValue(nextProps.value);
            this.isChanging = true;
        }
    }

    render() {
        return (
            <div className="ui-editor">
                <h3>{this.props.title}</h3>
                <div ref="main" />
            </div>
        );
    }

}

Editor.propTypes = {
    readOnly: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

Editor.defaultProps = {
    readOnly: false
};
