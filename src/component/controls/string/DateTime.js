/**
 * @file DateTimeControl
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes} from 'react';
import Calendar from 'melon-calendar';
import TimePicker from 'melon-timepicker';
import {registerControl} from '../../../factory';
import moment from 'moment';
import cx from 'classnames';
import ValidityLabel from '../../ValidityLabel';

/**
 * DateTimeControl
 *
 * @class
 * @param {Object} props 属性
 */
export default function DateTimeControl(props) {

    let {
        schema,
        value,
        name,
        actions,
        meta
    } = props;

    const {
        title,
        description,
        formatMinimum,
        formatMaximum
    } = schema;

    value = moment(value);
    value = value.isValid() ? value : moment();

    let date = value.format('YYYY-MM-DD');
    let time = value.format('HH:mm:ss');

    let {
        error,
        touched
    } = meta;

    let message = touched && error ? error.message : null;

    let className = cx(
        'ui-control-datetime',
        {
            'state-valid': !message,
            'state-invalid': message
        }
    );

    return (
        <div className={className}>
            {
                title
                    ? <header
                        className="ui-control-datetime-title">
                        {title}
                    </header>
                    : null
            }
            {
                description
                    ? <p
                        className="ui-control-datetime-decription">
                        {description}
                    </p>
                    : null
            }
            <div className="ui-control-datetime-content">
                <Calendar
                    size="xs"
                    value={date}
                    begin={formatMinimum}
                    end={formatMaximum}
                    onChange={e => {
                        actions.change(name, `${e.value} ${time}`);
                        actions.validate(name);
                    }} />
                <TimePicker
                    size="xs"
                    value={time}
                    onChange={e => {
                        actions.change(name, `${date} ${e.value}`);
                        actions.validate(name);
                    }} />
            </div>
            <ValidityLabel {...meta} />
        </div>
    );

}

DateTimeControl.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.string
};

registerControl(function (schema) {

    if (
        schema.type === 'string'
        && schema.format === 'date-time'
    ) {
        return DateTimeControl;
    }

});
