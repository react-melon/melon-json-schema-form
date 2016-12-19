/**
 * @file schema spec
 * @author leon <ludafa@outlook.com>
 */

import {fill} from '../../../src/util/schema';

describe('util/schema.fill', () => {

    it('fill tuple', () => {

        expect(fill(void 0, {
            type: 'array',
            items: [
                {
                    'type': 'string',
                    'default': 'aaa'
                },
                {
                    'type': 'number',
                    'default': 18
                },
                {
                    'type': 'boolean',
                    'default': true
                }
            ]
        })).toEqual(['aaa', 18, true]);

        expect(fill(void 0, {
            'type': 'array',
            'items': [
                {
                    'type': 'string',
                    'default': 'aaa'
                }
            ],
            'default': ['bbb']
        })).toEqual(['bbb']);

        expect(fill(void 0, {
            type: 'array',
            items: [
                {
                    type: 'string'
                }
            ]
        })).toEqual([void 0]);

    });

    it('fill number', () => {

        const schema = {
            'type': 'number',
            'default': 100
        };

        expect(fill(void 0, schema)).toBe(100);
        expect(fill(0, schema)).toBe(0);

    });

    it('fill boolean', () => {

        const schema = {
            'type': 'boolean',
            'default': false
        };

        expect(fill(void 0, schema)).toBe(false);
        expect(fill(true, schema)).toBe(true);
        expect(fill(void 0, {type: 'boolean'})).toBe(void 0);

    });

    it('fill string', () => {

        const schema = {
            'type': 'string',
            'default': 'aaa'
        };

        expect(fill(void 0, schema)).toBe('aaa');
        expect(fill('bbb', schema)).toBe('bbb');
        expect(fill(void 0, {type: 'string'})).toBe(void 0);

    });

    it('fill object', () => {

        expect(fill(void 0, {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                }
            }
        })).toEqual({});

        expect(fill(void 0, {
            type: 'object',
            properties: {
                name: {
                    'type': 'string',
                    'default': 'aaa'
                }
            }
        })).toEqual({
            name: 'aaa'
        });

        expect(fill(void 0, {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                }
            },
            required: ['name']
        })).toEqual({
            name: void 0
        });

        expect(fill({}, {
            'type': 'object',
            'properties': {
                name: {
                    'type': 'string',
                    'default': 'aaa'
                },
                age: {
                    'type': 'number',
                    'default': 18
                }
            },
            'default': {
                name: 'bbb'
            }
        })).toEqual({
            name: 'aaa',
            age: 18
        });

        expect(fill(void 0, {
            'type': 'object',
            'properties': {
                name: {
                    type: 'string'
                }
            },
            'required': ['name'],
            'default': {
                name: 'bbb'
            }
        })).toEqual({
            name: 'bbb'
        });

    });

    it('fill array', () => {

        expect(fill(void 0, {
            type: 'array',
            items: {
                type: 'string'
            }
        })).toEqual([]);

        expect(fill(void 0, {
            'type': 'array',
            'items': {
                'type': 'string',
                'default': 'aaa'
            },
            'default': [void 0, void 0]
        })).toEqual(['aaa', 'aaa']);

        expect(fill([void 0], {
            'type': 'array',
            'items': {
                'type': 'string',
                'default': 'aaa'
            },
            'default': [void 0, void 0]
        })).toEqual(['aaa']);

    });

});
