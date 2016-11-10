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
    exports.getComponent = getComponent;
    exports.registerComponent = registerComponent;
    exports.setUploadHandler = setUploadHandler;
    exports.getUploaderHandler = getUploaderHandler;
    /**
     * @file component factory
     * @author leon(ludafa@outlook.com)
     */

    var providers = [];

    function getComponent(schema) {

        for (var i = providers.length - 1; i >= 0; i--) {
            var provider = providers[i];
            var Component = provider(schema);
            if (Component) {
                return Component;
            }
        }

        return null;
    }

    function registerComponent(type, Component) {

        if (typeof type === 'function') {
            providers.push(type);
        }

        if (typeof type === 'string') {
            providers.push(function (schema) {
                if (schema.type === type) {
                    return Component;
                }
            });
        }
    }

    var imageUploadHandler = null;

    function setUploadHandler(handler) {
        imageUploadHandler = handler;
    }

    function getUploaderHandler() {
        return imageUploadHandler;
    }
});
//# sourceMappingURL=factory.js.map
