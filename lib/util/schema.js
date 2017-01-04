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
        global.schema = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    exports.__esModule = true;
    exports.resolveDefaults = resolveDefaults;
    exports.fill = fill;

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

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    /**
     * @file shcema
     * @author leon <ludafa@outlook.com>
     */

    function resolveDefaults(schema) {

        switch (schema.type) {
            case 'object':
                return Object.keys(schema.properties).reduce(function (value, fieldName) {
                    value[fieldName] = resolveDefaults(schema.properties[fieldName]);
                    return value;
                }, {});
            case 'array':
                var items = schema.items;
                return Array.isArray(items) ? items.map(resolveDefaults) : [resolveDefaults(items)];
            case 'string':
                return schema['default'] || '';
            case 'number':
                return schema['default'] || 0;
            case 'boolean':
                return schema['default'] || false;
        }
    }

    function fill(obj, schema) {
        var def = schema['default'],
            type = schema.type;

        var _ret = function () {

            switch (type) {

                case 'object':

                    // 如果不是一个对象，那么生成它
                    if (obj == null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {

                        // 优先使用 schema.default，没有的话提供默认 {}
                        obj = def || {};
                    }

                    var _schema$properties = schema.properties,
                        properties = _schema$properties === undefined ? {} : _schema$properties,
                        _schema$required = schema.required,
                        required = _schema$required === undefined ? [] : _schema$required;


                    return {
                        v: Object.keys(properties).reduce(function (value, fieldName) {

                            var defaultValue = fill(value[fieldName], schema.properties[fieldName]);

                            if (
                            // default 没有 null 这个东西
                            defaultValue != null
                            // 是必填选
                            || required.indexOf(fieldName) >= 0) {
                                value[fieldName] = defaultValue;
                            }

                            return value;
                        }, _extends({}, obj))
                    };

                case 'array':

                    if (!Array.isArray(obj)) {
                        obj = def || [];
                    }

                    var items = schema.items;

                    // tulpe
                    if (Array.isArray(items)) {
                        return {
                            v: items.map(function (item, index) {
                                return fill(obj[index], item);
                            })
                        };
                    }

                    // variable array
                    return {
                        v: obj.map(function (item) {
                            return fill(item, items);
                        })
                    };

                case 'string':
                case 'number':
                case 'boolean':
                    return {
                        v: (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === type ? obj : def
                    };

            }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
});
//# sourceMappingURL=schema.js.map
