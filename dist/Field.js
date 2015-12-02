define('melon-json-schema-form/Field', [
    'require',
    'exports',
    'module',
    'react',
    './factory'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var main = require('./factory');
    var Field = React.createClass({
        displayName: 'Field',
        render: function render() {
            var _props = this.props;
            var schema = _props.schema;
            var value = _props.value;
            var name = _props.name;
            var type = schema.type;
            var AcutualComponent = main.getComponent(type);
            return React.createElement(AcutualComponent, {
                name: name,
                schema: schema,
                value: value
            });
        }
    });
    var PropTypes = React.PropTypes;
    Field.propTypes = {
        schema: PropTypes.object.isRequired,
        pointer: PropTypes.string.isRequired
    };
    Field.defaultProps = { pointer: '' };
    module.exports = Field;
});