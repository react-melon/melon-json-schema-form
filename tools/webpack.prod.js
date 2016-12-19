/**
 * @file webpack 构建配置
 * @author cxtom <cxtom@163.com>
 * @author ludafa <ludafa@outlook.com
 */

const webpack = require('webpack');

const config = {

    entry: {
        main: ['./src/index.js']
    },

    externals: [
        /^[^.]/
    ],

    output: {
        path: 'lib',
        library: 'melon-json-schema-form',
        libraryTarget: 'umd',
        filename: 'index.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'babel'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.json(\?.*)?$/,
                loader: 'json'
            }
        ]
    },

    devtool: 'source-map',

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
};

module.exports = config;
