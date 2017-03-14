/**
 * @file TimeControl
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import TimePicker from 'melon-timepicker';
import {registerControl} from '../../../factory';
import ValidityLabel from '../../ValidityLabel';
import createStateClassName from '../../../util/createStateClassName';

/**
 * 时间选择器
 *
 * @class
 * @param {*} props 属性
 */
export function TimeControl(props) {

    const {
        name,
        value,
        meta,
        actions,
        schema,
        disabled,
        readOnly
    } = props;

    const {
        title,
        description
    } = schema;

    const {
        error,
        touched
    } = meta;

    const invalid = touched && error && error.message;

    const className = createStateClassName('ui-control-time', props);

    return (
        <div className={className}>
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
                disabled={disabled}
                readOnly={readOnly}
                size="xxs"
                states={{invalid}}
                value={value == null ? schema.default : value}
                onChange={e => actions.change(name, e.value)}
            />
            <ValidityLabel {...meta} />
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
