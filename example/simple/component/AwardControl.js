/**
 * @file AwardControl
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import {ObjectControl} from '../../../src/index';

function getConditionalFields(type) {

    switch (type) {
        case 'nuomi':
            return ['amount', 'maxWinTimes', 'url'];
        case 'userrights':
            return ['amount', 'maxWinTimes', 'goodsInfo'];
        case 'coin':
            return ['amount', 'maxWinTimes', 'number'];
        case 'default':
        default:
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

/**
 * 奖品控件
 *
 * @class
 * @param {Object} props 属性
 */
export default function AwardControl(props) {

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
            uiSchema={{...uiSchema, $control: null}}
            schema={conditionalSchema} />
    );

}
