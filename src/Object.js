/**
 * @file object render
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const main = require('./factory');
const {create} = require('melon/createInputComponent');
const Title = require('melon/Title');

let ObjectComponent = React.createClass({

    render() {

        const {schema, value = {}, pointer, onChange} = this.props;
        const {properties, title} = schema;

        return (
            <section data-pointer={pointer} className="ui-field variant-map">
                <Title level={3}>{title}</Title>
                {Object.keys(properties).map((name) => {
                    const subSchema = properties[name];
                    const {type} = subSchema;
                    const Field = main.getComponent(type);
                    return (
                        <Field
                            schema={subSchema}
                            value={value[name]}
                            key={`${pointer}/${name}`}
                            name={name}
                            onChange={(e) => {
                                onChange({
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

});

ObjectComponent = create(ObjectComponent);

main.registerComponent('object', ObjectComponent);

module.exports = ObjectComponent;
