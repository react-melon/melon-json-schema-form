(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-colorpicker', 'melon-core/util/shallowEqual', '../../../factory', 'classnames', '../../ValidityLabel'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-colorpicker'), require('melon-core/util/shallowEqual'), require('../../../factory'), require('classnames'), require('../../ValidityLabel'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.melonColorpicker, global.shallowEqual, global.factory, global.classnames, global.ValidityLabel);
        global.Color = mod.exports;
    }
})(this, function (exports, _react, _melonColorpicker, _shallowEqual, _factory, _classnames, _ValidityLabel) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

    var _melonColorpicker2 = _interopRequireDefault(_melonColorpicker);

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

    var ColorControl = function (_Component) {
        _inherits(ColorControl, _Component);

        function ColorControl() {
            _classCallCheck(this, ColorControl);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.onChange = _this.onChange.bind(_this);
            return _this;
        }

        ColorControl.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        ColorControl.prototype.onChange = function onChange(_ref) {
            var value = _ref.value;
            var _props = this.props,
                name = _props.name,
                actions = _props.actions;
            var validate = actions.validate,
                change = actions.change;


            change(name, value);
            validate(name);
        };

        ColorControl.prototype.render = function render() {
            var _props2 = this.props,
                schema = _props2.schema,
                value = _props2.value,
                name = _props2.name,
                meta = _props2.meta;
            var title = schema.title,
                description = schema.description;
            var error = meta.error,
                touched = meta.touched;


            var invalid = touched && error && error.message;

            var className = (0, _classnames2['default'])('ui-control-color', {
                'state-valid': !invalid,
                'state-invalid': invalid
            });

            return _react2['default'].createElement(
                'div',
                { className: className },
                title ? _react2['default'].createElement(
                    'header',
                    {
                        className: 'ui-control-color-title' },
                    title
                ) : null,
                description ? _react2['default'].createElement(
                    'p',
                    {
                        className: 'ui-control-color-decription' },
                    description
                ) : null,
                _react2['default'].createElement(_melonColorpicker2['default'], {
                    size: 'xxs',
                    variants: ['fluid'],
                    states: { invalid: invalid },
                    name: name,
                    rules: schema,
                    value: value,
                    onChange: this.onChange }),
                _react2['default'].createElement(_ValidityLabel2['default'], meta)
            );
        };

        return ColorControl;
    }(_react.Component);

    exports['default'] = ColorControl;


    ColorControl.displayName = 'ColorControl';

    ColorControl.propTypes = {
        schema: _react.PropTypes.object.isRequired
    };

    (0, _factory.registerControl)(function (schema) {

        if (schema.type === 'string' && schema.format === 'color') {
            return ColorControl;
        }
    });
});
//# sourceMappingURL=Color.js.map
