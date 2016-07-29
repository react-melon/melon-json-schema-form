/**
 * @file array render
 * @author leon(ludafa@outlook.com)
 */

import * as factory from './factory';
import React, {PropTypes} from 'react';
import Title from 'melon/Title';
import InputComponent from 'melon-core/InputComponent';

export default class ArrayComponent extends InputComponent {

    renderArray(schema, value, pointer) {

        const {items, title} = schema;

        return (
            <section className="ui-field variant-array" rules={schema} key={pointer}>
                <Title level={3}>{title}</Title>
                {value.map((record, index) => {
                    const type = items.type;
                    const recordPointer = `${pointer}/${index}`;
                    const Field = factory.getComponent(type);
                    return (
                        <Field
                            key={recordPointer}
                            name={index + ''}
                            value={record}
                            schema={items}
                            onChange={e => {
                                super.onChange({
                                    type: 'change',
                                    target: this,
                                    value: this.state.value
                                        .slice(0, index)
                                        .concat(e.value)
                                        .concat(value.slice(index + 1))
                                });
                            }} />
                    );
                })}
            </section>
        );

    }

    renderTuple(schema, value, pointer) {

        const {items, title} = schema;

        return (
            <section className="ui-field variant-tuple" rules={schema}>
                <Title level={3}>{title}</Title>
                {items.map((item, index) => {
                    const type = item.type;
                    const recordPointer = `${pointer}/${index}`;
                    const Field = factory.getComponent(type);
                    return (
                        <Field
                            key={recordPointer}
                            schema={item}
                            value={value[index]}
                            name={index + ''}
                            onChange={e => {
                                super.onChange({
                                    type: 'change',
                                    target: this,
                                    value: value
                                        .slice(0, index)
                                        .concat(e.value)
                                        .concat(value.slice(index + 1))
                                });
                            }}/>
                    );
                })}
            </section>
        );

    }

    render() {

        const {schema, pointer} = this.props;
        const value = this.state.value;

        const items = schema.items;

        return Array.isArray(items)
            ? this.renderTuple(schema, value, pointer)
            : this.renderArray(schema, value, pointer);

    }

}

ArrayComponent.propTypes = {
    ...InputComponent.propTypes,
    value: PropTypes.array,
    defaultValue: PropTypes.array
};

ArrayComponent.defaultProps = {
    ...InputComponent.defaultProps,
    value: [],
    defaultValue: []
};

factory.registerComponent('array', ArrayComponent);
