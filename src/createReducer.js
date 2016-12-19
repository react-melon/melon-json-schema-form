/**
 * @file create reducer
 * @author leon <ludafa@outlook.com>
 */

import {
    createReducer,
    actionTypes,
    dataPath
} from 'melon-form';

import update from 'react-addons-update';

export default (model, initialValue, reducers) => createReducer(
    model,
    initialValue,
    {
        ...reducers,
        [actionTypes.CHANGE](state, action, next) {

            let {name, value} = action.payload;

            if (value === '') {
                return update(state, {
                    value: {
                        $set: dataPath.deleteIn(state.value, name)
                    }
                });
            }

            return next(state, action);

        }

    }
);
