/**
 * @file Image
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import Uploader from 'melon/Uploader';
import {getUploaderHandler, registerComponent} from '../factory';
import {createClassName} from 'melon-core/classname/classname';
import shallowEqual from 'melon-core/util/shallowEqual';

export default class Image extends Component {

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

        const titleClassName = createClassName(
            'ui-field-title',
            'variant-level-4'
        );

        return (
            <div className="ui-field ui-field-string variant-string">
                <header className={titleClassName}>{schema.title}</header>
                <Uploader
                    size="xxs"
                    name={name}
                    variants={['fluid']}
                    rules={schema}
                    upload={getUploaderHandler()}
                    value={value}
                    onChange={onChange} />
            </div>
        );

    }

}

Image.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func
};

registerComponent(function (schema) {

    if (
        schema.type === 'string'
        && schema.media
        && /^image\//.test(schema.media.type)
    ) {
        return Image;
    }

});
