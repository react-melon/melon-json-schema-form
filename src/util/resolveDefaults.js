/**
 * @file resolve defaults from schema
 * @author leon <ludafa@outlook.com>
 */

export function resolveDefaults(schema) {

    switch (schema.type) {
        case 'object':
            return Object
                .keys(schema.properties)
                .reduce(function (value, fieldName) {
                    value[fieldName] = resolveDefaults(schema.properties[fieldName]);
                    return value;
                }, {});
        case 'array':
            const items = schema.items;
            return Array.isArray(items)
                ? items.map(resolveDefaults)
                : [resolveDefaults(items)];
        case 'string':
            return schema.default || '';
        case 'number':
            return schema.default || 0;
        case 'boolean':
            return schema.default || false;
    }

}
