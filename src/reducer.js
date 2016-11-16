/**
 * @file reducer
 * @author leon <ludafa@outlook.com>
 */

import * as types from './actionType';
import update from 'react-addons-update';
import * as dataPath from './util/dataPath';
import {fill} from './util/schema';
import mapValues from 'lodash/mapValues';
import mergeWith from 'lodash/mergeWith';
import startWith from 'lodash/startsWith';

const DEFAULT_META = {
    touched: false
};

function spliceDataMap(
    origin, pointer,
    arr, start, deleteCount, replacements
) {

    const replaceCount = replacements.length;

    let keys = Object.keys(origin);

    // 不是数组里边的东西直接拿到，数据里边的直接滤掉
    let result = keys.reduce(
        (result, key) => {
            if (!startWith(key, `${pointer}[`)) {
                result[key] = origin[key];
            }
            return result;
        },
        {}
    );

    return arr
        // 计算出需要保留的元素应该放到的新坑位
        .map((_, index) => {

            // 原地保留的
            if (index < start) {
                return index;
            }

            // 需要移动的
            if (index >= start + deleteCount) {
                return start + index - deleteCount + replaceCount;
            }

            // 删除的
            return null;

        })
        .reduce((result, to, from) => {

            if (to == null) {
                return result;
            }

            from = `${pointer}[${from}]`;
            to = `${pointer}[${to}]`;

            return keys
                // 找到需要被拷贝的
                .filter(key => startWith(key, from))
                // 丢到结果中
                .reduce((result, key) => {

                    // 当发生移动时，修改前缀
                    key = to === from ? key : key.replace(from, to);

                    result[key] = origin[key];
                    return result;

                }, result);

        }, result);

}

export default function createReducer(form) {

    function checkValidity(
        value,
        schema = form.props.schema,
        validator = form.props.validator
    ) {

        const validate = validator.compile(schema);
        const isValid = validate(value);

        if (isValid) {
            return null;
        }

        return validate.errors.reduce((validity, error) => {

            let {dataPath, params, keyword} = error;

            error.valid = false;

            if (!dataPath && keyword === 'required') {
                error.dataPath = dataPath = `.${params.missingProperty}`;
            }

            validity[dataPath] = validity[dataPath]
                ? [...validity[dataPath], error]
                : [error];

            return validity;

        }, {});

    }

    function loadForm(state, {value, schema, validator}) {

        return update(state, {
            value: {$set: fill({...value}, schema)},
            meta: {
                $set: mapValues(
                    dataPath.dict(fill({...value}, schema)),
                    () => DEFAULT_META
                )
            },
            validity: {
                $set: checkValidity(value, schema, validator)
            }
        });

    }

    function mergeForm(state, {value, schema, validator}) {

        if (state.value === value) {
            return state;
        }

        return update(state, {
            value: {$set: value},
            meta: {
                $apply(meta) {
                    return mergeWith(
                        meta,
                        dataPath.dict(value),
                        (targetValue, srcValue) => (targetValue || srcValue)
                    );
                }
            },
            validity: {
                $set: checkValidity(value, schema, validator)
            }
        });

    }

    function validateForm(state) {

        return update(state, {
            meta: {
                $apply(meta) {
                    return mapValues(
                        meta,
                        fieldMeta => ({
                            ...fieldMeta,
                            touched: true
                        })
                    );
                }
            }
        });

    }

    function focusField(state, pointer) {

        return update(state, {
            meta: {
                [pointer]: {
                    focus: {$set: true}
                }
            }
        });

    }

    function blurField(state, pointer) {

        return update(state, {
            meta: {
                [pointer]: {
                    focus: {$set: false}
                }
            }
        });

    }

    function changeField(state, {pointer, value}) {

        const nextValue = dataPath.update(
            state.value,
            pointer.slice(1),
            value
        );

        return update(state, {
            meta: {
                [pointer]: {
                    touched: {
                        $set: true
                    }
                }
            },
            value: {
                $set: nextValue
            },
            validity: {
                $set: checkValidity(nextValue)
            }
        });

    }

    function spliceArrayField(state, {pointer, start, deleteCount, replacements}) {

        const targetArray = dataPath.get(state.value, pointer);

        const nextValue = dataPath.update(
            state.value,
            pointer.slice(1),
            [
                ...targetArray.slice(0, start),
                ...replacements,
                ...targetArray.slice(start + deleteCount)
            ]
        );

        const nextMeta = spliceDataMap(
            {...state.meta}, pointer,
            targetArray, start, deleteCount, replacements,
        );

        return update(state, {
            value: {$set: nextValue},
            meta: {
                $set: mergeWith(
                    nextMeta,
                    dataPath.dict(nextValue),
                    targetValue => targetValue || DEFAULT_META
                )
            },
            validity: {$set: checkValidity(nextValue)}
        });

    }

    function main(state = {}, {type, payload}) {

        switch (type) {
            case types.FORM_LOAD:
                return loadForm(state, payload);

            case types.FORM_MERGE:
                return mergeForm(state, payload);

            case types.FORM_VALIDATE:
                return validateForm(state);

            case types.FIELD_FOCUS:
                return focusField(state, payload);

            case types.FIELD_BLUR:
                return blurField(state, payload);

            case types.FIELD_CHANGE:
                return changeField(state, payload);

            case types.FIELD_SPLICE_ARRAY:
                return spliceArrayField(state, payload);

            case types.FIELD_ADD:

            default:
                return state;
        }

    }

    return main;
}
