(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/Select', 'melon-core/util/shallowEqual', 'classnames', '../../ValidityLabel', '../../../factory'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/Select'), require('melon-core/util/shallowEqual'), require('classnames'), require('../../ValidityLabel'), require('../../../factory'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Select, global.shallowEqual, global.classnames, global.ValidityLabel, global.factory);
        global.Enum = mod.exports;
    }
})(this, function (exports, _react, _Select, _shallowEqual, _classnames, _ValidityLabel, _factory) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

    var _Select2 = _interopRequireDefault(_Select);

    var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

    var _classnames2 = _interopRequireDefault(_classnames);

    var _ValidityLabel2 = _interopRequireDefault(_ValidityLabel);

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

    var EnumTextField = function (_Component) {
        _inherits(EnumTextField, _Component);

        function EnumTextField() {
            _classCallCheck(this, EnumTextField);

            return _possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        EnumTextField.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        EnumTextField.prototype.render = function render() {
            var _props = this.props;
            var schema = _props.schema;
            var value = _props.value;
            var name = _props.name;
            var actions = _props.actions;
            var meta = _props.meta;
            var title = schema.title;
            var description = schema.description;
            var enumNames = schema.enumNames;
            var error = meta.error;
            var touched = meta.touched;


            var valid = touched && error && error.message;

            var className = (0, _classnames2['default'])('ui-control-enum', {
                'state-invalid': !valid,
                'state-valid': valid
            });

            return _react2['default'].createElement(
                'div',
                { className: className },
                title ? _react2['default'].createElement(
                    'header',
                    {
                        className: 'ui-control-enum-title' },
                    title
                ) : null,
                description ? _react2['default'].createElement(
                    'p',
                    {
                        className: 'ui-control-enum-decription' },
                    description
                ) : null,
                _react2['default'].createElement(
                    _Select2['default'],
                    {
                        size: 'xxs',
                        variants: ['fluid'],
                        name: name,
                        value: value == null ? schema.defaultValue : value,
                        onChange: function onChange(e) {
                            actions.change(name, e.value);
                            actions.validate(name);
                        } },
                    schema['enum'].map(function (item, index) {
                        return _react2['default'].createElement(
                            'option',
                            { key: item, value: item },
                            enumNames && enumNames[index] || item
                        );
                    })
                ),
                _react2['default'].createElement(_ValidityLabel2['default'], meta)
            );
        };

        return EnumTextField;
    }(_react.Component);

    exports['default'] = EnumTextField;


    EnumTextField.propTypes = {
        schema: _react.PropTypes.object.isRequired,
        value: _react.PropTypes.string
    };

    (0, _factory.registerControl)(function (schema) {

        if (schema.type === 'string' && schema['enum']) {
            return EnumTextField;
        }
    });
});
//# sourceMappingURL=Enum.js.map
