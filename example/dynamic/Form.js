/**
 * @file Form
 * @author leon <ludafa@outlook.com>
 */

import {Form, ObjectControl} from '../../src/index';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

/* eslint-disable fecs-prefer-class */
/**
 * Form
 *
 * @class
 * @param {Object} props 属性
 */
function FormControl(props) {

    const {
        schema,
        uiSchema,
        children,
        actions
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

FormControl.propTypes = {
    schema: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]).isRequired,
    uiSchema: PropTypes.object
};

function upload(files) {
    return new Promise(resolve => {

        setTimeout(() => {

            resolve('https://images.unsplash.com/photo-1443527216320-7e744084f5a7?dpr=1&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop=');

        }, 1000);

    });
}

function DynamicForm(props) {

    return (
        <Form
            {...props}
            control={FormControl}
            upload={upload} />
    );

}

export default connect(
    state => {

        const {current, schemas} = state;

        return {
            model: `forms.${current}`,
            schema: schemas[current]
        };
    }
)(DynamicForm);
