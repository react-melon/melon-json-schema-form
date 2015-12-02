define('melon-json-schema-form/String', [
    'require',
    'exports',
    'module',
    'react',
    'melon/TextBox',
    'melon/Title',
    './factory',
    'melon/createInputComponent'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var TextBox = require('melon/TextBox');
    var Title = require('melon/Title');
    var factory = require('./factory');
    var StringComponent = React.createClass({
        displayName: 'StringComponent',
        render: function render() {
            var _props = this.props;
            var schema = _props.schema;
            var value = _props.value;
            var pointer = _props.pointer;
            var name = _props.name;
            var _onChange = _props.onChange;
            var title = schema.title;
            var placeholder = schema.placeholder;
            var maxLength = schema.maxLength;
            return React.createElement('div', {
                className: 'ui-field variant-string',
                key: pointer
            }, React.createElement(Title, { level: 4 }, title), React.createElement(TextBox, {
                variants: ['fluid'],
                multiline: maxLength && maxLength >= 120,
                placeholder: placeholder,
                name: name,
                rules: schema,
                value: value,
                onChange: function onChange(e) {
                    _onChange(e);
                }
            }));
        }
    });
    StringComponent = require('melon/createInputComponent').create(StringComponent);
    factory.registerComponent('string', StringComponent);
    module.exports = StringComponent;
});