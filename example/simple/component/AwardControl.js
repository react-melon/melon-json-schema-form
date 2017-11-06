/**
 * @file Award
 * @author leon <lupengyu@baidu.com>
 */

import React from 'react';
import {Field, ObjectControl} from '../../../src/index';

function getConditionalFields(type) {

    const BASE_FIELDS = [
        'amount',
        'maxWinTimes'
    ];

    switch (type) {
        case 'nuomiSeller':
            return [
                ...BASE_FIELDS,
                'url',
                'sourceType',
                'appId'
            ];
        case 'userrights':
            return [
                ...BASE_FIELDS,
                'goodsInfo',
                'sync',
                'sourceType',
                'appId'
            ];
        case 'coin':
            return [
                ...BASE_FIELDS,
                'number'
            ];
        case 'default': default:
            return [];
    }

}

function getSchema(value, schema) {

    const properties = schema.properties;

    const fields = [
        'name',
        'dialogImg',
        'type',
        ...getConditionalFields(value.type)
    ];

    return {
        ...schema,
        required: fields,
        properties: fields.reduce(
            (nextProps, fieldName) => {
                nextProps[fieldName] = properties[fieldName];
                return nextProps;
            },
            {}
        )
    };

}

function AwardControl(props) {

    const {
        schema,
        uiSchema,
        value = {},
        ...rest
    } = props;

    const conditionalSchema = getSchema(value, schema);

    return (
        <ObjectControl
            {...rest}
            uiSchema={uiSchema}
            schema={conditionalSchema} />
    );

}

export default function AwardField(props) {

    const {
        uiSchema,
        ...rest
    } = props;

    return (
        <Field
            {...rest}
            uiSchema={{...uiSchema, $control: null}}
            control={AwardControl} />
    );

}
