/**
 * @file actions
 * @author leon <ludafa@outlook.com>
 */

import * as types from './actionType';

function createEventMeta(dataPath, type) {

    return {
        event: {
            handler: type,
            getEvent(state) {
                return {
                    dataPath: dataPath,
                    value: state.value
                };
            }
        }
    };

}

export function formInit(value, schema, validator) {
    return {
        type: types.FORM_INIT,
        payload: {
            value,
            schema,
            validator
        }
    };
}

export function formValidate() {
    return {
        type: types.FORM_VALIDATE
    };
}

export function formReset() {
    return {
        type: types.FORM_RESET
    };
}

export function formMerge(value, schema, validator) {
    return {
        type: types.FORM_MERGE,
        payload: {
            value,
            schema,
            validator
        }
    };
}

export function focus(dataPath) {
    return {
        type: types.FOCUS,
        payload: dataPath
    };
}

export function change(dataPath, value) {
    return {
        type: types.CHANGE,
        payload: {
            dataPath,
            value
        },
        meta: createEventMeta(dataPath, 'onFieldChange')
    };
}

export function blur(dataPath) {
    return {
        type: types.BLUR,
        payload: dataPath
    };
}

export function touch(dataPath) {
    return {
        type: types.TOUCH,
        payload: dataPath
    };
}

export function arrayPush(dataPath, ...elements) {

    return {
        type: types.ARRAY_PUSH,
        payload: {
            dataPath,
            elements
        },
        meta: createEventMeta(dataPath, 'onFieldChange')
    };

}

export function arraySplice(
    dataPath,
    start,
    deleteCount,
    ...replacements
) {

    return {
        type: types.ARRAY_SPLICE,
        payload: {
            dataPath,
            start,
            deleteCount,
            replacements
        },
        meta: createEventMeta(dataPath, 'onFieldChange')
    };

}

export function arraySwap(dataPath, from, to) {

    return {
        type: types.ARRAY_SWAP,
        payload: {
            from,
            to,
            dataPath
        },
        meta: createEventMeta(dataPath, 'onFieldChange')
    };

}
