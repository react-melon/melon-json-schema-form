/**
 * @file number render
 * @author leon(ludafa@outlook.com)
 */

import React, {Component} from 'react';
import {registerComponent} from '../factory';
import {createClassName} from 'melon-core/classname/classname';
import NumberBox from './NumberBox';
import shallowEqual from 'melon-core/util/shallowEqual';

export default class NumberComponent extends Component {

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    render() {

        const {
            schema,
            name,
            onChange,
            ...rest
        } = this.props;

        const {
            divisibleBy = 1,
            max = Infinity,
            min = -Infinity
        } = schema;

        const value = this.props.value;
        const titleClassName = createClassName(
            'ui-field-title',
            'variant-level-4'
        );
        return (
            <div className="ui-field ui-field-number variant-number">
                <header className={titleClassName}>{schema.title}</header>
                <NumberBox
                    {...rest}
                    size="xxs"
                    step={divisibleBy}
                    min={min}
                    max={max}
                    variants={['fluid']}
                    name={name}
                    rules={schema}
                    value={value}
                    defaultValue={schema.default}
                    onChange={onChange} />
            </div>
        );

    }

}

NumberComponent.displayName = 'Number';

registerComponent(function (schema) {

    const type = schema.type;

    if (type === 'number' || type === 'integer') {
        return NumberComponent;
    }

});
