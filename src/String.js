/**
 * @file string render
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const TextBox = require('melon/TextBox');
const Title = require('melon/Title');
const factory = require('./factory');

let StringComponent = React.createClass({

    render() {

        const {schema, value, pointer, name, onChange} = this.props;
        const {title, placeholder, maxLength} = schema;

        return (
            <div className="ui-field variant-string" key={pointer}>
                <Title level={4}>{title}</Title>
                <TextBox
                    variants={['fluid']}
                    multiline={maxLength && maxLength >= 120}
                    placeholder={placeholder}
                    name={name}
                    rules={schema}
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                    }} />
            </div>
        );

    }

});

StringComponent = require('melon/createInputComponent').create(StringComponent);

factory.registerComponent('string', StringComponent);

module.exports = StringComponent;
