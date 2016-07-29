/**
 * @file melon json schema form
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes, Children, cloneElement} from 'react';
import Form from 'melon/Form';
import InputComponent from 'melon-core/InputComponent';
import Validator from 'melon-json-schema-validator';
import * as jp from './pointer';

const validator = new Validator({
    jsonPointers: true
});

export default class JSONSchemaForm extends Form {

    constructor(props, context) {
        super(props, context);
        this.state = {};
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

        return this.fields.reduce(
            function (data, field) {
                jp.set(data, field.pointer, field.getValue());
                return data;
            },
            type === 'array' ? [] : {}
        );

    }

    validate() {

        const validity = this.checkValidity();

        const states = validity.states;
        const isValid = validity.isValid();

        if (!isValid) {

            const fields = this.fields;

            states.forEach(function (state) {

                for (let i = 0, len = fields.length; i < len; ++i) {

                    const field = fields[i];

                    if (field.pointer === state.dataPath && !field.props.customValidity) {
                        field.setCustomValidity(state.message);
                        break;
                    }

                }

            });

        }

        return isValid;
    }

    checkValidity() {
        const data = this.getData();
        const validator = this.props.validator;
        return validator.validate(data, this);
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
