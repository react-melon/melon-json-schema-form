/**
 * @file dev server
 * @author leon <lupengyu@baidu.com>
 */

const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.dev.js');

const compiler = webpack(config);

const app = express();

const middleware = webpackDevMiddleware(compiler, {
    noInfo: false,
    quiet: false,
    publicPath: '/',
    path: path.join(__dirname, '../asset'),
    historyApiFallback: true,
    stats: {
        colors: true
    }
});

app.use(middleware);

app.use(webpackHotMiddleware(compiler));

const fs = middleware.fileSystem;

app.get(/\.dll\.js$/, (req, res) => {
    const filename = req.path.replace(/^\//, '');
    res.sendFile(path.join(__dirname, '../asset', filename));
});

app.get('/', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, req.path), (err, file) => {
        if (err) {
            res.sendStatus(404);
        }
        else {
            res.send(file.toString());
        }
    });
});

const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log(`dev server start: http://localhost:${port}`);
});
