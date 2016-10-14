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
                    size="xxs"
                    variants={['fluid']}
                    multiline={maxLength && maxLength >= 120}
                    placeholder={placeholder}
                    name={name}
                    rules={schema}
                    value={value}
                    defaultValue={schema.default}
                    onChange={onChange} />
            </div>
        );

    }

}

TextField.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func
};

registerComponent(function (schema) {

    if (schema.type === 'string') {
        return TextField;
    }

});
