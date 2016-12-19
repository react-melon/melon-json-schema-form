/**
 * @file Form
 * @author leon <ludafa@outlook.com>
 */

import {model} from './constants';
import {createForm, ObjectControl} from '../../src/index';
import React, {PropTypes} from 'react';

/* eslint-disable fecs-prefer-class */
/**
 * Form
 *
 * @class
 * @param {Object} props 属性
 */
function Form(props) {

    const {
        schema,
        uiSchema,
        children,
        actions,
        ...rest
    } = props;

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                actions.submit(formData => {
                    console.log(formData);
                });
            }}>
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

export default createForm({
    model,
    upload(files) {
        return new Promise(resolve => {
            setTimeout(() => {

                resolve('https://images.unsplash.com/photo-1443527216320-7e744084f5a7?dpr=1&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop=');

            }, 1000);
        });
    }
})(Form);
