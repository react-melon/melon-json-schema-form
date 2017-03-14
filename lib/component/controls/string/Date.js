(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-calendar', '../../../factory', '../../ValidityLabel', '../../../util/createStateClassName'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-calendar'), require('../../../factory'), require('../../ValidityLabel'), require('../../../util/createStateClassName'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.melonCalendar, global.factory, global.ValidityLabel, global.createStateClassName);
        global.Date = mod.exports;
    }
})(this, function (exports, _react, _melonCalendar, _factory, _ValidityLabel, _createStateClassName) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

    var _melonCalendar2 = _interopRequireDefault(_melonCalendar);

    var _ValidityLabel2 = _interopRequireDefault(_ValidityLabel);

    var _createStateClassName2 = _interopRequireDefault(_createStateClassName);

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

    var DateControl = function (_Component) {
        _inherits(DateControl, _Component);

        function DateControl() {
            _classCallCheck(this, DateControl);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.onChange = _this.onChange.bind(_this);
            return _this;
        }

        DateControl.prototype.onChange = function onChange(_ref) {
            var value = _ref.value;
            var _props = this.props,
                name = _props.name,
                actions = _props.actions;
            var validate = actions.validate,
                change = actions.change;


            change(name, value);
            validate(name);
        };

        DateControl.prototype.render = function render() {
            var _props2 = this.props,
                schema = _props2.schema,
                value = _props2.value,
                meta = _props2.meta,
                disabled = _props2.disabled,
                readOnly = _props2.readOnly;
            var title = schema.title,
                description = schema.description;
            var error = meta.error,
                touched = meta.touched;


            var invalid = touched && error && error.message;

            var className = (0, _createStateClassName2['default'])('ui-control-date', this.props);

            return _react2['default'].createElement(
                'div',
                { className: className },
                title ? _react2['default'].createElement(
                    'header',
                    {
                        className: 'ui-control-date-title' },
                    title
                ) : null,
                description ? _react2['default'].createElement(
                    'p',
                    {
                        className: 'ui-control-date-description' },
                    description
                ) : null,
                _react2['default'].createElement(_melonCalendar2['default'], {
                    disabled: disabled,
                    readOnly: readOnly,
                    size: 'xxs',
                    variants: ['fluid'],
                    states: { invalid: invalid },
                    name: name,
                    value: value == null ? schema['default'] : value,
                    onChange: this.onChange }),
                _react2['default'].createElement(_ValidityLabel2['default'], meta)
            );
        };

        return DateControl;
    }(_react.Component);

    exports['default'] = DateControl;


    DateControl.propTypes = {
        schema: _react.PropTypes.object.isRequired,
        value: _react.PropTypes.string
    };

    (0, _factory.registerControl)(function (schema) {

        if (schema.type === 'string' && schema.format === 'date') {
            return DateControl;
        }
    });
});
//# sourceMappingURL=Date.js.map
