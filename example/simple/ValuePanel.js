/**
 * @file ValuePanel
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import {connect} from 'react-redux';
import {model} from './constants';

/**
 * ValuePanel
 *
 * @class
 * @param {Object} props 属性
 */
function ValuePanel(props) {

    return (
        <pre>
            <code>
                {JSON.stringify(props.value, 0, 4)}
            </code>
        </pre>
    );

}

export default connect(
    state => ({value: state[model].value})
)(ValuePanel);
