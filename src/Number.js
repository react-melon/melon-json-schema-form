/**
 * @file number render
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const TextBox = require('melon/TextBox');
const Title = require('melon/Title');
const main = require('./factory');

const NumberComponent = React.createClass({

    render() {

        const {schema, value, name, onChange} = this.props;
        const {title} = schema;

        return (
            <div className="ui-field variant-number">
                <Title level={4}>{title}</Title>
                <TextBox
                    variants={['fluid']}
                    name={name}
                    rules={schema}
                    numberic={true}
                    value={value != null ? +value : ''}
                    onChange={(e) => {
                        onChange({
                            value: e.value
                        });
                    }} />
            </div>
        );

    }

});

main.registerComponent('number', NumberComponent);

module.exports = NumberComponent;
