/**
 * @file SchemaForm
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import {Form, Field} from '../../src/index';
import Button from 'melon/Button';

export default class SchemaForm extends Component {

    render() {

        const {
            schema,
            formData,
            onSubmit,
            onFieldChange
        } = this.props;

        if (!schema) {
            return (
                <div>nothing to render</div>
            );
        }

        const properties = schema.properties;

        const fields = Object
            .keys(properties)
            .map(name => (
                <Field
                    name={name}
                    key={name}
                    schema={properties[name]}
                    value={formData[name]}
                    onChange={onFieldChange} />
            ));

        return (
            <Form className="schema-form" onSubmit={onSubmit} schema={schema}>
                {fields}
                <footer className="form-footer">
                    <Button
                        variants={['primary', 'raised']}
                        type="submit">submit</Button>
                </footer>
            </Form>
        );

    }

}

SchemaForm.propTypes = {
    schema: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired
};
