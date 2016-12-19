/**
 * @file ValidityLabel
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes} from 'react';
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
        error
    } = props;

    let message = touched && error ? error.message : '';

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
