/**
 * @file Color
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import ColorPicker from 'melon-colorpicker';
import {registerComponent} from '../factory';
import {createClassName} from 'melon-core/classname/classname';
import shallowEqual from 'melon-core/util/shallowEqual';

export default class ColorField extends Component {

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    render() {

        const {
            schema,
            value,
            onChange,
            name
        } = this.props;

        const title = schema.title;

        const titleClassName = createClassName(
            'ui-field-title',
            'variant-level-4'
        );

        return (
            <div className="ui-field ui-field-string variant-string">
                <header className={titleClassName}>{title}</header>
                <ColorPicker
                    size="xxs"
                    variants={['fluid']}
                    name={name}
                    rules={schema}
                    value={value}
                    defaultValue={schema.default}
                    onChange={onChange} />
            </div>
        );

    }

}

ColorField.displayName = 'ColorField';

ColorField.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func
};

registerComponent(function (schema) {

    if (
        schema.type === 'string'
        && schema.format === 'color'
    ) {
        return ColorField;
    }

});
