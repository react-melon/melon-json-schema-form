/**
 * @file number render
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes} from 'react';
import {registerWidget} from '../../../factory';
import {createClassName} from 'melon-core/classname/classname';
import NumberBox from './NumberBox';
import shallowEqual from 'melon-core/util/shallowEqual';

export default class NumberComponent extends Component {

    constructor(...args) {
        super(...args);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    onKeyDown(e) {

        const {value, onChange} = this.props;

        const {
            keyCode,
            shiftKey,
            altKey,
            metaKey
        } = e;

        let currentValue = e.target.value;
        let textbox = this.refs.textbox;

        // 如果是上或下，那么要做额外数字处理
        // shift 是 10x，alt 是 0.1x 其他就是 1x
        if (keyCode === 38 || keyCode === 40) {

            e.preventDefault();

            currentValue = (+currentValue)
                + (keyCode === 38 ? 1 : -1)
                * (metaKey ? 100 : (shiftKey ? 10 : (altKey ? 0.1 : 1)));

            onChange({
                type: 'change',
                target: textbox,
                value: +currentValue.toFixed(3),
                pointer: textbox.pointer
            });

            return;
        }

        // 如果是回车，相当于触发了一个 blur
        if (keyCode === 13 && currentValue !== value) {
            onChange({
                type: 'change',
                target: textbox,
                value: currentValue === '' ? value : +currentValue,
                pointer: textbox.pointer
            });
        }

    }

    onBlur(e) {

        const {onChange, value} = this.props;
        const target = e.target;
        const currentValue = target.getValue();

        if (currentValue !== value) {
            onChange({
                type: 'change',
                target,
                value: currentValue === '' ? value : currentValue,
                pointer: target.pointer
            });
        }

    }

    render() {

        const {
            schema,
            name,
            ...rest
        } = this.props;

        const {
            divisibleBy,
            max = Infinity,
            min = -Infinity,
            type
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
                    onChange={null}
                    ref="textbox"
                    size="xxs"
                    step={divisibleBy || type === 'integer' ? 1 : 0.001}
                    min={min}
                    max={max}
                    variants={['fluid']}
                    name={name}
                    rules={schema}
                    value={value}
                    defaultValue={schema.default}
                    validateEvents={['blur']}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onBlur} />
            </div>
        );

    }

}

NumberComponent.displayName = 'Number';

NumberComponent.propTypes = {
    onChange: PropTypes.func.isRequired
};

registerWidget(function (schema) {

    const type = schema.type;

    if (type === 'number' || type === 'integer') {
        return NumberComponent;
    }

});
