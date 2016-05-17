/**
 * @file melon json schema form
 * @author leon(ludafa@outlook.com)
 */

import React, {Component} from 'react';
import Form from 'melon/Form';
import validator from 'melon-json-schema-validator';

export default class JSONSchemaForm extends Component {

    render() {

        const {validator, children, ...rest} = this.props;

        return (
            <Form
                {...rest}
                validator={validator}
                variants={['json-schema']}>
                {children}
            </Form>
        );
    }

}

JSONSchemaForm.defaultProps = {
    validator
};
