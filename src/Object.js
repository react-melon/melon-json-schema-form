/**
 * @file object render
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import * as main from './factory';

import InputComponent from 'melon/InputComponent';
import Title from 'melon/Title';

export default class ObjectComponent extends InputComponent {

    render() {

        const {schema, pointer} = this.props;
        const {properties, title} = schema;

        const value = this.state.value;

        return (
            <section data-pointer={pointer} className="ui-field variant-map">
                <Title level={3}>{title}</Title>
                {Object.keys(properties).map(name => {
                    const subSchema = properties[name];
                    const type = subSchema.type;
                    const Field = main.getComponent(type);
                    return (
                        <Field
                            schema={subSchema}
                            value={value[name]}
                            key={`${pointer}/${name}`}
                            name={name}
                            onChange={e => {
                                super.onChange({
                                    type: 'change',
                                    target: this,
                                    value: {
                                        ...value,
                                        [name]: e.value
                                    }
                                });
                            }} />
                    );
                })}
            </section>
        );
    }

}

ObjectComponent.propTypes = {
    ...InputComponent.propTypes,
    value: PropTypes.object,
    defaultValue: PropTypes.object
};

ObjectComponent.defaultProps = {
    ...InputComponent.defaultProps,
    value: {},
    defaultValue: {}
};


main.registerComponent('object', ObjectComponent);
