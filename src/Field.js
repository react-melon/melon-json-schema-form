/**
 * @file Field
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import * as factory from './factory';
import {connectToForm} from './util/connectToForm';
import ValidityLabel from './component/ValidityLabel';

/* eslint-disable fecs-prefer-class */
/* eslint-disable fecs-valid-class-jsdoc */
function Field(props) {

    const {
        pointer,
        schema,
        value,
        meta,
        validity,
        actions
    } = props;

    const Widget = factory.getWidget(schema, value);
    const {title, description} = schema;

    return (
        <div>
            {title ? <header>{title}</header> : null}
            {description ? <p>{description}</p> : null}
            <Widget
                {...actions}
                pointer={pointer}
                schema={schema}
                value={value}
                meta={meta}
                validity={validity} />
            {meta && meta.touched ? <ValidityLabel validity={validity} /> : null}
        </div>
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
    pointer: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
};

export default connectToForm(Field);
