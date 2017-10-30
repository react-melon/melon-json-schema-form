/**
 * @file Text
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import {registerControl} from '../../../factory';
import TextBox from 'melon/TextBox';
import ValidityLabel from '../../ValidityLabel';
import createStateClassName from '../../../util/createStateClassName';

export default class TextControl extends PureComponent {

    constructor(...args) {
        super(...args);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
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
            meta,
            disabled,
            readOnly
        } = this.props;


        const {
            title,
            description,
            placeholder
        } = schema;

        const {
            touched,
            error,
            focus
        } = meta;

        const invalid = !focus && touched && error && error.message;

        const className = createStateClassName(
            'ui-control-text',
            this.props
        );

        return (
            <div className={className}>
                {
                    title
                        ? (
                            <header className="ui-control-text-title">
                                {title}
                            </header>
                        )
                        : null
                }
                {
                    description
                        ? (
                            <p className="ui-control-text-description">
                                {description}
                            </p>
                        )
                        : null
                }
                <TextBox
                    disabled={disabled}
                    readOnly={readOnly}
                    variants={['fluid']}
                    states={{invalid}}
                    size="xs"
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    defaultValue={schema.default}
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                    onBlur={this.onBlur} />
                <ValidityLabel {...meta} />
            </div>
        );

    }

}

registerControl(function (schema) {

    if (schema.type === 'string') {
        return TextControl;
    }

});
