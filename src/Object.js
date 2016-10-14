/**
 * @file object render
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import * as main from './factory';

import InputComponent from 'melon-core/InputComponent';
import Title from 'melon/Title';

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
        const {schema, level, style} = props;
        const {properties, title} = schema;

        const value = this.state.value;

        return (
            <fieldset
                data-pointer={pointer}
                className="ui-field variant-map"
                style={style}>
                <header className="ui-field-title ui-field-object-title">
                    {title}
                </header>
                <ul className="ui-field-content">
                    {Object.keys(properties).map(name => {
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
                    })}
                </ul>
            </fieldset>
        );
    }

}

ObjectField.displayName = 'Object';

ObjectField.propTypes = {
    ...InputComponent.propTypes,
    value: PropTypes.object,
    defaultValue: PropTypes.object
};

ObjectField.defaultProps = {
    ...InputComponent.defaultProps,
    value: {},
    defaultValue: {}
};


main.registerComponent(function (schema) {

    if (schema.type === 'object') {
        return ObjectField;
    }

});
