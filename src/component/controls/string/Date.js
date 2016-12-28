/**
 * @file Date
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import Calendar from 'melon-calendar';
import {registerControl} from '../../../factory';
import ValidityLabel from '../../ValidityLabel';
import cx from 'classnames';

export default class DateControl extends Component {

    constructor(...args) {
        super(...args);
        this.onChange = this.onChange.bind(this);
    }

    onChange({value}) {

        const {
            name,
            actions
        } = this.props;

        const {
            validate,
            change
        } = actions;

        change(name, value);
        validate(name);

    }

    render() {

        const {
            schema,
            value,
            meta
        } = this.props;

        const {
            title,
            description
        } = schema;

        const {
            error,
            touched
        } = meta;

        const invalid = touched && error && error.message;

        const className = cx(
            'ui-control-date',
            {
                'state-valid': !invalid,
                'state-invalid': invalid
            }
        );

        return (
            <div className={className}>
                {
                    title
                        ? <header
                            className="ui-control-date-title">
                            {title}
                        </header>
                        : null
                }
                {
                    description
                        ? <p
                            className="ui-control-date-description">
                            {description}
                        </p>
                        : null
                }
                <Calendar
                    size="xxs"
                    variants={['fluid']}
                    states={{invalid}}
                    name={name}
                    value={value == null ? schema.default : value}
                    onChange={this.onChange} />
                <ValidityLabel {...meta} />
            </div>
        );

    }

}

DateControl.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.string
};

registerControl(function (schema) {

    if (
        schema.type === 'string'
        && schema.format === 'date'
    ) {
        return DateControl;
    }

});
