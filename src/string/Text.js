/**
 * @file Text
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import TextBox from 'melon/TextBox';
import {registerComponent} from '../factory';
import {createClassName} from 'melon-core/classname/classname';
import shallowEqual from 'melon-core/util/shallowEqual';

export default class TextField extends Component {

    constructor(...args) {
        super(...args);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onKeyDown(e) {

        const {onChange, value} = this.props;

        const nextValue = e.target.value;

        if (e.keyCode === 13 && nextValue !== value) {
            onChange({
                type: 'change',
                target: this.refs.textbox,
                value: nextValue
            });
        }
    }

    onBlur(e) {

        const target = e.target;
        const currentValue = target.getValue();

        this.props.onChange({
            type: 'change',
            target,
            value: currentValue
        });

    }

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    render() {

        const {
            schema,
            value,
            name
        } = this.props;

        const {
            maxLength,
            placeholder,
            title
        } = schema;

        const titleClassName = createClassName(
            'ui-field-title',
            'variant-level-4'
        );

        return (
            <div className="ui-field ui-field-string variant-string">
                <header className={titleClassName}>{title}</header>
                <TextBox
                    ref="textbox"
                    size="xxs"
                    variants={['fluid']}
                    multiline={maxLength && maxLength >= 120}
                    placeholder={placeholder}
                    name={name}
                    rules={schema}
                    value={value}
                    defaultValue={schema.default}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onBlur} />
            </div>
        );

    }

}

TextField.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

registerComponent(function (schema) {

    if (schema.type === 'string') {
        return TextField;
    }

});
