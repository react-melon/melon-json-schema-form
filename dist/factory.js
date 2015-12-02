define('melon-json-schema-form/factory', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    'use strict';
    var COMPONENT_POOL = {};
    exports.getComponent = function (type) {
        return COMPONENT_POOL[type];
    };
    exports.registerComponent = function (type, Component) {
        COMPONENT_POOL[type] = Component;
    };
});