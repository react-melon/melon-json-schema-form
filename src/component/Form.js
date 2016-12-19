/**
 * @file Form
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes} from 'react';
import ObjectControl from './controls/Object';

/* eslint-disable fecs-prefer-class */
/**
 * Form
 *
 * @class
 * @param {Object} props 属性
 */
export default function Form(props) {

    const {
        schema,
        uiSchema,
        children,
        meta,
        dispatch,
        actions,
        ...rest
    } = props;

    return (
        <form {...rest}>
            <ObjectControl
                name=""
                schema={schema}
                uiSchema={uiSchema}
            />
            {children}
        </form>
    );
}

Form.propTypes = {
    schema: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]).isRequired,
    uiSchema: PropTypes.object
};
