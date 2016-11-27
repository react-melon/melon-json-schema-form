(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-colorpicker', '../factory', 'melon-core/classname/classname', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-colorpicker'), require('../factory'), require('melon-core/classname/classname'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.melonColorpicker, global.factory, global.classname, global.shallowEqual, global.babelHelpers);
        global.Color = mod.exports;
    }
})(this, function (exports, _react, _melonColorpicker, _factory, _classname, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _melonColorpicker2 = babelHelpers.interopRequireDefault(_melonColorpicker);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    var ColorField = function (_Component) {
        babelHelpers.inherits(ColorField, _Component);

        function ColorField() {
            babelHelpers.classCallCheck(this, ColorField);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        ColorField.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        ColorField.prototype.render = function render() {
            var _props = this.props,
                schema = _props.schema,
                value = _props.value,
                onChange = _props.onChange,
                name = _props.name;


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
                _react2['default'].createElement(_melonColorpicker2['default'], {
                    size: 'xxs',
                    variants: ['fluid'],
                    name: name,
                    rules: schema,
                    value: value,
                    defaultValue: schema['default'],
                    onChange: onChange })
            );
        };

        return ColorField;
    }(_react.Component);

    exports['default'] = ColorField;


    ColorField.displayName = 'ColorField';

    ColorField.propTypes = {
        schema: _react.PropTypes.object.isRequired,
        value: _react.PropTypes.string,
        onChange: _react.PropTypes.func.isRequired
    };

    (0, _factory.registerComponent)(function (schema) {

        if (schema.type === 'string' && schema.format === 'color') {
            return ColorField;
        }
    });
});
//# sourceMappingURL=Color.js.map
