/**
 * @file object render
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes} from 'react';
import {registerControl} from '../../factory';
import shallowEqual from 'melon-core/util/shallowEqual';
import Control from './Control';
import Field from '../Field';
import {getOrderedKeys} from '../../util/getOrderedKeys';
import {format} from '../../util/field';

/**
 * ObjectControl
 *
 * @class
 * @param {*} props 属性
 */
export default class ObjectControl extends Component {

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(this.props, nextProps);
    }

    render() {

        const {
            schema,
            uiSchema,
            name
        } = this.props;

        const {
            title,
            properties
        } = schema;

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
                    />
                );

            });

        return (
            <div className="ui-control-object">
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
                <div className="ui-control-object-content">
                    {fields}
                </div>
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
