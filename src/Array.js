/**
 * @file array render
 * @author leon(ludafa@outlook.com)
 */

const factory = require('./factory');
const React = require('react');
const Title = require('melon/Title');
const createInputComponent = require('melon/createInputComponent');

let ArrayComponent = React.createClass({

    renderArray(schema, value, pointer) {

        const {items, title} = schema;
        const {onChange} = this.props;

        return (
            <section className="ui-field variant-array" rules={schema} key={pointer}>
                <Title level={3}>{title}</Title>
                {value.map((record, index) => {
                    const {type} = items;
                    const recordPointer = `${pointer}/${index}`;
                    const Field = factory.getComponent(type);
                    return (
                        <Field
                            key={recordPointer}
                            name={index + ''}
                            value={record}
                            schema={items}
                            onChange={(e) => {
                                onChange({
                                    value: value
                                        .slice(0, index)
                                        .concat(e.value)
                                        .concat(value.slice(index + 1))
                                });
                            }} />
                    );
                })}
            </section>
        );

    },

    renderTuple(schema, value, pointer) {

        const {items, title} = schema;
        const {onChange} = this.props;

        return (
            <section className="ui-field variant-tuple" rules={schema}>
                <Title level={3}>{title}</Title>
                {items.map((item, index) => {
                    const {type} = item;
                    const recordPointer = `${pointer}/${index}`;
                    const Field = factory.getComponent(type);
                    return (
                        <Field
                            key={recordPointer}
                            schema={item}
                            value={value[index]}
                            name={index + ''}
                            onChange={(e) => {
                                onChange({
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

    },

    render() {

        const {schema, value, pointer} = this.props;

        const {items} = schema;

        return Array.isArray(items)
            ? this.renderTuple(schema, value, pointer)
            : this.renderArray(schema, value, pointer);

    }

});

const {PropTypes} = React;

ArrayComponent.propTypes = {
    value: PropTypes.array
};

ArrayComponent = createInputComponent.create(ArrayComponent);

factory.registerComponent('array', ArrayComponent);

module.exports = ArrayComponent;

