/**
 * @file config edp-webserver
 * @author EFE
 */

/* globals home, redirect, content, empty, autocss, file, less, stylus, proxyNoneExists */


exports.port = 8858;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

var babel = require('babel-core');
const nib = require('nib');

exports.stylus = require('stylus');

exports.getLocations = function () {
    return [
        {
            location: '/empty',
            handler: empty()
        },
        {
            location: /\.css($|\?)/,
            handler: [
                autocss()
            ]
        },
        {
            location: /\.less($|\?)/,
            handler: [
                file(),
                less()
            ]
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus({
                    'use': nib(),
                    'resolve url': true,
                    'resolve url nocheck': true
                })
            ]
        },
        {
            location: function (context) {
                return /^\/(src|example).*?\.js($|\?)/.test(context.url);
            },
            handler: [
                file(),
                function (context) {
                    try {
                        context.content = babel
                            .transform(
                                context.content,
                                {
                                    compact: false,
                                    ast: false,
                                    presets: [
                                        'es2015', 'es2015-loose', 'react', 'stage-1'
                                    ],
                                    plugins: [
                                        'transform-es3-property-literals',
                                        'transform-es3-member-expression-literals'
                                    ],
                                    moduleId: '',
                                    getModuleId: function (filename) {
                                        return filename.replace('src/', '');
                                    }
                                }
                            )
                            .code;
                    }
                    catch (e) {
                        console.error(e.stack);
                        context.status = 500;
                    }
                },
                function amdify(context) {
                    context.content =  ''
                        + 'define(function (require, exports, module) {\n'
                        +     context.content
                        + '\n});';
                }
            ]
        },
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

/* eslint-disable guard-for-in */
exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};
