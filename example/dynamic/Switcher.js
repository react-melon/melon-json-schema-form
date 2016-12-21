/**
 * @file Switcher
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import Tabs from 'melon/Tabs';
import {connect} from 'react-redux';


function Switcher(props) {

    const {
        index,
        onChange
    } = props;

    return (
        <Tabs
            selectedIndex={index}
            onChange={({selectedIndex}) => onChange(selectedIndex)}>
            <Tabs.Tab label="a" />
            <Tabs.Tab label="b" />
        </Tabs>
    );

}

export default connect(
    state => {
        const current = state.current;
        return {
            index: current === 'a' ? 0 : 1
        };
    },
    {
        onChange(index) {
            return {
                type: 'switch-form',
                payload: index ? 'b' : 'a'
            };
        }
    }
)(Switcher);
