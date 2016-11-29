/**
 * @file Text
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {registerWidget} from '../../../factory';
import shallowEqual from 'melon-core/util/shallowEqual';
import ValidityLabel from '../../ValidityLabel';

export default class TextWidget extends Component {

    constructor(...args) {
        super(...args);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    onFocus(e) {

        const {
            name,
            actions
        } = this.props;

        actions.focus(name, e);

    }

    onBlur(e) {
        const {name, actions} = this.props;
        actions.blur(name);
    }

    onChange(e) {

        const {
            actions,
            name
        } = this.props;

        actions.change(name, e.target.value);

    }

    render() {

        const {
            schema,
            value,
            name,
            validity,
            meta
        } = this.props;


        const {
            title,
            description,
            placeholder
        } = schema;

        return (
            <div className="ui-field ui-field-text">
                <header>{title}</header>
                <p>{description}</p>
                <input
                    className="ui-widget ui-widget-string variant-string"
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    defaultValue={schema.default}
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                    onBlur={this.onBlur} />
                {meta.touched ? <ValidityLabel validity={validity} /> : null}
            </div>
        );

    }

}

registerWidget(function (schema) {

    if (schema.type === 'string') {
        return TextWidget;
    }

});
