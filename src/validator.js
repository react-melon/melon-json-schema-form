/**
 * @file 默认校验器
 * @author leon <ludafa@outlook.com>
 */

import Ajv from 'ajv';

const validator = new Ajv({
    allErrors: true,
    v5: true,
    coerceTypes: true
});

validator.addFormat('color', /^#[0-9a-f]{6}$/i);

export default validator;
