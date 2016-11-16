/**
 * @file webpack 开发配置
 * @author chenxiao07 <chenxiao07@baidu.com>
 */

'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const config = Object.assign({}, require('./webpack.common'), {

    entry: {
        // configure: [
        //     'webpack-hot-middleware/client',
        //     'webpack/hot/only-dev-server',
        //     path.join(__dirname, '../example/configure/main.js')
        // ],
        simple: [
            'webpack-hot-middleware/client',
            'webpack/hot/only-dev-server',
            path.join(__dirname, '../example/simple/index.js')
        ]
    },

    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: [
                'react-hot',
                'babel?cacheDirectory'
            ],
            exclude: [
                /node_modules/
            ]
        }, {
            test: /\.styl$/,
            loaders: ['style', 'css', 'stylus?paths=node_modules&resolve url']
        }, {
            test: /\.(svg|eot|ttf|woff|jpg|png)(\?.*)?$/,
            loader: 'file?name=asset/[name].[ext]'
        }, {
            test: /\.json(\?.*)?$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    },

    output: {
        path: path.resolve(__dirname, '../asset'),
        publicPath: '/',
        filename: '[name].js'
    },

    cache: false,

    debug: true,

    devtool: 'eval-source-map',

    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('../asset/inf-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('../asset/hot-manifest.json')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     chunks: ['configure'],
        //     templateContent: (function () {
        //         return fs
        //             .readFileSync(
        //                 path.join(__dirname, '../example/configure/index.html'),
        //                 'utf8'
        //             )
        //             .replace(/<!--@inject=([\w._-]+)-->/ig, function ($0, $1) {
        //                 return `<script src="${$1}"></script>`;
        //             });
        //     })(),
        //     filename: path.resolve(__dirname, '../asset/configure.html'),
        //     alwaysWriteToDisk: true
        // }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['simple'],
            templateContent: (function () {
                return fs
                    .readFileSync(
                        path.join(__dirname, '../example/simple/index.html'),
                        'utf8'
                    )
                    .replace(/<!--@inject=([\w._-]+)-->/ig, function ($0, $1) {
                        return `<script src="${$1}"></script>`;
                    });
            })(),
            filename: path.resolve(__dirname, '../asset/index.html'),
            alwaysWriteToDisk: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/),
        new webpack.IgnorePlugin(/locale/, /moment/)
    ]

});


module.exports = config;
