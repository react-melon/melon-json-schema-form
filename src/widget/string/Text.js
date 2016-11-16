/**
 * @file Text
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {registerWidget} from '../../factory';
import shallowEqual from 'melon-core/util/shallowEqual';

export default class TextWidget extends Component {

    constructor(...args) {
        super(...args);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onFocus(e) {

        const {
            pointer,
            focusField
        } = this.props;

        focusField(pointer, e);

    }

    onBlur(e) {
        const {pointer, blurField} = this.props;
        blurField(pointer);
    }

    onChange(e) {

        const {
            changeField,
            pointer
        } = this.props;

        changeField(pointer, e.target.value);

    }

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    render() {

        const {
            schema,
            value,
            name,
            validity
        } = this.props;

        return (
            <input
                className="ui-widget ui-widget-string variant-string"
                placeholder={schema.placeholder}
                name={name}
                value={value}
                defaultValue={schema.default}
                onFocus={this.onFocus}
                onChange={this.onChange}
                onBlur={this.onBlur} />
        );

    }

}

registerWidget(function (schema) {

    if (schema.type === 'string') {
        return TextWidget;
    }

});
