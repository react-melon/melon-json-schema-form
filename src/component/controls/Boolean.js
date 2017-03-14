/**
 * @file BooleanField
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import Toggle from 'melon/Toggle';
import * as factory from '../../factory';
import shallowEqual from 'melon-core/util/shallowEqual';
import ValidityLabel from '../ValidityLabel';
import createStateClassName from '../../util/createStateClassName';

export const type = 'Boolean';

export default class BooleanField extends Component {

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
            value,
            schema,
            meta,
            disabled,
            readOnly
        } = this.props;

        const {title, description} = schema;
        const {touched, error} = meta;
        const invalid = touched && error && error.message;

        const className = createStateClassName(
            'ui-control-boolean',
            this.props
        );

        return (
            <div className={className}>
                {
                    title
                        ? (
                            <header className="ui-control-boolean-title">
                                {title}
                            </header>
                        )
                        : null
                }
                {
                    description
                        ? (
                            <p className="ui-control-boolean-description">
                                {description}
                            </p>
                        )
                        : null
                }
                <div className="ui-control-boolean-content">
                    <Toggle
                        disabled={disabled}
                        readOnly={readOnly}
                        trueValue={true}
                        falseValue={false}
                        states={{invalid}}
                        value={value == null ? schema.default : value}
                        onChange={this.onChange} />
                </div>
                <ValidityLabel {...meta} />
            </div>
        );

    }

}

BooleanField.displayName = type;

BooleanField.propTypes = {
    value: PropTypes.bool
};

factory.registerControl(function (schema) {

    if (schema.type === 'boolean') {
        return BooleanField;
    }

});
