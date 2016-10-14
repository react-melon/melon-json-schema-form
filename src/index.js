/**
 * @file melon-json-schema-form
 * @author leon(ludafa@outlook.com)
 */

import Form from './Form';
import Field from './Field';

import ObjectField from './Object';
import Boolean from './Boolean';
import Range from './number/Range';
import Number from './number/Number';
import Color from './string/Color';
import DateField from './string/Date';
import EnumText from './string/EnumText';
import Image from './string/Image';
import Text from './string/Text';
import CheckBox from './array/CheckBox';
import Tuple from './array/Tuple';
import VariableArray from './array/VariableArray';
import resolveDefaults from './util/resolveDefaults';

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
    resolveDefaults
};

// export default from './Form';
