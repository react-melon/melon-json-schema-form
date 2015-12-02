/**
 * @file BasicPage
 * @author leon(ludafa@outlook.com)
 */


const {Page} = require('ei');
const BasicView = require('./BasicView');

const BasicPage = Page.extend({

    view: BasicView,

    reducer() {
        return {};
    },

    getInitialState() {
        return {};
    }

});

module.exports = BasicPage;
