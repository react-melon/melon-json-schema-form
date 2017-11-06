/**
 * @file Image
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Uploader from 'melon/Uploader';
import {registerControl} from '../../../factory';
import ValidityLabel from '../../ValidityLabel';
import createStateClassName from '../../../util/createStateClassName';

export default class Image extends PureComponent {

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

        const invalid = touched && error && error.message;

        const className = createStateClassName(
            'ui-control-image',
            this.props
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
                    states={{invalid}}
                    uploading={pending}
                    onFileChange={file => (file ? actions.upload(name, file) : actions.change(name, ''))}
                    onUploadCancel={() => actions.stopPending(name)}
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
