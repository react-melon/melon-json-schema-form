/**
 * @file field utils
 * @author leon <ludafa@outlook.com>
 */

export function format(value, props) {

    let schema = props.schema;

    switch (schema.type) {

        case 'string':
            return value == null ? '' : value;

        case 'boolean':
        case 'number':
        case 'integer':
            return value;

        case 'object':
            return value == null || typeof value !== 'object' ? {} : value;

        case 'array':
            return Array.isArray(value) ? value : [];

        default:
            throw new Error(`${schema.type} is not supported`);

    }

}
