/**
 * @file Tulpe
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import Control from '../Control';
import {registerControl} from '../../../factory';
import {format} from '../../../util/field';
import Field from '../../Field';
import Validity from '../../ValidityLabel';
import createStateClassName from '../../../util/createStateClassName';

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
        meta,
        disabled,
        readOnly
    } = props;

    const {
        items,
        title,
        description
    } = schema;

    const className = createStateClassName(
        'ui-control-tuple',
        props
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
                                format={format}
                                disabled={disabled}
                                readOnly={readOnly} />
                        </li>
                    );
                })}
            </ol>
            <Validity {...meta} />
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
