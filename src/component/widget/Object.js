/**
 * @file object render
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import {registerWidget} from '../../factory';

import Field from '../Field';
import {getOrderedKeys} from '../../util/getOrderedKeys';

/**
 * ObjectField
 *
 * @class
 * @param {*} props 属性
 */
export default function ObjectField(props) {

    const {
        schema,
        uiSchema,
        name
    } = props;

    const properties = schema.properties;

    const fields = getOrderedKeys(properties, uiSchema['@order'])
        .map(childName => {

            const key = `${name}${name ? '.' : ''}${childName}`;

            return (
                <Field key={key} name={key} schema={properties[childName]} />
            );

        });

    return (
        <fieldset className="ui-field ui-field-object">
            {fields}
        </fieldset>
    );

}

ObjectField.displayName = 'ObjectWidget';

ObjectField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.object,
    uiSchema: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired
};

ObjectField.defaultProps = {
    value: {},
    uiSchema: {}
};

registerWidget(function (schema) {

    if (schema.type === 'object') {
        return ObjectField;
    }

});
