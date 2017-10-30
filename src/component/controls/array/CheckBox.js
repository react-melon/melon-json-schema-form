/**
 * @file ArrayCheckBox
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import BoxGroup from 'melon/BoxGroup';
import {registerControl} from '../../../factory';
import ValidityLabel from '../../ValidityLabel';
import createStateClassName from '../../../util/createStateClassName';

export default class ArrayCheckBox extends PureComponent {

    constructor(...args) {
        super(...args);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const {actions, name} = this.props;
        const {validate, change} = actions;
        change(name, e.value);
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
            items,
            description
        } = schema;

        const enumNames = items.enumNames || [];

        const options = items
            .enum
            .map((item, index) => (
                <option
                    key="item"
                    value={item}>
                    {enumNames[index] || item}
                </option>
            ));

        const {
            error,
            touched
        } = meta;

        const invalid = touched && error && error.message;

        const className = createStateClassName(
            'ui-control-checkbox',
            this.props
        );

        const variants = [
            items.enum.length > 3 ? 'horizontal' : null
        ];

        return (
            <div className={className}>
                {
                    title
                        ? (
                            <header className="ui-control-checkbox-title">
                                {title}
                            </header>
                        )
                        : null
                }
                {
                    description
                        ? (
                            <p className="ui-control-checkbox-description">
                                {description}
                            </p>
                        )
                        : null
                }
                <BoxGroup
                    size="xxs"
                    variants={variants}
                    states={{invalid}}
                    value={value}
                    onChange={this.onChange}
                    disabled={disabled}
                    readOnly={readOnly}>
                    {options}
                </BoxGroup>
                <ValidityLabel {...meta} />
            </div>
        );

    }

}


ArrayCheckBox.propTypes = {
    schema: PropTypes.object.isRequired
};

registerControl(function (schema) {

    const {
        type,
        uniqueItems,
        items
    } = schema;

    if (
        type === 'array'
        && uniqueItems
        && typeof items === 'object'
        && items.type === 'string'
        && items.enum
    ) {
        return ArrayCheckBox;
    }

});
