/**
 * @file Tulpe
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes} from 'react';
import Control from '../Control';
import {registerControl} from '../../../factory';
import {format} from '../../../util/field';
import Field from '../../Field';
import cx from 'classnames';
import Validity from '../../ValidityLabel';

/* eslint-disable fecs-prefer-class */

/**
 * Tuple
 *
 * @class
 * @param {Object} props 属性
 */
export default function Tuple(props) {

    const {
        name,
        schema,
        uiSchema,
        meta
    } = props;

    const {
        items,
        title,
        description
    } = schema;

    const {
        touched,
        error
    } = meta;

    const invalid = touched && error && error.message;

    const className = cx(
        'ui-control-tuple',
        {
            'state-valid': !invalid,
            'state-invalid': invalid
        }
    );

    return (
        <div className={className}>
            {
                title
                    ? (
                        <header className="ui-control-tuple-title">
                            {title}
                        </header>
                    )
                    : null
            }
            {
                description
                    ? (
                        <p className="ui-control-tuple-description">
                            {description}
                        </p>
                    )
                    : null
            }
            <Validity {...meta} />
            <ol className="ui-field-content">
                {items.map((item, index) => {
                    const key = `${name}[${index}]`;
                    return (
                        <li key={key}>
                            <Field
                                uiSchema={uiSchema && uiSchema[index]}
                                schema={item}
                                name={key}
                                control={Control}
                                format={format} />
                        </li>
                    );
                })}
            </ol>
        </div>
    );

}

Tuple.displayName = 'Tuple';

Tuple.propTypes = {
    value: PropTypes.array,
    schema: PropTypes.object.isRequired
};

registerControl(function (schema) {

    const {
        type,
        items
    } = schema;

    if (type === 'array' && Array.isArray(items)) {
        return Tuple;
    }

});
