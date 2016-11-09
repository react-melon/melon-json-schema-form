/**
 * @file ArrayCheckBox
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import BoxGroup from 'melon/BoxGroup';
import {createClassName} from 'melon-core/classname/classname';
import {registerComponent} from '../factory';
import shallowEqual from 'melon-core/util/shallowEqual';

export default class ArrayCheckBox extends Component {

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(this.props, nextProps);
    }

    render() {

        const {
            schema,
            name,
            value,
            onChange
        } = this.props;

        const titleClassName = createClassName(
            'ui-field-title',
            'variant-level-4'
        );

        const {title, items} = schema;
        const enumNames = items.enumNames || [];

        const options = items.enum.map((item, index) => (
            <option key="item" value={item}>{enumNames[index] || item}</option>
        ));

        return (
            <div
                className="ui-field ui-field-string variant-string" >
                <header className={titleClassName}>{title}</header>
                <BoxGroup
                    size="xxs"
                    name={name}
                    rules={schema}
                    value={value}
                    onChange={onChange}>
                    {options}
                </BoxGroup>
            </div>
        );

    }

}


ArrayCheckBox.propTypes = {
    schema: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

registerComponent(function (schema) {

    const {
        type,
        uniqueItems,
        items
    } = schema;

    if (
        type === 'array'
        && uniqueItems
        && typeof items === 'object'
        && items.type === 'string'
        && items.enum
    ) {
        return ArrayCheckBox;
    }

});
