/**
 * @file melon json schema form
 * @author leon <ludafa@outlook.com>
 */

import ObjectControl from './component/controls/Object';
import BooleanControl from './component/controls/Boolean';

import TextControl from './component/controls/string/Text';
import ColorControl from './component/controls/string/Color';
import DateControl from './component/controls/string/Date';
import TimeControl from './component/controls/string/Time';
import DateTimeControl from './component/controls/string/DateTime';
import EnumControl from './component/controls/string/Enum';
import RangeControl from './component/controls/string/Range';

import ImageControl from './component/controls/string/Image';
import VariableArrayControl from './component/controls/array/VariableArray';
import TupleControl from './component/controls/array/Tuple';
import CheckBoxControl from './component/controls/array/CheckBox';
import Control from './component/controls/Control';

import Form from './Form';
import Field from './component/Field';
import {fill} from './util/schema';
import createReducer from './createReducer';

export {

    createReducer,

    Form,
    Field,

    // 具体组件
    ObjectControl,
    BooleanControl,
    RangeControl,
    TextControl,
    ColorControl,
    DateControl,
    TimeControl,
    DateTimeControl,
    EnumControl,
    ImageControl,
    VariableArrayControl,
    TupleControl,
    CheckBoxControl,

    // 工厂控件
    Control,

    // 工具 API
    fill

};
