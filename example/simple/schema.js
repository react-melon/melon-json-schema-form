/**
 * @file schema
 * @author leon <ludafa@outlook.com>
 */

export default {
    type: 'object',
    properties: {
        startTime: {
            type: 'string',
            title: '抽奖开始时间',
            format: 'date',
            description: '自 0 点开始'
        },
        endTime: {
            type: 'string',
            title: '抽奖结束时间',
            format: 'date',
            formatMinimum: {$data: '1/startTime'},
            formatExclusiveMinimum: true,
            description: '至 0 点结束'
        },
        limits: {
            title: '中奖限制',
            type: 'object',
            required: [
                'maxWinTimes',
                'maxWinTimesDay',
                'maxCuidWinTimesDay'
            ],
            properties: {
                maxWinTimes: {
                    type: 'string',
                    format: 'numeric',
                    formatMinimum: '0',
                    title: '每个用户的最多中奖次数(0表示不限制)',
                    default: '0'
                },
                maxWinTimesDay: {
                    type: 'string',
                    format: 'numeric',
                    formatMinimum: '0',
                    title: '每个用户每天最多中奖次数(0表示不限制)',
                    default: '0'
                },
                maxCuidWinTimesDay: {
                    'type': 'string',
                    'format': 'numeric',
                    'default': false,
                    'title': '每个cuid每天获奖次数上线(0表示不限制)',
                    default: '0'
                }
            }
        },
        flowControlNum: {
            title: '每秒抽奖请求上限',
            type: 'string',
            format: 'numeric',
            formatMinimum: '0',
            default: '600'
        },
        timeDiff: {
            title: '请求时间与处理时间允许的diff',
            type: 'string',
            default: '600',
            format: 'numeric'
        },
        badLuck: {
            type: 'array',
            title: '未中奖概率',
            description: '分子为0表示不使用该功能',
            items: [
                {
                    type: 'string',
                    title: '未中奖概率的分子',
                    default: '5',
                    format: 'numeric'
                },
                {
                    type: 'string',
                    title: '未中奖概率的分母',
                    default: '10',
                    format: 'numeric'
                }
            ]
        },
        default: {
            title: '默认奖品',
            description: '中奖失败后，为用户发放指定奖品，再失败就失败了；-1表示没有default功能',
            type: 'string',
            format: 'numeric',
            default: '-1'
        },
        // cost: {
        //     title: '抽奖消耗的金币数 (0-20)',
        //     type: 'string',
        //     format: 'numeric',
        //     formatMinimum: '0',
        //     formatMaximum: '20',
        //     step: 1
        // },
        // noGoldMessage: {
        //     'title': '金币不足时的提示语',
        //     'type': 'string',
        //     'minLength': 1,
        //     'default': '快来喊"某某加油"，赚取更多金币吧',
        //     'relations': [{
        //         cost: 0,
        //         method: 'bigger'
        //     }]
        // },
        // taskSwitch: {
        //     'type': 'boolean',
        //     'title': '是否奖抽奖产生的金币明细记入权益商城',
        //     'default': true,
        //     'relations': [{
        //         cost: 0,
        //         method: 'bigger'
        //     }]
        // },
        awardList: {
            type: 'array',
            title: '抽奖礼物配置',
            items: {
                type: 'object',
                media: {
                    type: 'userrights/lottery-prize'
                },
                required: ['name', 'type', 'dialogImg'],
                oneOf: [
                    {required: ['url', 'amount', 'maxWinTimes']},
                    {required: ['number', 'amount', 'maxWinTimes']},
                    {required: ['goodsInfo', 'amount', 'maxWinTimes']},
                    // {
                    //     properties: {
                    //         type: {
                    //             constant: 'default'
                    //         }
                    //     }
                    // }
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
                            // 'default',
                            'nuomiSeller',
                            'userrights',
                            // 'coin'
                        ],
                        'enumNames': [
                            // '默认奖品',
                            '糯米卷',
                            '权益商品',
                            // '语音金币'
                        ]
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
                    relativeNum: {
                        type: 'string',
                        format: 'numeric',
                        formatMinimum: '0',
                        title: '计算中奖概率'
                    },
                    maxWinTimes: {
                        type: 'string',
                        format: 'numeric',
                        formatMinimum: '0',
                        title: '中奖次数上限',
                        description: '每个用户最多可获得已奖品次数'
                    },
                    maxWinTimesDay: {
                        type: 'string',
                        format: 'numeric',
                        formatMinimum: '0',
                        title: '奖品每日中奖次数上限',
                        description: '所有用户每日可最多获得此奖品次数',
                        default: ''
                    },
                    sourceType: {
                        type: 'string',
                        format: 'numeric',
                        formatMinimum: '0',
                        title: 'sourceType',
                        description: '糯米商家接口所需参数',
                        default: ''
                    },
                    appId: {
                        type: 'string',
                        format: 'numeric',
                        formatMinimum: '0',
                        title: 'appId',
                        description: '糯米商家接口所需参数',
                        default: ''
                    },
                    sync: {
                        type: 'string',
                        title: '兑奖方式',
                        description: '同步兑奖结果更准确，异步兑换性能更好',
                        default: '1',
                        enum: ['0', '1'],
                        enumNames: ['异步兑奖', '同步兑奖']
                    }
                    // number: {
                    //     title: '中奖放发金币数量',
                    //     type: 'string',
                    //     format: 'numeric',
                    //     maximum: 20,
                    //     formatMinimum: '0',
                    //     step: 1,
                    //     relations: [{
                    //         type: 'coin'
                    //     }]
                    // },
                }
            }
        }
    },

    required: [
        'awardList',
        'startTime',
        'endTime',
        'cost',
        'badLuck',
        'default',
        'flowControlNum',
        'timeDiff',
        'limits'
    ]

};
