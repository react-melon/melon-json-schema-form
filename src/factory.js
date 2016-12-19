/**
 * @file component factory
 * @author leon(ludafa@outlook.com)
 */

const providers = [];

export function getControl(schema) {

    for (let i = providers.length - 1; i >= 0; i--) {
        const provider = providers[i];
        const Control = provider(schema);
        if (Control) {
            return Control;
        }
    }

    return null;

}

export function registerControl(type, Control) {

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
