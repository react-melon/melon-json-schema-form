/**
 * @file Text
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {registerControl} from '../../../factory';
import shallowEqual from 'melon-core/util/shallowEqual';
import TextBox from 'melon/TextBox';
import cx from 'classnames';
import ValidityLabel from '../../ValidityLabel';

export default class TextControl extends Component {

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
            meta
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

        const className = cx(
            'ui-control-text',
            {
                'state-invalid': invalid,
                'state-valid': !invalid
            }
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
