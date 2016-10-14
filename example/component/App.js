/**
 * @file Example App
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import Editor from './Editor';
import SchemaForm from './SchemaForm';
import * as storage from '../storage';
import update from 'react-addons-update';
import resolveDefaults from '../../src/util/resolveDefaults';

function safeParse(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return null;
    }
}

export default class App extends Component {

    constructor(props) {

        super(props);

        const schemaText = storage.getSchema();
        const uiSchemaText = storage.getUISchema();
        const formDataText = storage.getFormData();
        const schema = safeParse(schemaText) || {};
        const formData = safeParse(formDataText) || resolveDefaults(schema);

        this.state = {
            schemaText,
            uiSchemaText,
            formDataText,
            schema,
            formData
        };

    }

    render() {

        const {
            schemaText,
            formDataText,
            schema,
            formData
        } = this.state;

        return (
            <div className="app">
                <div className="editor-container">
                    <div className="schema-editor">
                        <Editor
                            value={schemaText}
                            title="schema"
                            onChange={e => {

                                const value = e.value;

                                storage.saveSchema(value);

                                this.setState({
                                    schemaText: e.value,
                                    schema: safeParse(value) || this.state.schema
                                });

                            }} />
                    </div>
                    <div className="wrapper">
                        <div className="data-editor">
                            <Editor
                                value={formDataText}
                                title="data"
                                onChange={e => {

                                    const value = e.value;

                                    storage.saveFormData(value);

                                    this.setState({
                                        formDataText: value,
                                        formData: safeParse(value) || this.state.formData
                                    });

                                }} />
                        </div>
                    </div>
                </div>
                <div className="form">
                    <SchemaForm
                        schema={schema}
                        formData={formData}
                        onFieldChange={e => {

                            const {
                                target,
                                value
                            } = e;

                            const formData = this.state.formData;

                            const command = target.pointer.slice(1).split('/')
                                .reduceRight(function (command, name, index, arr) {

                                    if (index === arr.length - 1) {
                                        command[name] = {
                                            $set: value
                                        };
                                    }
                                    else {
                                        command = {
                                            [name]: command
                                        };
                                    }

                                    return command;

                                }, {});


                            const nextFormData = update(formData, command);
                            const formDataText = JSON.stringify(nextFormData, 0, 2);

                            storage.saveFormData(formDataText);

                            this.setState({
                                formData: nextFormData,
                                formDataText
                            });

                        }}
                        onSubmit={e => {
                            e.preventDefault();

                            const formDataText = JSON.stringify(e.data, 0, 2);

                            storage.saveFormData(formDataText);

                            this.setState({
                                formData: e.data,
                                formDataText: formDataText
                            });

                            console.log(e.data);
                        }} />
                </div>
            </div>
        );
    }

}
