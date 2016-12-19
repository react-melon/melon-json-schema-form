/**
 * @file util 测试用例
 * @author ludafa <ludafa@outlook.com>
 */

import {spliceDataPathMap} from '../../../src/util/spliceDataPathMap';

describe('util', function () {

    it('`spliceDataPathMap` should work', function () {

        expect(typeof spliceDataPathMap === 'function').toBe(true);

        let arr = [{}, {}, {}, {}];
        let map = {
            '.users[0].name': 'ludafa',
            '.users[0].books[1].name': 'ludafa\'s super cook book',
            '.users[1].name': 'metooq',
            '.users[2].name': 'tom',
            '.users[3].name': 'sam'
        };

        console.log('===========================');

        let map1 = spliceDataPathMap(
            map, '.users',
            arr, 1, 1, []
        );

        expect(map1 !== map).toBe(true);
        expect(map['.users[1].name']).toBe('metooq');
        expect(typeof map1 === 'object').toBe(true);
        expect(map1['.users[0].name']).toBe('ludafa');
        expect(map1['.users[1].name']).toBe('tom');
        expect(map1['.users[2].name']).toBe('sam');

        console.log(map1);

        console.log('===========================');

        let map2 = spliceDataPathMap(
            map, '.users',
            arr, 0, 0, [{name: 'little flower'}]
        );

        console.log(map2);

        expect(map2['.users[0].name']).toBe('little flower');
        expect(map2['.users[1].name']).toBe('ludafa');
        expect(map2['.users[2].name']).toBe('metooq');

        console.log('===========================');

        let map3 = spliceDataPathMap(
            map, '.users',
            arr, arr.length, 0, [{name: 'little flower', age: 18}]
        );

        console.log(map3);

        expect(map3['.users[0].name']).toBe('ludafa');
        expect(map3['.users[1].name']).toBe('metooq');
        expect(map3['.users[4].name']).toBe('little flower');

        console.log('===========================');

        let map4 = spliceDataPathMap(
            map, '.users[0].books',
            [{}], 0, 0, [{name: 'test cook book', age: 18}]
        );

        console.log(map4);

        expect(map4['.users[0].name']).toBe('ludafa');
        expect(map4['.users[0].books[0].name']).toBe('test cook book');
        expect(map4['.users[0].books[1].name']).toBe('ludafa\'s super cook book');

    });

});
