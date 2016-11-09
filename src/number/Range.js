/**
 * @file Range
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes, Component} from 'react';
import Slider from 'melon/Slider';
import {registerComponent} from '../factory';
import {createClassName} from 'melon-core/classname/classname';
import shallowEqual from 'melon-core/util/shallowEqual';

export default class Range extends Component {

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
            max,
            min,
            title
        } = schema;

        const titleClassName = createClassName(
            'ui-field-title',
            'variant-level-4'
        );

        return (
            <div className="ui-field ui-field-string variant-string">
                <header className={titleClassName}>{title}</header>
                <Slider
                    size="xxs"
                    variants={['fluid']}
                    name={name}
                    rules={schema}
                    value={value}
                    defaultValue={schema.default}
                    max={max}
                    min={min}
                    onChange={onChange} />
            </div>
        );

    }

}

Range.propTypes = {
    onChange: PropTypes.func.isRequired
};

registerComponent(function (schema) {

    const {
        type,
        max,
        min
    } = schema;

    if (
        (type === 'number' || type === 'integer')
        && max != null && min != null
    ) {
        return Range;
    }

});
