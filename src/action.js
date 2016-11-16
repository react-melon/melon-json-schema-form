/**
 * @file actions
 * @author leon <ludafa@outlook.com>
 */

import * as types from './actionType';

function createFieldChangeMeta(pointer) {

    return {
        event: {
            handler: 'onFieldChange',
            getEvent(state) {
                return {
                    dataPath: pointer,
                    value: state.value
                };
            }
        }
    };

}

export function loadForm(value, schema, validator) {
    return {
        type: types.FORM_LOAD,
        payload: {
            value,
            schema,
            validator
        }
    };
}

export function mergeForm(value, schema, validator) {
    return {
        type: types.FORM_MERGE,
        payload: {
            value,
            schema,
            validator
        }
    };
}

export function focusField(pointer) {
    return {
        type: types.FIELD_FOCUS,
        payload: pointer
    };
}

export function setTouched(pointer) {
    return {
        type: types.FIELD_TOUCH,
        payload: pointer
    };
}

export function changeField(pointer, value) {
    return {
        type: types.FIELD_CHANGE,
        payload: {
            pointer,
            value
        },
        meta: createFieldChangeMeta(pointer)
    };
}

export function addField(pointer, value) {

    return {
        type: types.FIELD_ADD,
        payload: {
            pointer,
            value
        },
        meta: createFieldChangeMeta(pointer)
    };

}

export function spliceArrayField(pointer, start, deleteCount, ...replacements) {

    return {
        type: types.FIELD_SPLICE_ARRAY,
        payload: {
            pointer,
            start,
            deleteCount,
            replacements
        }
    };

}

export function blurField(pointer) {
    return {
        type: types.FIELD_BLUR,
        payload: pointer
    };
}

export function validateForm() {
    return {
        type: types.FORM_VALIDATE
    };
}

export function resetForm() {
    return {
        type: types.FORM_RESET
    };
}

export function validateField(pointer) {
    return {
        type: types.FIELD_VALIDATE,
        payload: pointer
    };
}
