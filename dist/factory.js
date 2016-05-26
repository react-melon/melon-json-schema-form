/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.babelHelpers);
        global.factory = mod.exports;
    }
})(this, function (exports, babelHelpers) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getComponent = getComponent;
    exports.registerComponent = registerComponent;

    /**
     * @file component factory
     * @author leon(ludafa@outlook.com)
     */

    var COMPONENT_POOL = {};

    function getComponent(type) {
        return COMPONENT_POOL[type];
    }

    function registerComponent(type, Component) {
        COMPONENT_POOL[type] = Component;
    }
});