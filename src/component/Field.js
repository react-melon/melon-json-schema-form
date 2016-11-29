/**
 * @file Field
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import * as factory from '../factory';
import {connectToForm} from '../util/connectToForm';
import ValidityLabel from './ValidityLabel';

/* eslint-disable fecs-prefer-class */
/* eslint-disable fecs-valid-class-jsdoc */
function Field(props) {

    const {
        schema,
        value
    } = props;

    const Widget = factory.getWidget(schema, value);


    return (
        <Widget {...props} />
    );

}

Field.propTypes = {
    uiSchema: PropTypes.object,
    schema: PropTypes.object.isRequired,
    value: PropTypes.any,
    meta: PropTypes.shape({
        touched: PropTypes.bool.isRequired
    }),
    validity: ValidityLabel.propTypes.validity,
    name: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
};

export default connectToForm(Field);
