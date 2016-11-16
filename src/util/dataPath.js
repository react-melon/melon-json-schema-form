/**
 * @file data path operation
 * @author leon <ludafa@outlook.com>
 */

import g from 'lodash/get';
import s from 'lodash/set';
// import u from 'react-addons-update';

export function get(obj, path) {
    return g(obj, path.slice(1));
}

export function set(obj, path, value) {
    return s(obj, path.slice(1), value);
}

export function update(obj, path, value) {
    return s(Array.isArray(obj) ? obj.slice() : {...obj}, path, value);
}

export function dict(obj) {

    const map = {};

    walk(obj, (pointer, value) => {
        map[pointer] = value;
    });

    return map;

}

export function compile(tokens) {

    if (!tokens || !tokens.length) {
        return '';
    }

    return tokens
        .map(token => (
            /^\[\d+\]$/.test(token) ? token : `.${token}`
        ))
        .join('');

}

function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

export function walk(obj, iterator) {

    const tokens = [];

    function next(cur) {

        let isCurArray = Array.isArray(cur);

        Object.keys(cur).forEach(key => {

            const value = cur[key];
            const type = getType(value);

            tokens.push(isCurArray ? `[${key}]` : key);

            if (type === 'Object' || type === 'Array') {
                next(value, iterator);
            }
            else {
                iterator(compile(tokens), value);
            }

            tokens.pop();

        });
    }

    next(obj);

}
