/**
 * @file 生成 Control 的状态 className
 * @author leon <ludafa@outlook.com>
 */

import cx from 'classnames';

export default function (type, props) {

    let {
        meta,
        disabled,
        readOnly,
        hidden,
        className
    } = props;

    let {
        error,
        touched
    } = meta;

    let invalid = touched && error && error.message;

    return cx(
        type,
        className,
        {
            'state-valid': !invalid,
            'state-invalid': invalid,
            'state-hidden': hidden,
            'state-disabled': disabled,
            'state-read-only': readOnly
        }
    );

}
