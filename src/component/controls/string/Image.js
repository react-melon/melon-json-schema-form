/**
 * @file Image
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import Uploader from 'melon/Uploader';
import shallowEqual from 'melon-core/util/shallowEqual';
import {registerControl} from '../../../factory';
import ValidityLabel from '../../ValidityLabel';
import cx from 'classnames';

export default class Image extends Component {

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    render() {

        const {
            schema,
            value,
            name,
            actions,
            meta
        } = this.props;

        const {
            title,
            description
        } = schema;

        const {
            pending,
            touched,
            error
        } = meta;

        const valid = touched && error && error.message;

        const className = cx(
            'ui-control-image',
            {
                'state-valid': valid,
                'state-invalid': !valid
            }
        );

        return (
            <div className={className}>
                {
                    title
                        ? <header
                            className="ui-control-image-title">
                            {title}
                        </header>
                        : null
                }
                {
                    description
                        ? <p
                            className="ui-control-image-decription">
                            {description}
                        </p>
                        : null
                }
                <Uploader
                    size="xxs"
                    variants={['fluid']}
                    style={{maxWidth: '100%'}}
                    uploading={pending}
                    onFileChange={file => {

                        if (!file) {
                            actions.change(name, '');
                            return;
                        }

                        actions.upload(name, file);

                    }}
                    onUploadCancel={() => {
                        actions.stopPending(name);
                    }}
                    value={value} />
                <ValidityLabel {...meta} />
            </div>
        );

    }

}

Image.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.string
};

registerControl(function (schema) {

    if (
        schema.type === 'string'
        && schema.media
        && /^image\//.test(schema.media.type)
    ) {
        return Image;
    }

});
