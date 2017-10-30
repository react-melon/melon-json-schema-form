/**
 * @file schema
 * @author leon <ludafa@outlook.com>
 */



export default {
    type: 'object',
    required: [
        'awardList',
        'startTime',
        'endTime',
        'cost',
        'flow',
        'backgroundColor',
        'limits'
    ],
    properties: {
        desc: {
            type: 'string',
            title: '描述'
        },
        sex: {
            'type': 'string',
            'title': '性别',
            'enum': ['male', 'female'],
            'enumNames': ['男', '女'],
            'default': 'male'
        },
        agree: {
            type: 'boolean',
            title: '同意',
            constant: true
        },
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
        },
        takeOffTimeTypes: {
            'title': '起飞时间',
            'type': 'array',
            'items': {
                'type': 'string',
                'enum': ['0', '1', '2', '3'],
                'enumNames': ['早上', '下午', '晚上', '半夜']
            },
            'uniqueItems': true,
            'default': ['0'],
            'minItems': 1,
            'maxItems': 3
        },
        address: {
            title: '地址',
            type: 'array',
            items: [
                {
                    type: 'string',
                    title: '城市',
                    default: '北京'
                },
                {
                    type: 'string',
                    title: '省份',
                    default: '北京'
                },
                {
                    type: 'string',
                    title: '国家',
                    default: '中国'
                }
            ]
        },
        startTime: {
            type: 'string',
            format: 'date',
            title: '抽奖开始时间',
            media: {
                type: 'YYYY-MM-DD hh:mm:ss'
            }
        },
        endTime: {
            type: 'string',
            format: 'date',
            formatMinimum: {$data: '1/startTime'},
            title: '抽奖结束时间',
            media: {
                type: 'YYYY-MM-DD hh:mm:ss'
            }
        },
        limits: {
            title: '中奖限制',
            type: 'object',
            required: [
                'maxWinTimes',
                'maxWinTimesDay',
                'dynamicLimit'
            ],
            properties: {
                maxWinTimes: {
                    type: 'string',
                    format: 'numeric',
                    formatMinimum: '0',
                    title: '一个用户最多中奖次数'
                },
                maxWinTimesDay: {
                    type: 'string',
                    format: 'numeric',
                    formatMinimum: '0',
                    title: '一个用户一天最多中奖次数'
                },
                dynamicLimit: {
                    'title': '动态获取用户每天中奖次数限制',
                    'type': 'boolean',
                    'default': false
                }
            }
        },
        cost: {
            'title': '抽奖消耗的金币数 (0-20)',
            'type': 'string',
            'format': 'numeric',
            'formatMaximum': '20',
            'formatMinimum': '0',
            'step': 1,
            'default': '0'
        },
        noGoldMessage: {
            'title': '金币不足时的提示语',
            'type': 'string',
            'minLength': 1,
            'default': '快来喊"某某加油"，赚取更多金币吧',
            'relations': [{
                cost: 0,
                method: 'bigger'
            }]
        },
        taskSwitch: {
            'type': 'boolean',
            'title': '是否奖抽奖产生的金币明细记入权益商城',
            'default': false,
            'relations': [{
                cost: 0,
                method: 'bigger'
            }]
        },
        awardList: {
            type: 'array',
            title: '抽奖礼物配置',
            minItems: 1,
            items: {
                type: 'object',
                media: {
                    type: 'userrights/lottery-prize'
                },
                required: ['name', 'type', 'dialogImg', 'amount', 'maxWinTimes'],
                oneOf: [
                    {required: ['url']},
                    {required: ['number']},
                    {required: ['goodsInfo']}
                ],
                properties: {
                    name: {
                        type: 'string',
                        minLength: 1,
                        title: '奖品名称'
                    },
                    type: {
                        'type': 'string',
                        'title': '奖品类型',
                        'enum': [
                            'default',
                            'nuomi',
                            'userrights',
                            'coin'
                        ],
                        'enumNames': [
                            '默认奖品',
                            '糯米卷',
                            '权益商品',
                            '语音金币'
                        ],
                        'default': 'default'
                    },
                    dialogImg: {
                        title: '中奖弹窗图片',
                        type: 'string',
                        format: 'uri',
                        media: {
                            type: 'image/*'
                        }
                    },
                    url: {
                        type: 'string',
                        title: '兑奖地址',
                        format: 'uri'
                    },
                    number: {
                        title: '中奖放发金币数量',
                        type: 'string',
                        format: 'numeric',
                        formatMaximum: '20',
                        formatMinimum: '0',
                        step: 1
                    },
                    goodsInfo: {
                        title: '语音权益商品',
                        type: 'string',
                        media: {
                            type: 'userrights/goods'
                        }
                    },
                    amount: {
                        type: 'string',
                        format: 'numeric',
                        title: '奖品数量',
                        formatMinimum: '0'
                    },
                    maxWinTimes: {
                        type: 'string',
                        format: 'numeric',
                        formatMinimum: '0',
                        title: '中奖次数上限'
                    }
                }
            }
        }
    }

};
