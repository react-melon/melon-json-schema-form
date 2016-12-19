/**
 * @file ui schema
 * @author leon <ludafa@outlook.com>
 */

import {Field} from 'melon-form';
import AwardControl from './component/AwardControl';
import UserRightGoodsSelector from './component/UserRightGoodsSelector';
import React from 'react';

export default {
    awardList: {
        $items: {
            $control(props) {
                return (
                    <Field {...props} control={AwardControl} />
                );
            },
            goodsInfo: {
                $control(props) {
                    return (
                        <UserRightGoodsSelector {...props} />
                    );
                }
            }
        }
    },
    address: {
        2: {
            $control(props) {
                return <div>haha</div>;
            }
        }
    }
};
