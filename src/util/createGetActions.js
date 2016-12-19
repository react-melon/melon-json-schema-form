/**
 * @file create `get action`
 * @author leon <ludafa@outlook.com>
 */

export function createUpload(actions, upload) {

    return (name, files) => (dispatch, getState) => {
        dispatch(actions.startPending(name));
        return upload(files[0]).then(
            value => {
                dispatch(actions.change(name, value));
                dispatch(actions.blur(name));
                dispatch(actions.stopPending(name));
            },
            error => dispatch(actions.stopPending(name))
        );
    };

}

export default function (getActions, upload) {

    return (props, actions) => {

        let customActions = typeof getActions === 'function'
            ? getActions(props, actions)
            : null;

        return {
            ...customActions,
            upload: createUpload(actions, upload)
        };

    };

}
