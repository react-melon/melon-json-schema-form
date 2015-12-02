define('melon-json-schema-form/Form', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon/Form',
    'melon-json-schema-validator'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var Form = require('melon/Form');
    var validator = require('melon-json-schema-validator');
    var JSONSchemaForm = React.createClass({
        displayName: 'JSONSchemaForm',
        getDefaultProps: function getDefaultProps() {
            return { validator: validator };
        },
        render: function render() {
            var _props = this.props;
            var validator = _props.validator;
            var children = _props.children;
            var rest = babelHelpers.objectWithoutProperties(_props, [
                'validator',
                'children'
            ]);
            return React.createElement(Form, babelHelpers.extends({}, rest, {
                validator: validator,
                variants: ['json-schema']
            }), children);
        }
    });
    module.exports = JSONSchemaForm;
});