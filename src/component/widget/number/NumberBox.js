/**
 * @file NumberBox
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TextBox from 'melon/TextBox';
import TextBoxInput from 'melon/textbox/Input';
import Validity from 'melon-core/Validity';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TextBox');

export default class NumberBox extends TextBox {

    constructor(props, context) {
        super(props, context);
        const value = this.state.value;
        this.state.value = value === '' || isNaN(+value) ? '' : +value;
    }

    getValue() {
        const value = this.state.value;
        return value === '' ? '' : +value;
    }

    /**
     * 值改变时处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onChange(e) {

        const value = e.target.value;

        super.onChange({
            type: 'change',
            target: {
                value: value === '' ? '' : +value
            }
        });

    }

    onBlur(e) {

        const value = e.target.value;

        super.onBlur({
            type: 'change',
            target: {
                value: value === '' ? '' : +value
            }
        });

    }

    onFocus(e) {

        const value = e.target.value;

        super.onFocus({
            type: 'change',
            target: {
                value: value === '' ? '' : +value
            }
        });

    }

    render() {

        const {
            onFocus,
            onBlur,
            onChange,
            props
        } = this;

        const {
            floatingLabel,
            ...rest
        } = props;

        const {
            validity,
            isFocus,
            isFloating,
            value
        } = this.state;

        const statefulClassName = cx(props)
            .addStates({
                focus: isFocus,
                floating: isFloating,
                fulfilled: !!value
            })
            .addStates(this.getStyleStates())
            .build();

        return (
            <div className={statefulClassName}>
                {this.renderFloatingLabel(floatingLabel, isFloating, isFocus)}
                <TextBoxInput
                    {...rest}
                    type="number"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    isFocus={isFocus}
                    value={value + ''}
                    ref={input => {
                        if (input) {
                            this.input = ReactDOM.findDOMNode(input);
                        }
                    }} />
                <Validity validity={validity} />
            </div>
        );
    }

}

NumberBox.displayName = 'NumberBox';

NumberBox.defaultProps = TextBox.defaultProps;
