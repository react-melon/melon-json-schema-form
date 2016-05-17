/**
 * @file example/App
 * @author leon(ludafa@outlook.com)
 */

import u from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'melon/Button';

// const locator = require('./locator');
// const App = require('./App');
// const Page = require('./Page');
// const routes = require('./routes');

/* globals ace */

import {Form, Field} from 'melon-json-schema-form';

const LOCAL_STORAGE_SCHEMA_KEY = 'MELON-JSON-SCHEMA-FORM-SCHEMA';
const LOCAL_STORAGE_DATA_KEY = 'MELON-JSON-SCHEMA-FORM-DATA';

let store = {
    data: localStorage.getItem(LOCAL_STORAGE_DATA_KEY) || JSON.stringify(require('./data'), 0, 4),
    schema: localStorage.getItem(LOCAL_STORAGE_SCHEMA_KEY) || JSON.stringify(require('./schema'), 0, 4),
    displaySchema: '{}'
};

function render(state) {

    const main = document.querySelector('#app');

    try {

        let {schema, data} = state;

        schema = JSON.parse(schema);
        data = JSON.parse(data);

        const properties = schema.properties;

        ReactDOM.render(
            <Form schema={schema} onSubmit={e => {
                e.preventDefault();
                console.log(e.data);
            }}>
                {Object.keys(properties).map(name =>
                    <Field
                        name={name}
                        key={name}
                        schema={properties[name]}
                        value={data[name]} />
                )}
                <footer className="form-footer">
                    <Button type="submit" variants={['info', 'raised']}>提交</Button>
                </footer>
            </Form>,
            main
        );

    }
    catch (e) {
        ReactDOM.render(
            <div>{e.stack.split('\n').map(line => <p>{line}</p>)}</div>,
            main
        );
    }

}

function onEdit(key) {

    try {

        const value = this.getValue();
        localStorage.setItem(`MELON-JSON-SCHEMA-FORM-${key.toUpperCase()}`, value);

        store = {
            ...store,
            [key]: value
        };

        render(store);
    }
    catch (e) {
        console.error(e.stack);
    }

}

exports.init = function () {

    document.querySelector('#schema-editor').innerHTML = store.schema || '';
    document.querySelector('#data-editor').innerHTML = store.data || '';
    document.querySelector('#display-schema-editor').innerHTML = store.displaySchema || '';

    let schemaEditor = ace.edit('schema-editor');
    schemaEditor.setTheme('ace/theme/monokai');
    schemaEditor.getSession().setMode('ace/mode/json');
    schemaEditor.on('change', u.debounce(onEdit.bind(schemaEditor, 'schema'), 1000));

    let dataEditor = ace.edit('data-editor');
    dataEditor.setTheme('ace/theme/monokai');
    dataEditor.getSession().setMode('ace/mode/json');
    dataEditor.on('change', u.debounce(onEdit.bind(dataEditor, 'data'), 1000));

    let displaySchemaEditor = ace.edit('display-schema-editor');
    displaySchemaEditor.setTheme('ace/theme/monokai');
    displaySchemaEditor.getSession().setMode('ace/mode/json');
    displaySchemaEditor.on('change', u.debounce(onEdit.bind(displaySchemaEditor, 'displaySchema'), 1000));

    render(store);

};
