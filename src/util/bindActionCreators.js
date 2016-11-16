/**
 * @file bind action creators
 * @author leon <ludafa@outlook.com>
 */

export function bindActionCreators(dispatch, actions) {

    return Object.keys(actions).reduce((result, name) => {

        result[name] = function (...args) {
            return dispatch(actions[name](...args));
        };

        return result;

    }, {});

}
