(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/Form', 'melon-json-schema-validator', './pointer', 'react-dom', './Field', './util/getOrderedKeys', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/Form'), require('melon-json-schema-validator'), require('./pointer'), require('react-dom'), require('./Field'), require('./util/getOrderedKeys'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Form, global.melonJsonSchemaValidator, global.pointer, global.reactDom, global.Field, global.getOrderedKeys, global.babelHelpers);
        global.Form = mod.exports;
    }
})(this, function (exports, _react, _Form2, _melonJsonSchemaValidator, _pointer, _reactDom, _Field, _getOrderedKeys, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Form3 = babelHelpers.interopRequireDefault(_Form2);

    var _melonJsonSchemaValidator2 = babelHelpers.interopRequireDefault(_melonJsonSchemaValidator);

    var jp = babelHelpers.interopRequireWildcard(_pointer);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _Field2 = babelHelpers.interopRequireDefault(_Field);

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

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, _Form.call.apply(_Form, [this].concat(args)));

            _this.onSubmit = _this.onSubmit.bind(_this);
            _this.onFieldChange = _this.onFieldChange.bind(_this);
            return _this;
        }

        JSONSchemaForm.prototype.isValidFormField = function isValidFormField(field) {

            var value = field.getValue();
            var pointer = field.pointer,
                props = field.props;
            var name = props.name,
                disabled = props.disabled;


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

            var data = this.getData();
            var validity = this.checkValidity(data);
            var fields = this.fields;
            var states = validity.states;
            var isValid = validity.isValid();

            var invalidFieldMap = states.reduce(function (map, state) {
                map[state.dataPath] = state;
                return map;
            }, {});

            var first = null;

            for (var i = fields.length - 1; i >= 0; i--) {
                var field = fields[i];
                var state = invalidFieldMap[field.pointer];

                if (state) {
                    field.setCustomValidity(state.message);
                    first = field;
                } else {
                    field.setCustomValidity(null);
                }
            }

            if (first) {
                _reactDom2['default'].findDOMNode(first).scrollIntoView();
            }

            return isValid;
        };

        JSONSchemaForm.prototype.checkValidity = function checkValidity(data) {
            return this.props.validator.validate(data, this);
        };

        JSONSchemaForm.prototype.onSubmit = function onSubmit(e) {
            var _props = this.props,
                noValidate = _props.noValidate,
                onSubmit = _props.onSubmit;


            if (!noValidate) {
                if (!this.validate()) {
                    e.preventDefault();
                    return;
                }
            }

            if (onSubmit) {
                e.data = this.getData();
                onSubmit(e);
            }
        };

        JSONSchemaForm.prototype.onFieldChange = function onFieldChange(e) {
            var onFieldChange = this.props.onFieldChange;
            if (onFieldChange) {
                onFieldChange(e);
            }
        };

        JSONSchemaForm.prototype.render = function render() {
            var _this2 = this;

            var _props2 = this.props,
                schema = _props2.schema,
                _props2$uiSchema = _props2.uiSchema,
                uiSchema = _props2$uiSchema === undefined ? {} : _props2$uiSchema,
                _props2$value = _props2.value,
                value = _props2$value === undefined ? {} : _props2$value,
                renderForm = _props2.renderForm,
                rest = babelHelpers.objectWithoutProperties(_props2, ['schema', 'uiSchema', 'value', 'renderForm']);


            var properties = schema.properties;

            var fields = (0, _getOrderedKeys.getOrderedKeys)(schema.properties, uiSchema['@order']).map(function (name) {
                return _react2['default'].createElement(_Field2['default'], {
                    name: name,
                    key: name,
                    schema: properties[name],
                    uiSchema: uiSchema[name],
                    value: value[name],
                    onChange: _this2.onFieldChange });
            });

            return _react2['default'].createElement(
                'form',
                babelHelpers['extends']({}, rest, { onSubmit: this.onSubmit }),
                renderForm(this.props, fields)
            );
        };

        return JSONSchemaForm;
    }(_Form3['default']);

    exports['default'] = JSONSchemaForm;


    JSONSchemaForm.displayName = 'JSONSchemaForm';

    JSONSchemaForm.defaultProps = {
        validator: validator,
        renderForm: function renderForm(props) {
            var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            return fields.concat(props.children);
        }
    };

    JSONSchemaForm.propTypes = babelHelpers['extends']({}, _Form3['default'].propTypes, {
        schema: _react.PropTypes.object.isRequired,
        onFieldChange: _react.PropTypes.func
    });

    JSONSchemaForm.childContextTypes = _Form3['default'].childContextTypes;
});
//# sourceMappingURL=Form.js.map
