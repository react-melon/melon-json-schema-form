/**
 * @file test
 * @author leon <ludafa@outlook.com>
 */

const Ajv = require('ajv');
const schema = require('../example/data/schema.json');
const data = require('../example/data/data.json');

const ajv = new Ajv({
    jsonPointers: true,
    allErrors: true
});

const validate = ajv.compile(schema);

const valid = validate(data);

if (!valid) {
    console.log('%o, %o', data, validate.errors);
}
