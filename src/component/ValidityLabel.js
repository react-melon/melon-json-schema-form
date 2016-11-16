/**
 * @file Validity Label
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes} from 'react';

/* eslint-disable fecs-prefer-class */
/* eslint-disable fecs-valid-class-jsdoc */
export default function ValidityLabel({validity}) {

    const state = validity && validity.find(item => !item.valid);

    return (
        <div className="ui-validity-label">
            {state ? state.message : null}
        </div>
    );

}

ValidityLabel.propTypes = {
    validity: PropTypes.arrayOf(PropTypes.shape({
        valid: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired
    }))
};
