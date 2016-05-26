/**
 * @file component factory
 * @author leon(ludafa@outlook.com)
 */

const COMPONENT_POOL = {};

export function getComponent(type) {
    return COMPONENT_POOL[type];
}

export function registerComponent(type, Component) {
    COMPONENT_POOL[type] = Component;
}
