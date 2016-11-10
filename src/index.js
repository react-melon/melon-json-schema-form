/**
 * @file melon-json-schema-form
 * @author leon(ludafa@outlook.com)
 */

import Form from './Form';
import Field from './Field';

import ObjectField from './Object';
import Boolean from './Boolean';
import Number from './number/Number';
import Range from './number/Range';

import Text from './string/Text';
import Color from './string/Color';
import DateField from './string/Date';
import EnumText from './string/EnumText';
import Image from './string/Image';

import VariableArray from './array/VariableArray';
import Tuple from './array/Tuple';
import CheckBox from './array/CheckBox';

import resolveDefaults from './util/resolveDefaults';
import * as pointer from './pointer';

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
