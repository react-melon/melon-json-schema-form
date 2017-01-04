(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/Slider', '../../../factory', 'melon-core/util/shallowEqual', 'classnames', '../../ValidityLabel'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/Slider'), require('../../../factory'), require('melon-core/util/shallowEqual'), require('classnames'), require('../../ValidityLabel'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Slider, global.factory, global.shallowEqual, global.classnames, global.ValidityLabel);
        global.Range = mod.exports;
    }
})(this, function (exports, _react, _Slider, _factory, _shallowEqual, _classnames, _ValidityLabel) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

    var _Slider2 = _interopRequireDefault(_Slider);

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

    var Range = function (_Component) {
        _inherits(Range, _Component);

        function Range() {
            _classCallCheck(this, Range);

            return _possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        Range.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        Range.prototype.render = function render() {
            var _props = this.props,
                schema = _props.schema,
                value = _props.value,
                name = _props.name,
                actions = _props.actions,
                meta = _props.meta;
            var formatMaximum = schema.formatMaximum,
                _schema$formatMinimum = schema.formatMinimum,
                formatMinimum = _schema$formatMinimum === undefined ? 0 : _schema$formatMinimum,
                title = schema.title,
                description = schema.description;
            var error = meta.error,
                touched = meta.touched;


            value = isNaN(+value) ? formatMinimum : value;

            var className = (0, _classnames2['default'])('ui-control-range', {
                'state-invalid': touched && error,
                'state-valid': touched && !error
            });

            return _react2['default'].createElement(
                'div',
                { className: className },
                title ? _react2['default'].createElement(
                    'header',
                    {
                        className: 'ui-control-range-title' },
                    title
                ) : null,
                description ? _react2['default'].createElement(
                    'p',
                    {
                        className: 'ui-control-range-decription' },
                    description
                ) : null,
                _react2['default'].createElement(_Slider2['default'], {
                    size: 'xxs',
                    variants: ['fluid'],
                    name: name,
                    value: +value,
                    maximum: +formatMaximum,
                    minimum: +formatMinimum,
                    onChange: function onChange(e) {
                        actions.change(name, e.value + '');
                        actions.validate(name);
                    } }),
                _react2['default'].createElement(_ValidityLabel2['default'], meta)
            );
        };

        return Range;
    }(_react.Component);

    exports['default'] = Range;


    Range.propTypes = {
        schema: _react.PropTypes.object.isRequired
    };

    (0, _factory.registerControl)(function (schema) {
        var type = schema.type,
            format = schema.format,
            formatMaximum = schema.formatMaximum,
            formatMinimum = schema.formatMinimum;


        if (type === 'string' && format === 'numeric' && formatMaximum != null && formatMinimum != null) {
            return Range;
        }
    });
});
//# sourceMappingURL=Range.js.map
