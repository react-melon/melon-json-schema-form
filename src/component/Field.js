/**
 * @file SchemaField
 * @author leon <ludafa@outlook.com>
 */

import {createField} from 'melon-form';
import React from 'react';

function getControl(uiSchema) {

    return uiSchema && typeof uiSchema.$control === 'function'
        ? uiSchema.$control
        : null;

}

/**
 * SchemaField
 *
 * @class
 * @param {*} props 属性
 */
function SchemaField(props) {

    const {
        schema,
        uiSchema = {},
        control,
        disabled,
        readOnly,
        hidden,
        ...rest
    } = props;

    const Control = getControl(uiSchema) || control;

    const {
        $disabled,
        $readOnly,
        $hidden
    } = uiSchema;

    return (
        <Control
            {...rest}
            schema={schema}
            uiSchema={uiSchema}
            disabled={disabled || $disabled}
            readOnly={readOnly || $readOnly}
            hidden={hidden || $hidden} />
    );

}

export default createField(SchemaField);
