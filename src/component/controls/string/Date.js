/**
 * @file Date
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import Calendar from 'melon-calendar';
import {registerControl} from '../../../factory';
import ValidityLabel from '../../ValidityLabel';
import createStateClassName from '../../../util/createStateClassName';

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
            meta,
            disabled,
            readOnly
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

        const className = createStateClassName(
            'ui-control-date',
            this.props
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
                    disabled={disabled}
                    readOnly={readOnly}
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
