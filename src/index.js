/**
 * @file melon-json-schema-form
 * @author leon(ludafa@outlook.com)
 */

require('./Array');
require('./Object');
require('./String');
require('./Number');

const factory = require('./factory');

exports.createField = function (schema, value) {

    const {type} = schema;
    const Field = factory.getComponent(type);

    return (
        <Field schema={schema} value={value} />
    );

};

exports.Form = require('./Form');
exports.Field = require('./Field');
