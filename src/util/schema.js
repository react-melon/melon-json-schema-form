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

    const {
        default: def,
        type
    } = schema;

    switch (type) {

        case 'object':

            // 如果不是一个对象，那么生成它
            if (obj == null || typeof obj !== 'object') {

                // 优先使用 schema.default，没有的话提供默认 {}
                obj = def || {};

            }

            const {properties = {}, required = []} = schema;

            return Object
                .keys(properties)
                .reduce(
                    (value, fieldName) => {

                        let defaultValue = fill(
                            value[fieldName],
                            schema.properties[fieldName]
                        );

                        if (
                            // default 没有 null 这个东西
                            defaultValue != null
                            // 是必填选
                            || required.indexOf(fieldName) >= 0
                        ) {
                            value[fieldName] = defaultValue;
                        }

                        return value;
                    },
                    {...obj}
                );


        case 'array':

            if (!Array.isArray(obj)) {
                obj = def || [];
            }

            const items = schema.items;

            // tulpe
            if (Array.isArray(items)) {
                return items.map((item, index) => fill(obj[index], item));
            }

            // variable array
            return obj.map(item => fill(item, items));

        case 'string':
        case 'number':
        case 'boolean':
            return typeof obj === type ? obj : def;

    }

}
