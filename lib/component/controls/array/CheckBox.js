(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/BoxGroup', 'melon-core/util/shallowEqual', '../../../factory', '../../ValidityLabel', '../../../util/createStateClassName'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/BoxGroup'), require('melon-core/util/shallowEqual'), require('../../../factory'), require('../../ValidityLabel'), require('../../../util/createStateClassName'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.BoxGroup, global.shallowEqual, global.factory, global.ValidityLabel, global.createStateClassName);
        global.CheckBox = mod.exports;
    }
})(this, function (exports, _react, _BoxGroup, _shallowEqual, _factory, _ValidityLabel, _createStateClassName) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

    var _BoxGroup2 = _interopRequireDefault(_BoxGroup);

    var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

    var _ValidityLabel2 = _interopRequireDefault(_ValidityLabel);

    var _createStateClassName2 = _interopRequireDefault(_createStateClassName);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

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

    var ArrayCheckBox = function (_Component) {
        _inherits(ArrayCheckBox, _Component);

        function ArrayCheckBox() {
            _classCallCheck(this, ArrayCheckBox);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.onChange = _this.onChange.bind(_this);
            return _this;
        }

        ArrayCheckBox.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(this.props, nextProps);
        };

        ArrayCheckBox.prototype.onChange = function onChange(e) {
            var _props = this.props,
                actions = _props.actions,
                name = _props.name;
            var validate = actions.validate,
                change = actions.change;

            change(name, e.value);
            validate(name);
        };

        ArrayCheckBox.prototype.render = function render() {
            var _props2 = this.props,
                schema = _props2.schema,
                value = _props2.value,
                meta = _props2.meta,
                disabled = _props2.disabled,
                readOnly = _props2.readOnly;
            var title = schema.title,
                items = schema.items,
                description = schema.description;


            var enumNames = items.enumNames || [];

            var options = items['enum'].map(function (item, index) {
                return _react2['default'].createElement(
                    'option',
                    {
                        key: 'item',
                        value: item },
                    enumNames[index] || item
                );
            });

            var error = meta.error,
                touched = meta.touched;


            var invalid = touched && error && error.message;

            var className = (0, _createStateClassName2['default'])('ui-control-checkbox', this.props);

            var variants = [items['enum'].length > 3 ? 'horizontal' : null];

            return _react2['default'].createElement(
                'div',
                { className: className },
                title ? _react2['default'].createElement(
                    'header',
                    { className: 'ui-control-checkbox-title' },
                    title
                ) : null,
                description ? _react2['default'].createElement(
                    'p',
                    { className: 'ui-control-checkbox-description' },
                    description
                ) : null,
                _react2['default'].createElement(
                    _BoxGroup2['default'],
                    {
                        size: 'xxs',
                        variants: variants,
                        states: { invalid: invalid },
                        value: value,
                        onChange: this.onChange,
                        disabled: disabled,
                        readOnly: readOnly },
                    options
                ),
                _react2['default'].createElement(_ValidityLabel2['default'], meta)
            );
        };

        return ArrayCheckBox;
    }(_react.Component);

    exports['default'] = ArrayCheckBox;


    ArrayCheckBox.propTypes = {
        schema: _react.PropTypes.object.isRequired
    };

    (0, _factory.registerControl)(function (schema) {
        var type = schema.type,
            uniqueItems = schema.uniqueItems,
            items = schema.items;


        if (type === 'array' && uniqueItems && (typeof items === 'undefined' ? 'undefined' : _typeof(items)) === 'object' && items.type === 'string' && items['enum']) {
            return ArrayCheckBox;
        }
    });
});
//# sourceMappingURL=CheckBox.js.map
