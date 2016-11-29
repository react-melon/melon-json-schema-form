/**
 * @file data path map
 * @author leon <ludafa@outlook.com>
 */

import {walk} from './dataPath';
import startsWith from 'lodash/startsWith';

export function make(obj, prefix = '') {

    const map = {};

    walk(obj, (dataPath, value, isArray) => {

        if (isArray) {
            dataPath = `${prefix}${dataPath}`;
        }
        else if (prefix) {
            dataPath = `${prefix}.${dataPath}`;
        }

        map[dataPath] = value;

    });

    return map;

}

export function remove(map, prefix) {

    return Object
        .keys(map)
        .reduce((nextMap, key) => {

            if (!startsWith(key, prefix)) {
                nextMap[key] = map[key];
            }

            return nextMap;

        }, {});

}

export function move(map, from, to) {

    return Object
        .keys(map)
        .reduce((nextMap, key) => {

            if (startsWith(key, from)) {
                nextMap[key.replace(from, to)] = map[key];
            }
            else {
                nextMap[key] = map[key];
            }

            return nextMap;

        }, {});

}

function add(map, prefix, ...nodes) {

    return nodes
        .reduce((map, node) => {

            return {
                ...map,
                ...make(node, prefix)
            };

        }, map);

}

export function splice(
    map, pointer,
    arr, start, deleteCount, replacements
) {

    const replaceCount = replacements.length;

    // 删除
    for (let i = 0; i < deleteCount; i++) {
        map = remove(map, `${pointer}[${start + i}]`);
    }

    // 移动
    if (deleteCount < replaceCount) {
        for (let i = arr.length - start - deleteCount - 1; i >= 0; i--) {
            let from = start + deleteCount + i;
            let to = start + replacements.length + i;
            map = move(map, `${pointer}[${from}]`, `${pointer}[${to}]`);
        }
    }
    else if (deleteCount > replaceCount) {
        for (
            let i = 0, len = arr.length - start - deleteCount;
            i < len;
            i++
        ) {
            let from = start + deleteCount + i;
            let to = start + replacements.length + i;
            map = move(map, `${pointer}[${from}]`, `${pointer}[${to}]`);
        }
    }


    // 添加
    for (let i = 0, len = replacements.length; i < len; i++) {
        map = add(map, `${pointer}[${start + i}]`, replacements[i]);
    }

    return map;

}

export function swap(map, dataPath, from, to) {

    return Object
        .keys(map)
        .reduce((nextMap, key) => {

            let fromKey = `${dataPath}[${from}]`;
            let toKey = `${dataPath}[${to}]`;

            if (startsWith(key, fromKey)) {
                nextMap[key] = map[key.replace(fromKey, toKey)];
            }
            else if (startsWith(key, toKey)) {
                nextMap[key] = map[key.replace(toKey, fromKey)];
            }
            else {
                nextMap[key] = map[key];
            }

            return nextMap;

        }, {});

}
