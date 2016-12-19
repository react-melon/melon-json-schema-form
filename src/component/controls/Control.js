/**
 * @file FieldControl
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes} from 'react';
import {getControl} from '../../factory';

/* eslint-disable fecs-prefer-class */
/**
 * Control
 *
 * @class
 * @param {Object} props 属性
 */
export default function Control(props) {

    const Control = getControl(props.schema);

    if (process.env.NODE_ENV === 'dev') {
        if (!Control) {
            throw new Error('no control match schema: %o', props.schema);
        }
    }

    return (
        <Control {...props} />
    );

}


Control.propTypes = {
    schema: PropTypes.object.isRequired
};
