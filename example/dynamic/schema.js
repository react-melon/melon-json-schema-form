/**
 * @file schema
 * @author leon <ludafa@outlook.com>
 */

export const a = {
    type: 'object',
    properties: {
        desc: {
            type: 'string',
            title: '描述'
        },
        agree: {
            type: 'boolean',
            title: '同意',
            constant: true
        }
    },
    required: ['desc', 'agree']
};

export const b = {
    type: 'object',
    properties: {
        flow: {
            title: '预估每日流量',
            type: 'string',
            format: 'numeric',
            formatMinimum: '0'
        },
        backgroundColor: {
            title: '背景颜色',
            type: 'string',
            format: 'color'
        }
    },
    required: ['flow', 'backgroundColor']
};
