/**
 * @file melon-json-schema-form
 * @author leon(ludafa@outlook.com)
 */

import Form from './component/Form';
import Field from './component/Field';

import ObjectField from './component/widget/Object';
import Boolean from './component/widget/Boolean';
import Number from './component/widget/number/Number';
import Range from './component/widget/number/Range';

import Text from './component/widget/string/Text';
import Color from './component/widget/string/Color';
import DateField from './component/widget/string/Date';
import EnumText from './component/widget/string/EnumText';
import Image from './component/widget/string/Image';

import VariableArray from './component/widget/array/VariableArray';
import Tuple from './component/widget/array/Tuple';
import CheckBox from './component/widget/array/CheckBox';

import resolveDefaults from './util/resolveDefaults';
import * as pointer from './util/pointer';

export * from './factory';


export {
    Form,
    Field,
    DateField as Date,
    ObjectField as Object,
    Boolean,
    Range,
    Number,
    EnumText,
    Color,
    Image,
    Text,
    CheckBox,
    Tuple,
    VariableArray,
    resolveDefaults,
    pointer
};
