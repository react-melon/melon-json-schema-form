/**
 * @file resolve defaults from schema
 * @author leon <ludafa@outlook.com>
 */

export default function resolve(schema) {

    switch (schema.type) {

        case 'object':
            return Object
                .keys(schema.properties)
                .reduce(function (value, fieldName) {
                    value[fieldName] = resolve(schema.properties[fieldName]);
                    return value;
                }, {});

        case 'array':
            const items = schema.items;
            return Array.isArray(items)
                ? items.map(resolve)
                : [resolve(items)];

        case 'string':
            return schema.default || '';
        case 'number':
            return schema.default || 0;
        case 'boolean':
            return schema.default || false;

    }

}
