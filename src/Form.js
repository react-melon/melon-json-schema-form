/**
 * @file melon json schema form
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const Form = require('melon/Form');
const validator = require('melon-json-schema-validator');

const JSONSchemaForm = React.createClass({

    getDefaultProps() {
        return {
            validator
        };
    },

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

});

module.exports = JSONSchemaForm;
