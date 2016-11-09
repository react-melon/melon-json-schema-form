/**
 * @file get sorted keys
 * @author leon <ludafa@outlook.com>
 */

export function getOrderedKeys(obj, order = ['*']) {

    let keys = Object.keys(obj);

    let map = order.reduce(function (map, key) {
        map[key] = true;
        return map;
    }, {});

    let rest = keys.filter(function (key) {
        return !map[key];
    });

    let sortedKeys = order.reduce(function (result, key) {

        if (key === '*') {
            result = [...result, ...rest];
        }
        else {
            result.push(key);
        }

        return result;

    }, []);

    if (sortedKeys.length !== keys.length) {
        throw new Error('uiSchema order list must contain all the properties');
    }

    return sortedKeys;

}
