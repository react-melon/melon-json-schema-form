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
                        $apply(value) {
                            let path = dataPath.parse(name);
                            // 把路径的上一层取出来看看是不是数组
                            // 如果是数组就直接设置，不是数组就干掉这个 key
                            return Array
                                .isArray(
                                    dataPath.getIn(
                                        value,
                                        path.slice(0, -1).join('.')
                                    )
                                )
                                ? dataPath.setIn(value, name)
                                : dataPath.deleteIn(value, name)
                        }
                    }
                });
            }

            return next(state, action);

        }

    }
);
