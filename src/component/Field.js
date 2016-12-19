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

function SchemaField(props) {

    const {
        schema,
        uiSchema,
        control,
        ...rest
    } = props;

    const Control = getControl(uiSchema) || control;

    return (
        <Control {...rest} schema={schema} uiSchema={uiSchema} />
    );

}

export default createField(SchemaField);
