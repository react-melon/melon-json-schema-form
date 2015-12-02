/**
 * @file schema
 * @author leon(ludafa@outlook.com)
 */

/* eslint-disable */

module.exports = {
    "type": "object",
    "properties": {
        "user": {
            "type": "object",
            "properties": {
                "xxx": {
                    "type": "string",
                    "required": true
                },
                "yyy": {
                    "type": "string",
                    "required": true
                }
            },
            "required": true
        },
        "photos": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "url": {
                        "type": "string",
                        "required": true,
                        "pattern": "^http://"
                    },
                    "width": {
                        "type": "number"
                    },
                    "height": {
                        "type": "number"
                    }
                }
            },
            "uniqueItems": true,
            "minItems": 1,
            "required": true
        },
        "address": {
            "type": "array",
            "required": true,
            "minItems": 4,
            "maxItems": 4,
            "items": [
                {
                    "type": "number"
                },
                {
                    "type": "string"
                },
                {
                    "type": "string"
                },
                {
                    "type": "string"
                }
            ]
        }
    }
};
