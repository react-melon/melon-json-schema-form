/**
 * @file Color
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import ColorPicker from 'melon-colorpicker';
import shallowEqual from 'melon-core/util/shallowEqual';
import {registerControl} from '../../../factory';
import cx from 'classnames';
import ValidityLabel from '../../ValidityLabel';

export default class ColorControl extends Component {

    constructor(...args) {
        super(...args);
        this.onChange = this.onChange.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
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
            meta
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

        const className = cx(
            'ui-control-color',
            {
                'state-valid': !invalid,
                'state-invalid': invalid
            }
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
