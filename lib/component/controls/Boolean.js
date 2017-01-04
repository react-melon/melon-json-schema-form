(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/Toggle', '../../factory', 'melon-core/util/shallowEqual', 'classnames', '../ValidityLabel'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/Toggle'), require('../../factory'), require('melon-core/util/shallowEqual'), require('classnames'), require('../ValidityLabel'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Toggle, global.factory, global.shallowEqual, global.classnames, global.ValidityLabel);
        global.Boolean = mod.exports;
    }
})(this, function (exports, _react, _Toggle, _factory, _shallowEqual, _classnames, _ValidityLabel) {
    'use strict';

    exports.__esModule = true;
    exports.type = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _Toggle2 = _interopRequireDefault(_Toggle);

    var factory = _interopRequireWildcard(_factory);

    var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

    var _classnames2 = _interopRequireDefault(_classnames);

    var _ValidityLabel2 = _interopRequireDefault(_ValidityLabel);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

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

    var type = exports.type = 'Boolean';

    var BooleanField = function (_Component) {
        _inherits(BooleanField, _Component);

        function BooleanField() {
            _classCallCheck(this, BooleanField);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.onChange = _this.onChange.bind(_this);
            return _this;
        }

        BooleanField.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        BooleanField.prototype.onChange = function onChange(_ref) {
            var value = _ref.value;
            var _props = this.props,
                name = _props.name,
                actions = _props.actions;
            var validate = actions.validate,
                change = actions.change;


            change(name, value);
            validate(name);
        };

        BooleanField.prototype.render = function render() {
            var _props2 = this.props,
                value = _props2.value,
                schema = _props2.schema,
                meta = _props2.meta;
            var title = schema.title,
                description = schema.description;
            var touched = meta.touched,
                error = meta.error;

            var invalid = touched && error && error.message;

            var className = (0, _classnames2['default'])('ui-control-boolean', {
                'state-valid': !invalid,
                'state-invalid': invalid
            });

            return _react2['default'].createElement(
                'div',
                { className: className },
                title ? _react2['default'].createElement(
                    'header',
                    { className: 'ui-control-boolean-title' },
                    title
                ) : null,
                description ? _react2['default'].createElement(
                    'p',
                    { className: 'ui-control-boolean-description' },
                    description
                ) : null,
                _react2['default'].createElement(
                    'div',
                    { className: 'ui-control-boolean-content' },
                    _react2['default'].createElement(_Toggle2['default'], {
                        trueValue: true,
                        falseValue: false,
                        states: { invalid: invalid },
                        value: value == null ? schema['default'] : value,
                        onChange: this.onChange })
                ),
                _react2['default'].createElement(_ValidityLabel2['default'], meta)
            );
        };

        return BooleanField;
    }(_react.Component);

    exports['default'] = BooleanField;


    BooleanField.displayName = type;

    BooleanField.propTypes = {
        value: _react.PropTypes.bool
    };

    factory.registerControl(function (schema) {

        if (schema.type === 'boolean') {
            return BooleanField;
        }
    });
});
//# sourceMappingURL=Boolean.js.map
