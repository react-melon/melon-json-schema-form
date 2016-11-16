/**
 * @file component factory
 * @author leon(ludafa@outlook.com)
 */

const providers = [];

export function getWidget(schema) {

    for (let i = providers.length - 1; i >= 0; i--) {
        const provider = providers[i];
        const Widget = provider(schema);
        if (Widget) {
            return Widget;
        }
    }

    return null;

}

export function registerWidget(type, Widget) {

    if (typeof type === 'function') {
        providers.push(type);
    }

    if (typeof type === 'string') {
        providers.push(function (schema) {
            if (schema.type === type) {
                return Widget;
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
