/**
 * @file shcema
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

export function fill(obj, schema) {

    let fix = obj;

    switch (schema.type) {

        case 'object':
            fix = typeof fix !== 'object' ? {} : fix;

            return Object
                .keys(schema.properties)
                .reduce(
                    (value, fieldName) => {
                        value[fieldName] = fill(
                            value[fieldName],
                            schema.properties[fieldName]
                        );
                        return value;
                    },
                    {...fix}
                );


        case 'array':

            fix = Array.isArray(fix) ? fix : [];

            const items = schema.items;

            // tulpe
            if (Array.isArray(items)) {
                return items.map((item, index) => fill(fix[index], item));
            }

            // 如果 value 中没有值，那么需要预先填充一个
            if (!fix.length) {
                fix.push(resolveDefaults(items));
            }

            return fix.map(term => fill(term, items));

        case 'string':
            return typeof fix === 'string' ? fix : (schema.default || '');

        case 'number':
            return typeof fix === 'number' ? fix : (schema.default || 0);

        case 'boolean':
            return typeof fix === 'boolean' ? fix : (schema.default || false);

    }

}
