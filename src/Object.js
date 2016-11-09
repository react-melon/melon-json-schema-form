/**
 * @file object render
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import * as main from './factory';

import InputComponent from 'melon-core/InputComponent';
import Title from 'melon/Title';
import {getOrderedKeys} from './util/getOrderedKeys';

export default class ObjectField extends InputComponent {

    constructor(...args) {
        super(...args);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    renderTitle(title) {

        if (!title) {
            return null;
        }

        return (
            <legend>
                <Title level={4} size="xxs">{title}</Title>
            </legend>
        );

    }

    onFieldChange(e) {

        const {
            target,
            value
        } = e;

        this.onChange({
            target: this,
            value: {
                ...this.state.value,
                [target.props.name]: value
            }
        });

    }

    render() {

        const {props, pointer} = this;
        const {schema, level, style, uiSchema} = props;
        const {properties, title} = schema;

        const value = this.state.value;

        const fields = getOrderedKeys(properties, uiSchema['@order'])
            .map(name => {
                const subSchema = properties[name];
                const Field = main.getComponent(subSchema);
                if (!Field) {
                    return null;
                }
                return (
                    <li key={`${pointer}/${name}`}>
                        <Field
                            schema={subSchema}
                            level={level + 1}
                            value={value[name]}
                            name={name}
                            onChange={this.onFieldChange} />
                    </li>
                );
            });

        return (
            <fieldset
                data-pointer={pointer}
                className="ui-field variant-map"
                style={style}>
                <header className="ui-field-title ui-field-object-title">
                    {title}
                </header>
                <ul className="ui-field-content">
                    {fields}
                </ul>
            </fieldset>
        );
    }

}

ObjectField.displayName = 'Object';

ObjectField.propTypes = {
    ...InputComponent.propTypes,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    uiSchema: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired
};

ObjectField.defaultProps = {
    ...InputComponent.defaultProps,
    value: {},
    defaultValue: {},
    uiSchema: {}
};


main.registerComponent(function (schema) {

    if (schema.type === 'object') {
        return ObjectField;
    }

});
