/**
 * @file EnumTextField
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import Select from 'melon/Select';
import {createClassName} from 'melon-core/classname/classname';
import shallowEqual from 'melon-core/util/shallowEqual';

import {registerWidget} from '../../../factory';

export default class EnumTextField extends Component {

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
            enumNames
        } = schema;

        const titleClassName = createClassName(
            'ui-field-title',
            'variant-level-4'
        );

        return (
            <div className="ui-field ui-field-string variant-string">
                <header className={titleClassName}>{title}</header>
                <Select
                    size="xxs"
                    variants={['fluid']}
                    name={name}
                    rules={schema}
                    value={value}
                    defaultValue={schema.default}
                    onChange={e => {
                        onChange({
                            ...e,
                            pointer: e.target.pointer
                        });
                    }}>
                    {schema.enum.map((item, index) => (
                        <option key={item} value={item}>
                            {enumNames && enumNames[index] || item}
                        </option>
                    ))}
                </Select>
            </div>
        );

    }

}

EnumTextField.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

registerWidget(function (schema) {

    if (
        schema.type === 'string'
        && schema.enum
    ) {
        return EnumTextField;
    }

});
