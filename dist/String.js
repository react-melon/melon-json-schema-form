/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', 'react', 'melon/TextBox', 'melon/Title', './factory', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('react'), require('melon/TextBox'), require('melon/Title'), require('./factory'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.react, global.TextBox, global.Title, global.factory, global.babelHelpers);
        global.String = mod.exports;
    }
})(this, function (module, exports, _react, _TextBox, _Title, _factory, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _TextBox2 = babelHelpers.interopRequireDefault(_TextBox);

    var _Title2 = babelHelpers.interopRequireDefault(_Title);

    var factory = babelHelpers.interopRequireWildcard(_factory);

    var StringComponent = function (_React$Component) {
        babelHelpers.inherits(StringComponent, _React$Component);

        function StringComponent() {
            babelHelpers.classCallCheck(this, StringComponent);
            return babelHelpers.possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        StringComponent.prototype.render = function render() {
            var _props = this.props;
            var schema = _props.schema;
            var value = _props.value;
            var pointer = _props.pointer;
            var name = _props.name;
            var _onChange = _props.onChange;
            var title = schema.title;
            var placeholder = schema.placeholder;
            var maxLength = schema.maxLength;


            return _react2['default'].createElement(
                'div',
                { className: 'ui-field variant-string', key: pointer },
                _react2['default'].createElement(
                    _Title2['default'],
                    { level: 4 },
                    title
                ),
                _react2['default'].createElement(_TextBox2['default'], {
                    variants: ['fluid'],
                    multiline: maxLength && maxLength >= 120,
                    placeholder: placeholder,
                    name: name,
                    rules: schema,
                    value: value,
                    onChange: function onChange(e) {
                        _onChange(e);
                    } })
            );
        };

        return StringComponent;
    }(_react2['default'].Component);

    exports['default'] = StringComponent;


    factory.registerComponent('string', StringComponent);

    module.exports = StringComponent;
});