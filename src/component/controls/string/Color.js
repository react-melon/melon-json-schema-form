/**
 * @file Color
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ColorPicker from 'melon-colorpicker';
import {registerControl} from '../../../factory';
import ValidityLabel from '../../ValidityLabel';
import createStateClassName from '../../../util/createStateClassName';

export default class ColorControl extends PureComponent {

    constructor(...args) {
        super(...args);
        this.onChange = this.onChange.bind(this);
    }

    onChange({value}) {

        const {
            name,
            actions
        } = this.props;

        const {
            validate,
            change
        } = actions;

        change(name, value);
        validate(name);

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
            description
        } = schema;

        const {
            error,
            touched
        } = meta;

        const invalid = touched && error && error.message;

        const className = createStateClassName(
            'ui-control-color',
            this.props
        );

        return (
            <div className={className}>
                {
                    title
                        ? <header
                            className="ui-control-color-title">
                            {title}
                        </header>
                        : null
                }
                {
                    description
                        ? <p
                            className="ui-control-color-decription">
                            {description}
                        </p>
                        : null
                }
                <ColorPicker
                    disabled={disabled}
                    readOnly={readOnly}
                    size="xxs"
                    variants={['fluid']}
                    states={{invalid}}
                    name={name}
                    rules={schema}
                    value={value}
                    onChange={this.onChange} />
                <ValidityLabel {...meta} />
            </div>
        );

    }

}

ColorControl.displayName = 'ColorControl';

ColorControl.propTypes = {
    schema: PropTypes.object.isRequired
};

registerControl(function (schema) {

    if (
        schema.type === 'string'
        && schema.format === 'color'
    ) {
        return ColorControl;
    }

});
