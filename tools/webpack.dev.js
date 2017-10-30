/**
 * @file webpack 开发配置
 * @author chenxiao07 <chenxiao07@baidu.com>
 */

'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const pages = [
    // 'dynamic',
    'simple'
];

const config = {

    entry: pages.reduce(
        (conf, name) => {
            conf[name] = [
                'react-hot-loader/patch',
                path.join(__dirname, `../example/${name}/index.js`)
            ];
            return conf;
        },
        {}
    ),

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'stylus-loader',
                        options: {
                            'paths': [
                                path.join(__dirname, '../node_modules')
                            ],
                            'resolve url': true,
                            'include css': true
                        }
                    }
                ]
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2|jpg|png)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'asset/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.json(\?.*)?$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    output: {
        path: path.resolve(__dirname, '../asset'),
        publicPath: '/',
        filename: '[name].js'
    },

    cache: false,

    devtool: 'eval-source-map',

    devServer: {
        hot: true
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, '..'),
            manifest: require('../asset/inf-manifest.json')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        ...pages.map(page => new HtmlWebpackPlugin({
            inject: true,
            chunks: [page],
            templateContent: (function () {
                return fs
                    .readFileSync(
                        path.join(__dirname, `../example/${page}/index.html`),
                        'utf8'
                    )
                    .replace(/<!--@inject=([\w._-]+)-->/ig, function ($0, $1) {
                        return `<script src="${$1}"></script>`;
                    });
            })(),
            filename: path.resolve(__dirname, `../asset/${page}.html`),
            alwaysWriteToDisk: true
        })),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, '../asset/*.dll.js'),
            includeSourcemap: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        })
    ]

};

module.exports = config;
