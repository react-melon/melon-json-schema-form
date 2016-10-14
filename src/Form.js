/**
 * @file melon json schema form
 * @author leon(ludafa@outlook.com)
 */

import {PropTypes} from 'react';
import Form from 'melon-core/Form';
import Validator from 'melon-json-schema-validator';
import * as jp from './pointer';
import ReactDOM from 'react-dom';

const validator = new Validator({
    jsonPointers: true,
    allErrors: true
});

validator.addFormat('color', /^#[0-9a-f]{6}$/i);

export default class JSONSchemaForm extends Form {

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

}

JSONSchemaForm.displayName = 'JSONSchemaForm';

JSONSchemaForm.defaultProps = {
    validator
};

JSONSchemaForm.propTypes = {
    ...Form.propTypes,
    schema: PropTypes.object.isRequired
};

JSONSchemaForm.childContextTypes = Form.childContextTypes;
