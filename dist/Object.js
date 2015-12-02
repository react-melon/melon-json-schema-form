define('melon-json-schema-form/Object', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './factory',
    'melon/createInputComponent',
    'melon/Title'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var main = require('./factory');
    var _require = require('melon/createInputComponent');
    var create = _require.create;
    var Title = require('melon/Title');
    var ObjectComponent = React.createClass({
        displayName: 'ObjectComponent',
        render: function render() {
            var _props = this.props;
            var schema = _props.schema;
            var _props$value = _props.value;
            var value = _props$value === undefined ? {} : _props$value;
            var pointer = _props.pointer;
            var _onChange = _props.onChange;
            var properties = schema.properties;
            var title = schema.title;
            return React.createElement('section', {
                'data-pointer': pointer,
                className: 'ui-field variant-map'
            }, React.createElement(Title, { level: 3 }, title), Object.keys(properties).map(function (name) {
                var subSchema = properties[name];
                var type = subSchema.type;
                var Field = main.getComponent(type);
                return React.createElement(Field, {
                    schema: subSchema,
                    value: value[name],
                    key: pointer + '/' + name,
                    name: name,
                    onChange: function onChange(e) {
                        _onChange({ value: babelHelpers.extends({}, value, babelHelpers.defineProperty({}, name, e.value)) });
                    }
                });
            }));
        }
    });
    ObjectComponent = create(ObjectComponent);
    main.registerComponent('object', ObjectComponent);
    module.exports = ObjectComponent;
});