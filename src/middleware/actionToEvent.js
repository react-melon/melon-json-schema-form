/**
 * @file enable action to trigger events
 * @author leon <ludafa@outlook.com>
 */

export function actionToEvent(form) {

    return store => next => action => {

        const result = next(action);

        if (action.meta && action.meta.event) {

            let {handler, getEvent} = action.meta.event;

            handler = form.props[handler];

            if (handler) {
                handler(
                    getEvent
                        ? getEvent(store.getState(), form.props)
                        : form
                );
            }

        }

        return result;

    };


}
