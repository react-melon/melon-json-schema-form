/**
 * @file selector
 * @author leon <ludafa@outlook.com>
 */

import {getIn} from './util/dataPath';

export function isValid(state) {

    const validity = state.validity;

    if (!validity) {
        return true;
    }

    return Object.keys(validity).every(fieldName => (
        validity[fieldName].every(state => state.valid)
    ));

}

export function getValue(state) {
    return state.value;
}

export function getFieldData(state, pointer) {

    const {
        value,
        validity,
        meta
    } = state;

    const data = {
        value: pointer ? getIn(value, pointer) : value,
        validity: validity ? validity[pointer] : null,
        meta: meta[pointer]
    };

    return data;

}
