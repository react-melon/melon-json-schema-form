(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/Form', 'melon-json-schema-validator', './pointer', 'react-dom', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/Form'), require('melon-json-schema-validator'), require('./pointer'), require('react-dom'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Form, global.melonJsonSchemaValidator, global.pointer, global.reactDom, global.babelHelpers);
        global.Form = mod.exports;
    }
})(this, function (exports, _react, _Form2, _melonJsonSchemaValidator, _pointer, _reactDom, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _Form3 = babelHelpers.interopRequireDefault(_Form2);

    var _melonJsonSchemaValidator2 = babelHelpers.interopRequireDefault(_melonJsonSchemaValidator);

    var jp = babelHelpers.interopRequireWildcard(_pointer);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    /**
     * @file melon json schema form
     * @author leon(ludafa@outlook.com)
     */

    var validator = new _melonJsonSchemaValidator2['default']({
        jsonPointers: true,
        allErrors: true
    });

    validator.addFormat('color', /^#[0-9a-f]{6}$/i);

    var JSONSchemaForm = function (_Form) {
        babelHelpers.inherits(JSONSchemaForm, _Form);

        function JSONSchemaForm() {
            babelHelpers.classCallCheck(this, JSONSchemaForm);
            return babelHelpers.possibleConstructorReturn(this, _Form.apply(this, arguments));
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

            return this.fields.reduceRight(function (data, field) {
                jp.set(data, field.pointer, field.getValue());
                return data;
            }, type === 'array' ? [] : {});
        };

        JSONSchemaForm.prototype.validate = function validate() {
            var _this2 = this;

            var data = this.getData();
            var validity = this.checkValidity(data);

            var states = validity.states;
            var isValid = validity.isValid();

            if (!isValid) {
                (function () {

                    var fields = _this2.fields;

                    var first = states.reduce(function (first, state) {

                        for (var i = 0, len = fields.length; i < len; ++i) {

                            var field = fields[i];

                            if (field.pointer === state.dataPath && !field.props.customValidity) {
                                field.setCustomValidity(state.message);
                                return first || field;
                            }
                        }

                        return first;
                    }, null);

                    if (first) {
                        _reactDom2['default'].findDOMNode(first).scrollIntoView();
                    }
                })();
            }

            return isValid;
        };

        JSONSchemaForm.prototype.checkValidity = function checkValidity(data) {
            return this.props.validator.validate(data, this);
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
//# sourceMappingURL=Form.js.map
