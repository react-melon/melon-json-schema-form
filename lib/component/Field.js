(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'melon-form', 'react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('melon-form'), require('react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.melonForm, global.react);
        global.Field = mod.exports;
    }
})(this, function (exports, _melonForm, _react) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _objectWithoutProperties(obj, keys) {
        var target = {};

        for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }

        return target;
    }

    function getControl(uiSchema) {

        return uiSchema && typeof uiSchema.$control === 'function' ? uiSchema.$control : null;
    }

    /**
     * SchemaField
     *
     * @class
     * @param {*} props 属性
     */
    function SchemaField(props) {
        var schema = props.schema,
            _props$uiSchema = props.uiSchema,
            uiSchema = _props$uiSchema === undefined ? {} : _props$uiSchema,
            control = props.control,
            disabled = props.disabled,
            readOnly = props.readOnly,
            hidden = props.hidden,
            rest = _objectWithoutProperties(props, ['schema', 'uiSchema', 'control', 'disabled', 'readOnly', 'hidden']);

        var Control = getControl(uiSchema) || control;

        var $disabled = uiSchema.$disabled,
            $readOnly = uiSchema.$readOnly,
            $hidden = uiSchema.$hidden;


        return _react2['default'].createElement(Control, _extends({}, rest, {
            schema: schema,
            uiSchema: uiSchema,
            disabled: disabled || $disabled,
            readOnly: readOnly || $readOnly,
            hidden: hidden || $hidden }));
    }

    exports['default'] = (0, _melonForm.createField)(SchemaField);
});
//# sourceMappingURL=Field.js.map
