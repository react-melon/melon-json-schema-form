/**
 * @file Date
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import Calendar from 'melon-calendar';
import {registerComponent} from '../factory';
import {createClassName} from 'melon-core/classname/classname';
import shallowEqual from 'melon-core/util/shallowEqual';

export default class DateField extends Component {

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    render() {

        const {
            schema,
            value,
            onChange,
            name
        } = this.props;

        const {
            title,
            begin,
            end
        } = schema;

        const titleClassName = createClassName(
            'ui-field-title',
            'variant-level-4'
        );

        return (
            <div className="ui-field ui-field-string variant-string">
                <header className={titleClassName}>{title}</header>
                <Calendar
                    size="xxs"
                    variants={['fluid']}
                    name={name}
                    rules={schema}
                    value={value}
                    defaultValue={schema.default}
                    begin={begin}
                    end={end}
                    onChange={onChange} />
            </div>
        );

    }

}

DateField.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

registerComponent(function (schema) {

    if (
        schema.type === 'string'
        && schema.format === 'date'
    ) {
        return DateField;
    }

});
