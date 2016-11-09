/**
 * @file melon json schema form
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import Form from 'melon-core/Form';
import Validator from 'melon-json-schema-validator';
import * as jp from './pointer';
import ReactDOM from 'react-dom';
import Field from './Field';
import {getOrderedKeys} from './util/getOrderedKeys';

const validator = new Validator({
    jsonPointers: true,
    allErrors: true
});

validator.addFormat('color', /^#[0-9a-f]{6}$/i);

export default class JSONSchemaForm extends Form {

    constructor(...args) {
        super(...args);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    isValidFormField(field) {

        const value = field.getValue();
        const {pointer, props} = field;
        const {name, disabled} = props;

        return name
            && !disabled
            && value != null
            && pointer;

    }

    getData() {

        const type = this.props.schema.type;

        return this.fields.reduceRight(
            function (data, field) {
                jp.set(data, field.pointer, field.getValue());
                return data;
            },
            type === 'array' ? [] : {}
        );

    }

    validate() {

        const data = this.getData();
        const validity = this.checkValidity(data);
        const fields = this.fields;
        const states = validity.states;
        const isValid = validity.isValid();

        const invalidFieldMap = states.reduce(function (map, state) {
            map[state.dataPath] = state;
            return map;
        }, {});

        let first = null;

        for (let i = fields.length - 1; i >= 0; i--) {
            const field = fields[i];
            const state = invalidFieldMap[field.pointer];

            if (state) {
                field.setCustomValidity(state.message);
                first = field;
            }
            else {
                field.setCustomValidity(null);
            }

        }

        if (first) {
            ReactDOM.findDOMNode(first).scrollIntoView();
        }

        return isValid;
    }

    checkValidity(data) {
        return this.props.validator.validate(data, this);
    }

    onSubmit(e) {

        const {
            noValidate,
            onSubmit
        } = this.props;

        if (!noValidate) {
            if (!this.validate()) {
                e.preventDefault();
                return;
            }
        }

        if (onSubmit) {
            e.data = this.getData();
            onSubmit(e);
        }
    }

    onFieldChange(e) {
        const onFieldChange = this.props.onFieldChange;
        if (onFieldChange) {
            onFieldChange(e);
        }
    }

    render() {

        const {
            schema,
            uiSchema = {},
            value = {},
            renderForm,
            ...rest
        } = this.props;

        const properties = schema.properties;

        const fields = getOrderedKeys(schema.properties, uiSchema['@order'])
            .map(name => (
                <Field
                    name={name}
                    key={name}
                    schema={properties[name]}
                    uiSchema={uiSchema[name]}
                    value={value[name]}
                    onChange={this.onFieldChange} />
            ));

        return (
            <form {...rest} onSubmit={this.onSubmit}>
                {renderForm(this.props, fields)}
            </form>
        );

    }

}

JSONSchemaForm.displayName = 'JSONSchemaForm';

JSONSchemaForm.defaultProps = {
    validator,
    renderForm(props, fields = []) {
        return fields.concat(props.children);
    }
};

JSONSchemaForm.propTypes = {
    ...Form.propTypes,
    schema: PropTypes.object.isRequired,
    onFieldChange: PropTypes.func
};

JSONSchemaForm.childContextTypes = Form.childContextTypes;
