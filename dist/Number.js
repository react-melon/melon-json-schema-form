define('melon-json-schema-form/Number', [
    'require',
    'exports',
    'module',
    'react',
    'melon/TextBox',
    'melon/Title',
    './factory'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var TextBox = require('melon/TextBox');
    var Title = require('melon/Title');
    var main = require('./factory');
    var NumberComponent = React.createClass({
        displayName: 'NumberComponent',
        render: function render() {
            var _props = this.props;
            var schema = _props.schema;
            var value = _props.value;
            var name = _props.name;
            var _onChange = _props.onChange;
            var title = schema.title;
            return React.createElement('div', { className: 'ui-field variant-number' }, React.createElement(Title, { level: 4 }, title), React.createElement(TextBox, {
                variants: ['fluid'],
                name: name,
                rules: schema,
                numberic: true,
                value: value != null ? +value : '',
                onChange: function onChange(e) {
                    _onChange({ value: e.value });
                }
            }));
        }
    });
    main.registerComponent('number', NumberComponent);
    module.exports = NumberComponent;
});