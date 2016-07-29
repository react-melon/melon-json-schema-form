/**
 * @file number render
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import TextBox from 'melon/TextBox';
import Title from 'melon/Title';
import InputComponent from 'melon-core/InputComponent';
import * as main from './factory';

export default class NumberComponent extends InputComponent {

    render() {

        const {
            schema,
            name,
            variants = [],
            ...rest
        } = this.props;

        const value = this.state.value;

        variants.push('fluid');

        return (
            <div className="ui-field variant-number">
                <Title level={4}>{schema.title}</Title>
                <TextBox
                    {...rest}
                    variants={['fluid']}
                    name={name}
                    rules={{...schema, type: 'string'}}
                    numberic={true}
                    value={value ? +value : ''}
                    onChange={({value}) => {
                        super.onChange({
                            type: 'change',
                            target: this,
                            value: value ? +value : ''
                        });
                    }} />
            </div>
        );

    }

}

main.registerComponent('number', NumberComponent);
