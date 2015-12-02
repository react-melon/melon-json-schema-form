define('melon-json-schema-form/Array', [
    'require',
    'exports',
    'module',
    './factory',
    'react',
    'melon/Title',
    'melon/createInputComponent'
], function (require, exports, module) {
    'use strict';
    var factory = require('./factory');
    var React = require('react');
    var Title = require('melon/Title');
    var createInputComponent = require('melon/createInputComponent');
    var ArrayComponent = React.createClass({
        displayName: 'ArrayComponent',
        renderArray: function renderArray(schema, value, pointer) {
            var items = schema.items;
            var title = schema.title;
            var _onChange = this.props.onChange;
            return React.createElement('section', {
                className: 'ui-field variant-array',
                rules: schema,
                key: pointer
            }, React.createElement(Title, { level: 3 }, title), value.map(function (record, index) {
                var type = items.type;
                var recordPointer = pointer + '/' + index;
                var Field = factory.getComponent(type);
                return React.createElement(Field, {
                    key: recordPointer,
                    name: index + '',
                    value: record,
                    schema: items,
                    onChange: function onChange(e) {
                        _onChange({ value: value.slice(0, index).concat(e.value).concat(value.slice(index + 1)) });
                    }
                });
            }));
        },
        renderTuple: function renderTuple(schema, value, pointer) {
            var items = schema.items;
            var title = schema.title;
            var _onChange2 = this.props.onChange;
            return React.createElement('section', {
                className: 'ui-field variant-tuple',
                rules: schema
            }, React.createElement(Title, { level: 3 }, title), items.map(function (item, index) {
                var type = item.type;
                var recordPointer = pointer + '/' + index;
                var Field = factory.getComponent(type);
                return React.createElement(Field, {
                    key: recordPointer,
                    schema: item,
                    value: value[index],
                    name: index + '',
                    onChange: function onChange(e) {
                        _onChange2({ value: value.slice(0, index).concat(e.value).concat(value.slice(index + 1)) });
                    }
                });
            }));
        },
        render: function render() {
            var _props = this.props;
            var schema = _props.schema;
            var value = _props.value;
            var pointer = _props.pointer;
            var items = schema.items;
            return Array.isArray(items) ? this.renderTuple(schema, value, pointer) : this.renderArray(schema, value, pointer);
        }
    });
    var PropTypes = React.PropTypes;
    ArrayComponent.propTypes = { value: PropTypes.array };
    ArrayComponent = createInputComponent.create(ArrayComponent);
    factory.registerComponent('array', ArrayComponent);
    module.exports = ArrayComponent;
});