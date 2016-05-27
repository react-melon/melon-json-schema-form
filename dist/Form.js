/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/Form', 'melon/InputComponent', 'melon-json-schema-validator', './pointer', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/Form'), require('melon/InputComponent'), require('melon-json-schema-validator'), require('./pointer'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Form, global.InputComponent, global.melonJsonSchemaValidator, global.pointer, global.babelHelpers);
        global.Form = mod.exports;
    }
})(this, function (exports, _react, _Form2, _InputComponent, _melonJsonSchemaValidator, _pointer, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Form3 = babelHelpers.interopRequireDefault(_Form2);

    var _InputComponent2 = babelHelpers.interopRequireDefault(_InputComponent);

    var _melonJsonSchemaValidator2 = babelHelpers.interopRequireDefault(_melonJsonSchemaValidator);

    var jp = babelHelpers.interopRequireWildcard(_pointer);

    /**
     * @file melon json schema form
     * @author leon(ludafa@outlook.com)
     */

    var validator = new _melonJsonSchemaValidator2['default']({
        jsonPointers: true
    });

    var JSONSchemaForm = function (_Form) {
        babelHelpers.inherits(JSONSchemaForm, _Form);

        function JSONSchemaForm(props, context) {
            babelHelpers.classCallCheck(this, JSONSchemaForm);

            var _this = babelHelpers.possibleConstructorReturn(this, _Form.call(this, props, context));

            _this.state = {};
            return _this;
        }

        JSONSchemaForm.prototype.isValidFormField = function isValidFormField(field) {

            var value = field.getValue();
            var pointer = field.pointer;
            var props = field.props;
            var name = props.name;
            var disabled = props.disabled;


            return name && !disabled && value != null && pointer;
        };

        JSONSchemaForm.prototype.getData = function getData() {

            var type = this.props.schema.type;

            return this.fields.reduce(function (data, field) {
                jp.set(data, field.pointer, field.getValue());
                return data;
            }, type === 'array' ? [] : {});
        };

        JSONSchemaForm.prototype.validate = function validate() {
            var _this2 = this;

            var validity = this.checkValidity();

            var states = validity.states;
            var isValid = validity.isValid();

            if (!isValid) {
                (function () {

                    var fields = _this2.fields;

                    states.forEach(function (state) {

                        for (var i = 0, len = fields.length; i < len; ++i) {

                            var field = fields[i];

                            if (field.pointer === state.dataPath && !field.props.customValidity) {
                                field.setCustomValidity(state.message);
                                break;
                            }
                        }
                    });
                })();
            }

            return isValid;
        };

        JSONSchemaForm.prototype.checkValidity = function checkValidity() {
            var data = this.getData();
            var validator = this.props.validator;
            return validator.validate(data, this);
        };

        return JSONSchemaForm;
    }(_Form3['default']);

    exports['default'] = JSONSchemaForm;


    JSONSchemaForm.displayName = 'JSONSchemaForm';

    JSONSchemaForm.defaultProps = {
        validator: validator
    };

    JSONSchemaForm.propTypes = babelHelpers['extends']({}, _Form3['default'].propTypes, {
        schema: _react.PropTypes.object.isRequired
    });

    JSONSchemaForm.childContextTypes = _Form3['default'].childContextTypes;
});