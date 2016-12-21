(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.field = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    exports.__esModule = true;
    exports.format = format;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    /**
     * @file field utils
     * @author leon <ludafa@outlook.com>
     */

    function format(value, props) {

        var schema = props.schema;

        value = value == null && schema['default'] ? schema['default'] : value;

        switch (schema.type) {

            case 'string':
                return value == null ? '' : value;

            case 'boolean':
            case 'number':
            case 'integer':
                return value;

            case 'object':
                return value == null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' ? {} : value;

            case 'array':
                return Array.isArray(value) ? value : [];

            default:
                throw new Error(schema.type + ' is not supported');

        }
    }
});
//# sourceMappingURL=field.js.map
