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
        global.factory = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    exports.__esModule = true;
    exports.getControl = getControl;
    exports.registerControl = registerControl;
    /**
     * @file component factory
     * @author leon(ludafa@outlook.com)
     */

    var providers = [];

    function getControl(schema) {

        for (var i = providers.length - 1; i >= 0; i--) {
            var provider = providers[i];
            var Control = provider(schema);
            if (Control) {
                return Control;
            }
        }

        return null;
    }

    function registerControl(type, Control) {

        if (typeof type === 'function') {
            providers.push(type);
        }

        if (typeof type === 'string') {
            providers.push(function (schema) {
                if (schema.type === type) {
                    return Control;
                }
            });
        }
    }
});
//# sourceMappingURL=factory.js.map
