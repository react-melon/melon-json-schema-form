/**
 * @file melon-json-schema-form
 * @author leon(ludafa@outlook.com)
 */

import Form from './Form';
import Field from './Field';

import ObjectField from './widget/Object';
import Boolean from './widget/Boolean';
import Number from './widget/number/Number';
import Range from './widget/number/Range';

import Text from './widget/string/Text';
import Color from './widget/string/Color';
import DateField from './widget/string/Date';
import EnumText from './widget/string/EnumText';
import Image from './widget/string/Image';

import VariableArray from './widget/array/VariableArray';
import Tuple from './widget/array/Tuple';
import CheckBox from './widget/array/CheckBox';

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
