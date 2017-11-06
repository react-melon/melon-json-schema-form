/**
 * @file Range
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Slider from 'melon/Slider';
import {registerControl} from '../../../factory';
import ValidityLabel from '../../ValidityLabel';
import createStateClassName from '../../../util/createStateClassName';

export default class Range extends PureComponent {

    render() {

        let {
            schema,
            value,
            name,
            actions,
            meta
        } = this.props;

        let {
            formatMaximum,
            formatMinimum = 0,
            title,
            description
        } = schema;

        let {
            error,
            touched
        } = meta;

        value = isNaN(+value) ? formatMinimum : value;

        let invalid = touched && error && error.message;

        let className = createStateClassName(
            'ui-control-range',
            this.props
        );

        return (
            <div className={className}>
                {
                    title
                        ? <header
                            className="ui-control-range-title">
                            {title}
                        </header>
                        : null
                }
                {
                    description
                        ? <p
                            className="ui-control-range-decription">
                            {description}
                        </p>
                        : null
                }
                <Slider
                    size="xxs"
                    variants={['fluid']}
                    name={name}
                    value={+value}
                    maximum={+formatMaximum}
                    minimum={+formatMinimum}
                    states={{invalid}}
                    onChange={e => {
                        actions.change(name, e.value + '');
                        actions.validate(name);
                    }} />
                <ValidityLabel {...meta} />
            </div>
        );

    }

}

Range.propTypes = {
    schema: PropTypes.object.isRequired
};

registerControl(function (schema) {

    const {
        type,
        format,
        formatMaximum,
        formatMinimum
    } = schema;

    if (
        type === 'string'
        && format === 'numeric'
        && formatMaximum != null
        && formatMinimum != null
    ) {
        return Range;
    }

});
