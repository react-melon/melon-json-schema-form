(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/Slider', '../factory', 'melon-core/classname/classname', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/Slider'), require('../factory'), require('melon-core/classname/classname'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Slider, global.factory, global.classname, global.shallowEqual, global.babelHelpers);
        global.Range = mod.exports;
    }
})(this, function (exports, _react, _Slider, _factory, _classname, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Slider2 = babelHelpers.interopRequireDefault(_Slider);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    var Range = function (_Component) {
        babelHelpers.inherits(Range, _Component);

        function Range() {
            babelHelpers.classCallCheck(this, Range);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        Range.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        Range.prototype.render = function render() {
            var _props = this.props;
            var schema = _props.schema;
            var value = _props.value;
            var onChange = _props.onChange;
            var name = _props.name;
            var max = schema.max;
            var min = schema.min;
            var title = schema.title;


            var titleClassName = (0, _classname.createClassName)('ui-field-title', 'variant-level-4');

            return _react2['default'].createElement(
                'div',
                { className: 'ui-field ui-field-string variant-string' },
                _react2['default'].createElement(
                    'header',
                    { className: titleClassName },
                    title
                ),
                _react2['default'].createElement(_Slider2['default'], {
                    size: 'xxs',
                    variants: ['fluid'],
                    name: name,
                    rules: schema,
                    value: value,
                    defaultValue: schema['default'],
                    max: max,
                    min: min,
                    onChange: onChange })
            );
        };

        return Range;
    }(_react.Component);

    exports['default'] = Range;


    Range.propTypes = {};

    (0, _factory.registerComponent)(function (schema) {
        var type = schema.type;
        var max = schema.max;
        var min = schema.min;


        if ((type === 'number' || type === 'integer') && max != null && min != null) {
            return Range;
        }
    });
});
//# sourceMappingURL=Range.js.map
