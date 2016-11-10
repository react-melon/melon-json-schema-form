/**
 * @file component factory
 * @author leon(ludafa@outlook.com)
 */

const providers = [];

export function getComponent(schema) {

    for (let i = providers.length - 1; i >= 0; i--) {
        const provider = providers[i];
        const Component = provider(schema);
        if (Component) {
            return Component;
        }
    }

    return null;

}

export function registerComponent(type, Component) {

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

let imageUploadHandler = null;

export function setUploadHandler(handler) {
    imageUploadHandler = handler;
}

export function getUploaderHandler() {
    return imageUploadHandler;
}
