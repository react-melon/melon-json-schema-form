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
        global.getOrderedKeys = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    exports.__esModule = true;
    exports.getOrderedKeys = getOrderedKeys;
    /**
     * @file get sorted keys
     * @author leon <ludafa@outlook.com>
     */

    function getOrderedKeys(obj) {
        var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['*'];


        var keys = Object.keys(obj);

        var map = order.reduce(function (map, key) {
            map[key] = true;
            return map;
        }, {});

        var rest = keys.filter(function (key) {
            return !map[key];
        });

        var sortedKeys = order.reduce(function (result, key) {

            if (key === '*') {
                result = [].concat(result, rest);
            } else {
                result.push(key);
            }

            return result;
        }, []);

        if (sortedKeys.length !== keys.length) {
            throw new Error('uiSchema order list must contain all the properties');
        }

        return sortedKeys;
    }
});
//# sourceMappingURL=getOrderedKeys.js.map
