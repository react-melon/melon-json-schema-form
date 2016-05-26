/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/Form', 'melon-json-schema-validator', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/Form'), require('melon-json-schema-validator'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Form, global.melonJsonSchemaValidator, global.babelHelpers);
        global.Form = mod.exports;
    }
})(this, function (exports, _react, _Form, _melonJsonSchemaValidator, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Form2 = babelHelpers.interopRequireDefault(_Form);

    var _melonJsonSchemaValidator2 = babelHelpers.interopRequireDefault(_melonJsonSchemaValidator);

    var JSONSchemaForm = function (_Component) {
        babelHelpers.inherits(JSONSchemaForm, _Component);

        function JSONSchemaForm() {
            babelHelpers.classCallCheck(this, JSONSchemaForm);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        JSONSchemaForm.prototype.render = function render() {
            var _props = this.props;
            var validator = _props.validator;
            var children = _props.children;
            var rest = babelHelpers.objectWithoutProperties(_props, ['validator', 'children']);


            return _react2['default'].createElement(
                _Form2['default'],
                babelHelpers['extends']({}, rest, {
                    validator: validator,
                    variants: ['json-schema'] }),
                children
            );
        };

        return JSONSchemaForm;
    }(_react.Component);

    exports['default'] = JSONSchemaForm;


    JSONSchemaForm.defaultProps = {
        validator: _melonJsonSchemaValidator2['default']
    };
});