/**
 * @file component factory
 * @author leon(ludafa@outlook.com)
 */

const COMPONENT_POOL = {};

exports.getComponent = function (type) {
    return COMPONENT_POOL[type];
};

exports.registerComponent = function (type, Component) {
    COMPONENT_POOL[type] = Component;
};
