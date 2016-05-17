/**
 * @file string render
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import TextBox from 'melon/TextBox';
import Title from 'melon/Title';
import * as factory from './factory';

export default class StringComponent extends React.Component {

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
                    onChange={onChange} />
            </div>
        );

    }

}

factory.registerComponent('string', StringComponent);

module.exports = StringComponent;
