/**
 * @file TimeControl
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import TimePicker from 'melon-timepicker';
import {registerControl} from '../../../factory';

export function TimeControl(props) {

    const {
        name,
        value,
        meta,
        actions,
        schema
    } = props;

    const {
        title,
        description
    } = schema;

    const {
        error,
        touched
    } = meta;

    const message = touched && error
        ? <div>{error}</div>
        : null;

    return (
        <div className="ui-control-time">
            {
                title
                    ? <header
                        className="ui-control-time-title">
                        {title}
                    </header>
                    : null
            }
            {
                description
                    ? <p
                        className="ui-control-time-decription">
                        {description}
                    </p>
                    : null
            }
            <TimePicker
                size="xxs"
                value={value == null ? schema.default : value}
                onChange={e => actions.change(name, e.value)}
            />
            {message}
        </div>
    );

}


registerControl(schema => {

    if (
        schema.type === 'string'
        && schema.format === 'time'
    ) {
        return TimeControl;
    }

});
