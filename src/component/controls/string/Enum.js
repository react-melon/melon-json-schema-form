/**
 * @file EnumTextField
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import Select from 'melon/Select';
import shallowEqual from 'melon-core/util/shallowEqual';
import cx from 'classnames';
import ValidityLabel from '../../ValidityLabel';
import {registerControl} from '../../../factory';

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
            meta
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

        const className = cx(
            'ui-control-enum',
            {
                'state-invalid': !valid,
                'state-valid': valid
            }
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
                    size="xxs"
                    variants={['fluid']}
                    name={name}
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
