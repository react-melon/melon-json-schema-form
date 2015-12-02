define('melon-json-schema-form/index', [
    'require',
    'exports',
    'module',
    './Array',
    './Object',
    './String',
    './Number',
    './factory',
    './Form',
    './Field'
], function (require, exports, module) {
    'use strict';
    require('./Array');
    require('./Object');
    require('./String');
    require('./Number');
    var factory = require('./factory');
    exports.createField = function (schema, value) {
        var type = schema.type;
        var Field = factory.getComponent(type);
        return React.createElement(Field, {
            schema: schema,
            value: value
        });
    };
    exports.Form = require('./Form');
    exports.Field = require('./Field');
});