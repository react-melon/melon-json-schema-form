/**
 * @file JSONSchemaForm
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'melon-form';
import {createUpload} from './util/createGetActions';
import validator from './validator';

export default class JSONSchemaForm extends Component {

    constructor(...args) {
        super(...args);
        this.getActions = this.getActions.bind(this);
        this.validate = validator();
    }

    getActions(actions) {

        return {
            upload: createUpload(actions, this.props.upload)
        };

    }

    render() {

        return (
            <Form
                {...this.props}
                validate={this.validate}
                getActions={this.getActions} />
        );

    }

}

JSONSchemaForm.propTypes = {
    ...Form.propTypes,
    upload: PropTypes.func
};
