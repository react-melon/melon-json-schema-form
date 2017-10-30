/**
 * @file ValidityLabel
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

/**
 * ValidityLabel
 *
 * @class
 * @param {Object} props 属性
 */
export default function ValidityLabel(props) {

    let {
        touched,
        error,
        focus
    } = props;

    let message = !focus && touched && error ? error.message : '';

    let className = cx(
        'ui-control-validity-label',
        {
            'state-valid': !message,
            'state-invalid': message
        }
    );

    return (
        <div className={className}>
            {message ? message : null}
        </div>
    );

}

ValidityLabel.propTypes = {
    touched: PropTypes.bool.isRequired
};

ValidityLabel.defaultProps = {
    touched: false
};
