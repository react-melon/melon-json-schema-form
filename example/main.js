/**
 * @file example/App
 * @author leon(ludafa@outlook.com)
 */

import ReactDOM from 'react-dom';
import React from 'react';
import App from './component/App';
import './main.styl';

import {setUploadHandler} from '../src/index';

/* eslint-disable */
const EXAMPLE_IMAGE_URL = 'http://react-melon.github.io/melon/asset/common/img/melon-logo.ffb5dd37.png';
/* eslint-enable */

function uploadHandler() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(EXAMPLE_IMAGE_URL);
        }, 2000);
    });
}

setUploadHandler(uploadHandler);

function init() {
    ReactDOM.render(<App />, document.querySelector('#app'));
}

init();
