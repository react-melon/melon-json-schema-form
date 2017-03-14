(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../../factory', 'melon-core/util/shallowEqual', './Control', '../Field', '../../util/getOrderedKeys', '../../util/field', 'classnames'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../../factory'), require('melon-core/util/shallowEqual'), require('./Control'), require('../Field'), require('../../util/getOrderedKeys'), require('../../util/field'), require('classnames'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.factory, global.shallowEqual, global.Control, global.Field, global.getOrderedKeys, global.field, global.classnames);
        global.Object = mod.exports;
    }
})(this, function (exports, _react, _factory, _shallowEqual, _Control, _Field, _getOrderedKeys, _field, _classnames) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

    var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

    var _Control2 = _interopRequireDefault(_Control);

    var _Field2 = _interopRequireDefault(_Field);

    var _classnames2 = _interopRequireDefault(_classnames);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ObjectControl = function (_Component) {
        _inherits(ObjectControl, _Component);

        function ObjectControl() {
            _classCallCheck(this, ObjectControl);

            return _possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        ObjectControl.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(this.props, nextProps);
        };

        ObjectControl.prototype.render = function render() {
            var _props = this.props,
                schema = _props.schema,
                uiSchema = _props.uiSchema,
                name = _props.name,
                disabled = _props.disabled,
                readOnly = _props.readOnly,
                hidden = _props.hidden,
                _props$meta = _props.meta,
                meta = _props$meta === undefined ? {} : _props$meta;
            var title = schema.title,
                description = schema.description,
                properties = schema.properties;


            var keys = uiSchema.$order ? (0, _getOrderedKeys.getOrderedKeys)(properties, uiSchema.$order) : Object.keys(properties);

            var fields = keys.map(function (childName) {

                var key = '' + name + (name ? '.' : '') + childName;

                return _react2['default'].createElement(_Field2['default'], {
                    key: key,
                    name: key,
                    schema: properties[childName],
                    uiSchema: uiSchema[childName],
                    control: _Control2['default'],
                    format: _field.format,
                    disabled: disabled,
                    readOnly: readOnly
                });
            });

            var touched = meta.touched,
                error = meta.error;

            var invalid = touched && error && error.message;

            var className = (0, _classnames2['default'])('ui-control-object', {
                'state-valid': !invalid,
                'state-invalid': invalid,
                'state-hidden': hidden
            });

            return _react2['default'].createElement(
                'div',
                { className: className },
                title ? _react2['default'].createElement(
                    'header',
                    {
                        className: 'ui-control-object-title' },
                    title
                ) : null,
                description ? _react2['default'].createElement(
                    'p',
                    { className: 'ui-control-object-description' },
                    description
                ) : null,
                _react2['default'].createElement(
                    'div',
                    { className: 'ui-control-object-content' },
                    fields
                )
            );
        };

        return ObjectControl;
    }(_react.Component);

    exports['default'] = ObjectControl;


    ObjectControl.propTypes = {
        name: _react.PropTypes.string.isRequired,
        uiSchema: _react.PropTypes.object.isRequired,
        schema: _react.PropTypes.object.isRequired
    };

    ObjectControl.defaultProps = {
        uiSchema: {}
    };

    (0, _factory.registerControl)(function (schema) {

        if (schema.type === 'object') {
            return ObjectControl;
        }
    });
});
//# sourceMappingURL=Object.js.map
