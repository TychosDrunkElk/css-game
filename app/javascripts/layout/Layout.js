'use strict';

var Brisket = require('brisket');
var BaseView = require('../base/BaseView');
var templates = require("../../build/templates.js");
var hoganAdapter = require("../templating/hoganAdapter");

var Layout = Brisket.Layout.extend({
    templateAdapter: hoganAdapter(templates),

    content: '#content',

    template: 'layout/defaultLayout',

});

module.exports = Layout;
