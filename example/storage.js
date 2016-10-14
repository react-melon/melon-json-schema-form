/**
 * @file local stoarge helper
 * @author leon <ludafa@outlook.com>
 */

import DEFAULT_SCHEMA from './data/schema.json';
import DEFAULT_UI_SCHEMA from './data/uiSchema.json';
import DEFAULT_DATA from './data/data.json';

const PREFIX = 'MELON_JSON_SCHEMA_FORM_EXAMPLE';
const SCHEMA_KEY = `${PREFIX}/SCHEMA`;
const FORM_DATA_KEY = `${PREFIX}/DATA`;
const UI_SCHEMA_KEY = `${PREFIX}/UISCHEMA`;

function get(key, defaults) {
    const data = localStorage.getItem(key) || JSON.stringify(defaults, 0, 2);
    return data;
}

function save(key, value) {
    localStorage.setItem(key, value);
}

export function getSchema() {
    return get(SCHEMA_KEY, DEFAULT_SCHEMA);
}

export function saveSchema(schema) {
    save(SCHEMA_KEY, schema);
}

export function getUISchema() {
    return get(UI_SCHEMA_KEY, DEFAULT_UI_SCHEMA);
}

export function saveUISchema(schema) {
    save(UI_SCHEMA_KEY, schema);
}

export function getFormData() {
    return get(FORM_DATA_KEY, DEFAULT_DATA);
}

export function saveFormData(data) {
    save(FORM_DATA_KEY, data);
}
