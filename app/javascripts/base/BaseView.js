'use strict';

var Brisket = require('brisket');
var hoganAdapter = require("../templating/hoganAdapter");
var templates = require("../../build/templates.js");

var BaseView = Brisket.View.extend({
    templateAdapter: hoganAdapter(templates)

    // add properties here that you want to expose to all of your Views
});

module.exports = BaseView;
