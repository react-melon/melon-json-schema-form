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

const pages = ['simple', 'dynamic'];

const config = {

    entry: pages.reduce(
        (conf, name) => {
            conf[name] = path.join(__dirname, `../example/${name}/index.js`);
            return conf;
        },
        {}
    ),

    resolve: {
        alias: {
            'melon-form': path.join(__dirname, '../node_modules/melon-form/src/index.js')
        },
        fallback: path.join(__dirname, 'node_modules')
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: [
                    'babel?cacheDirectory'
                ],
                exclude: [
                    /node_modules\/(?!(melon-form)\/).*/
                ]
            },
            {
                test: /\.styl$/,
                loaders: ['style', 'css', 'stylus?paths=node_modules&resolve url']
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2|jpg|png)(\?.*)?$/,
                loader: 'file?name=asset/[name].[ext]'
            },
            {
                test: /\.json(\?.*)?$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
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
        new webpack.optimize.OccurenceOrderPlugin(),
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        }),
        new HtmlWebpackHarddiskPlugin()
    ]

};

module.exports = config;
