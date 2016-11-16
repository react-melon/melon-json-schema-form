/**
 * @file object render
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import {registerWidget} from '../factory';

import Field from '../Field';
import {getOrderedKeys} from '../util/getOrderedKeys';

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
        pointer
    } = props;

    const properties = schema.properties;

    const fields = getOrderedKeys(properties, uiSchema['@order'])
        .map(name => {

            const key = `${pointer}.${name}`;

            return (
                <Field key={key} pointer={key} schema={properties[name]} />
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
