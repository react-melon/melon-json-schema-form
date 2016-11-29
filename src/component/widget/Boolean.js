/**
 * @file BooleanField
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import Toggle from 'melon/Toggle';
import Title from 'melon/Title';
import * as factory from '../../factory';
import shallowEqual from 'melon-core/util/shallowEqual';

export const type = 'Boolean';

export default class BooleanField extends Component {

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    render() {

        const {
            name,
            value,
            schema,
            onChange
        } = this.props;

        const title = schema.title;

        return (
            <div className="ui-field variant-boolean">
                {title ? <Title size="xxs">{title}</Title> : null}
                <div className="ui-field-component">
                    <Toggle
                        rules={schema}
                        name={name}
                        value={value}
                        defaultValue={schema.default}
                        trueValue={true}
                        falseValue={false}
                        onChange={onChange} />
                </div>
            </div>
        );

    }

}

BooleanField.displayName = type;

BooleanField.propTypes = {
    value: PropTypes.bool
};

factory.registerWidget(function (schema) {

    if (schema.type === 'boolean') {
        return BooleanField;
    }

});
