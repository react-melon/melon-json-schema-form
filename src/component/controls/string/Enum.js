/**
 * @file EnumTextField
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import Select from 'melon/Select';
import shallowEqual from 'melon-core/util/shallowEqual';
import ValidityLabel from '../../ValidityLabel';
import {registerControl} from '../../../factory';
import createStateClassName from '../../../util/createStateClassName';

export default class EnumTextField extends Component {

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    render() {

        const {
            schema,
            value,
            name,
            actions,
            meta,
            disabled,
            readOnly
        } = this.props;

        const {
            title,
            description,
            enumNames
        } = schema;

        const {
            error,
            touched
        } = meta;

        const valid = touched && error && error.message;

        const className = createStateClassName(
            'ui-control-enum',
            this.props
        );

        return (
            <div className={className}>
                {
                    title
                        ? <header
                            className="ui-control-enum-title">
                            {title}
                        </header>
                        : null
                }
                {
                    description
                        ? <p
                            className="ui-control-enum-decription">
                            {description}
                        </p>
                        : null
                }
                <Select
                    disabled={disabled}
                    readOnly={readOnly}
                    size="xxs"
                    variants={['fluid']}
                    name={name}
                    states={{valid}}
                    value={value == null ? schema.defaultValue : value}
                    onChange={e => {
                        actions.change(name, e.value);
                        actions.validate(name);
                    }}>
                    {schema.enum.map((item, index) => (
                        <option key={item} value={item}>
                            {enumNames && enumNames[index] || item}
                        </option>
                    ))}
                </Select>
                <ValidityLabel {...meta} />
            </div>
        );

    }

}

EnumTextField.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.string
};

registerControl(function (schema) {

    if (
        schema.type === 'string'
        && schema.enum
    ) {
        return EnumTextField;
    }

});
