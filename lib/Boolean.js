(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/Toggle', 'melon/Title', './factory', 'melon-core/util/shallowEqual', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/Toggle'), require('melon/Title'), require('./factory'), require('melon-core/util/shallowEqual'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Toggle, global.Title, global.factory, global.shallowEqual, global.babelHelpers);
        global.Boolean = mod.exports;
    }
})(this, function (exports, _react, _Toggle, _Title, _factory, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.type = undefined;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Toggle2 = babelHelpers.interopRequireDefault(_Toggle);

    var _Title2 = babelHelpers.interopRequireDefault(_Title);

    var factory = babelHelpers.interopRequireWildcard(_factory);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    /**
     * @file BooleanField
     * @author leon <ludafa@outlook.com>
     */

    var type = exports.type = 'Boolean';

    var BooleanField = function (_Component) {
        babelHelpers.inherits(BooleanField, _Component);

        function BooleanField() {
            babelHelpers.classCallCheck(this, BooleanField);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        BooleanField.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        BooleanField.prototype.render = function render() {
            var _props = this.props,
                name = _props.name,
                value = _props.value,
                schema = _props.schema,
                onChange = _props.onChange;


            var title = schema.title;

            return _react2['default'].createElement(
                'div',
                { className: 'ui-field variant-boolean' },
                title ? _react2['default'].createElement(
                    _Title2['default'],
                    { size: 'xxs' },
                    title
                ) : null,
                _react2['default'].createElement(
                    'div',
                    { className: 'ui-field-component' },
                    _react2['default'].createElement(_Toggle2['default'], {
                        rules: schema,
                        name: name,
                        value: value,
                        defaultValue: schema['default'],
                        trueValue: true,
                        falseValue: false,
                        onChange: onChange })
                )
            );
        };

        return BooleanField;
    }(_react.Component);

    exports['default'] = BooleanField;


    BooleanField.displayName = type;

    BooleanField.propTypes = {
        value: _react.PropTypes.bool
    };

    factory.registerComponent(function (schema) {

        if (schema.type === 'boolean') {
            return BooleanField;
        }
    });
});
//# sourceMappingURL=Boolean.js.map
