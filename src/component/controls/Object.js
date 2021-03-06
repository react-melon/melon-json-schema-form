/**
 * @file object render
 * @author leon(ludafa@outlook.com)
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {registerControl} from '../../factory';
import Control from './Control';
import Field from '../Field';
import {getOrderedKeys} from '../../util/getOrderedKeys';
import {format} from '../../util/field';
import cx from 'classnames';
import ValidityLabel from '../ValidityLabel';

/**
 * ObjectControl
 *
 * @class
 * @param {*} props 属性
 */
export default class ObjectControl extends PureComponent {

    render() {

        const {
            schema,
            uiSchema,
            name,
            disabled,
            readOnly,
            hidden,
            meta = {}
        } = this.props;

        const {title, description, properties} = schema;

        const keys = uiSchema.$order
            ? getOrderedKeys(properties, uiSchema.$order)
            : Object.keys(properties);

        const fields = keys
            .map(childName => {

                const key = `${name}${name ? '.' : ''}${childName}`;

                return (
                    <Field
                        key={key}
                        name={key}
                        schema={properties[childName]}
                        uiSchema={uiSchema[childName]}
                        control={Control}
                        format={format}
                        disabled={disabled}
                        readOnly={readOnly}
                    />
                );

            });

        const {touched, error} = meta;
        const invalid = touched && error && error.message;

        const className = cx(
            'ui-control-object',
            {
                'state-valid': !invalid,
                'state-invalid': invalid,
                'state-hidden': hidden
            }
        );

        return (
            <div className={className}>
                {
                    title
                        ? (
                            <header
                                className="ui-control-object-title">
                                {title}
                            </header>
                        )
                        : null
                }
                {
                    description
                        ? (
                            <p className="ui-control-object-description">
                                {description}
                            </p>
                        )
                        : null
                }
                <div className="ui-control-object-content">
                    {fields}
                </div>
                <ValidityLabel {...meta} />
            </div>
        );

    }


}

ObjectControl.propTypes = {
    name: PropTypes.string.isRequired,
    uiSchema: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired
};

ObjectControl.defaultProps = {
    uiSchema: {}
};

registerControl(function (schema) {

    if (schema.type === 'object') {
        return ObjectControl;
    }

});
