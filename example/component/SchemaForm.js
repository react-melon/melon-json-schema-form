/**
 * @file SchemaForm
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import {Form} from '../../src/index';
import Button from 'melon/Button';

const UI_SCHMEA = {
    '@order': [
        'position',
        'title',
        'subTitle',
        '*'
    ],
    'position': {
        '@order': ['left', 'top']
    }
};

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

        return (
            <Form
                className="schema-form"
                schema={schema}
                uiSchema={UI_SCHMEA}
                value={formData}
                onSubmit={onSubmit}
                onFieldChange={onFieldChange}>
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
