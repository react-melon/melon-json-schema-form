/**
 * @file reducer
 * @author leon <ludafa@outlook.com>
 */

import {
    FOCUS,
    CHANGE,
    TOUCH,
    BLUR,
    ARRAY_SWAP,
    ARRAY_PUSH,
    ARRAY_POP,
    ARRAY_SHIFT,
    ARRAY_UNSHIFT,
    ARRAY_SPLICE,
    FORM_INIT,
    FORM_RESET,
    FORM_VALIDATE,
} from './actionType';

import update from 'react-addons-update';
import {getIn, setIn} from './util/dataPath';
import * as dataPathMap from './util/dataPathMap';
import {fill} from './util/schema';
import mapValues from 'lodash/mapValues';

const DEFAULT_META = {
    touched: false
};

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

            if (dataPath[0] === '.') {
                dataPath = dataPath.slice(1);
            }

            if (!dataPath && keyword === 'required') {
                error.dataPath = dataPath = params.missingProperty;
            }

            validity[dataPath] = validity[dataPath]
                ? [...validity[dataPath], error]
                : [error];

            return validity;

        }, {});

    }

    function formInit(state, {value, schema, validator}) {

        value = fill({...value}, schema);

        return update(state, {
            value: {
                $set: value
            },
            meta: {
                $set: mapValues(
                    dataPathMap.make(value),
                    () => DEFAULT_META
                )
            },
            validity: {
                $set: checkValidity(value, schema, validator)
            }
        });

    }

    function formValidate(state) {

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

    function formReset(state, payload) {

    }

    function focus(state, pointer) {

        return update(state, {
            meta: {
                [pointer]: {
                    focus: {$set: true}
                }
            }
        });

    }

    function blur(state, pointer) {

        return update(state, {
            meta: {
                [pointer]: {
                    focus: {$set: false}
                }
            }
        });

    }

    function touch(state, dataPath) {
        return update(state, {
            meta: {
                [dataPath]: {
                    touched: {$set: true}
                }
            }
        });
    }

    function change(state, {dataPath, value}) {

        const nextValue = setIn(
            state.value,
            dataPath,
            value
        );

        return update(state, {
            meta: {
                [dataPath]: {
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

    function arraySwap(state, {dataPath, from, to}) {

        if (from === to) {
            return state;
        }

        let {meta, value} = state;

        if (from > to) {
            [from, to] = [to, from];
        }

        let currentValue = getIn(value, dataPath);
        let nextValue = setIn(value, dataPath, [
            ...currentValue.slice(0, from),
            currentValue[to],
            ...currentValue.slice(from + 1, to),
            currentValue[from],
            ...currentValue.slice(to + 1)
        ]);

        return update(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: dataPathMap.swap(meta, dataPath, from, to)
            },
            validity: {
                $set: checkValidity(nextValue)
            }
        });

    }

    function arrayPush(state, {dataPath, elements}) {

        let {
            value,
            meta
        } = state;

        let currentValue = getIn(value, dataPath);
        let currentLength = currentValue.length;
        let nextValue = setIn(
            value,
            dataPath,
            [...currentValue, ...elements]
        );

        return update(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: elements.reduce((meta, element, i) => {

                    return {
                        ...meta,
                        ...mapValues(
                            dataPathMap.make(
                                element,
                                `${dataPath}[${currentLength + i}]`
                            ),
                            () => DEFAULT_META
                        )
                    };

                }, meta)
            },
            validity: {
                $set: checkValidity(nextValue)
            }
        });

    }

    function arrayPop(state, {dataPath}) {

        let {
            value,
            meta
        } = state;

        let currentValue = getIn(value, dataPath);
        let nextValue = setIn(value, dataPath, currentValue.slice(0, -1));

        return update(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: dataPathMap.remove(
                    meta,
                    `${dataPath}[${currentValue.length - 1}]`
                )
            },
            validity: {
                $set: checkValidity(nextValue)
            }
        });

    }

    function arrayShift(state, {dataPath}) {

        let {
            value,
            meta
        } = state;

        let currentValue = getIn(value, dataPath);
        let nextValue = setIn(value, dataPath, currentValue.slice(1));

        return update(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: dataPathMap.splice(
                    meta, dataPath,
                    currentValue, 0, 1, []
                )
            },
            validity: {
                $set: checkValidity(nextValue)
            }
        });

    }

    function arrayUnshift(state, {dataPath, elements}) {

        let {
            value,
            meta
        } = state;

        let currentValue = getIn(value, dataPath);
        let nextValue = setIn(
            value,
            dataPath,
            [...elements, ...currentValue]
        );

        return update(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: dataPathMap.splice(
                    meta, dataPath,
                    currentValue, 0, 0, elements
                )
            },
            validity: {
                $set: checkValidity(nextValue)
            }
        });

    }

    function arraySplice(state, payload) {

        let {
            dataPath,
            start,
            deleteCount,
            replacements
        } = payload;

        let {
            value,
            meta
        } = state;


        let currentValue = getIn(value, dataPath);
        let nextValue = setIn(
            value,
            dataPath,
            [
                ...currentValue.slice(0, start),
                ...replacements,
                ...currentValue.slice(start + deleteCount)
            ]
        );

        return update(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: dataPathMap.splice(
                    meta, dataPath,
                    currentValue, start, deleteCount, replacements
                )
            },
            validity: {
                $set: checkValidity(nextValue)
            }
        });

    }

    const MAP = {
        [FOCUS]: focus,
        [CHANGE]: change,
        [TOUCH]: touch,
        [BLUR]: blur,
        [ARRAY_SWAP]: arraySwap,
        [ARRAY_PUSH]: arrayPush,
        [ARRAY_POP]: arrayPop,
        [ARRAY_SHIFT]: arrayShift,
        [ARRAY_UNSHIFT]: arrayUnshift,
        [ARRAY_SPLICE]: arraySplice,
        [FORM_INIT]: formInit,
        [FORM_RESET]: formReset,
        [FORM_VALIDATE]: formValidate
    };

    return function (state = {}, {type, payload}) {
        let reducer = MAP[type];
        return reducer ? reducer(state, payload) : state;
    };
}
