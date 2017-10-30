/**
 * @file webpack 开发配置
 * @author chenxiao07 <chenxiao07@baidu.com>
 */

'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const pages = [
    // 'dynamic',
    'simple'
];

const config = {

    entry: {
        index: path.join(__dirname, '../example/simple/index.js')
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
                loader: ExtractTextPlugin.extract([
                    'css',
                    'stylus?paths=node_modules&resolve url&include css'
                ])
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

    devtool: 'eval-source-map',

    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('../asset/inf-manifest.json')
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../example/simple/index.html')
        }),
        new AddAssetHtmlPlugin({
            filepath: require.resolve('../asset/inf.dll'),
            includeSourcemap: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        }),
        new ExtractTextPlugin('styles.css')
    ],
    devServer: {
        port: 8080
    }
};

console.log(require.resolve('../asset/inf.dll'));

module.exports = config;
