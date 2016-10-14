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
        global.resolveDefaults = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    exports.__esModule = true;
    exports.default = resolve;
    /**
     * @file resolve defaults from schema
     * @author leon <ludafa@outlook.com>
     */

    function resolve(schema) {

        switch (schema.type) {

            case 'object':
                return Object.keys(schema.properties).reduce(function (value, fieldName) {
                    value[fieldName] = resolve(schema.properties[fieldName]);
                    return value;
                }, {});

            case 'array':
                var items = schema.items;
                return Array.isArray(items) ? items.map(resolve) : resolve(items);

            case 'string':
                return schema['default'] || '';
            case 'number':
                return schema['default'] || 0;
            case 'boolean':
                return schema['default'] || false;

        }
    }
});
//# sourceMappingURL=resolveDefaults.js.map
