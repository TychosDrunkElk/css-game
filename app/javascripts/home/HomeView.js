'use strict';

var BaseView = require('../base/BaseView');
var _ = require('lodash');
var fs = require('fs');

var HomeView = BaseView.extend({
    initialize: function() {
        _.bindAll(this, "updateSnippet", "captureSnippet", "compareResult");

        this.randomlySelectMock();
    },
    
    events: {
        "input textarea": "updateSnippet",
        "blur textarea": "updateSnippet",
        "click .snippet-capture": "captureSnippet",
        "click .compare": "compareResult"
    },
    
    template: 'home/home',

    mock: null,

    snippetBlob: null,

    html: '',
    css: '',

    loadMockCanvas: function() {
        var canvas = this.$('.mock-image').get()[0];
        var context = canvas.getContext('2d');
        var image = this.$('img.mock');
        canvas.width = image.width();
        canvas.height = image.height();
        context.scale(1,1);

        drawImage({
            canvas: canvas,
            image: image.get()[0],
            desh: image.height(),
            desw: image.width()
        });

        image.hide(); 
    },

    onDOM: function() {
        this.loadMockCanvas();

        this.html = CodeMirror.fromTextArea(this.$(".html").get()[0], {
            lineNumbers: true,
            mode: "htmlmixed",
            viewportMargin: Infinity
        });

        this.css = CodeMirror.fromTextArea(this.$(".css").get()[0], {
            lineNumbers: true,
            mode: "css",
            viewportMargin: Infinity
        });
    },

    updateSnippet: function() {
        var $iframe = this.$('.snippet-output');
        var styles = '<style type="text/css">' + this.css.getValue() + '</style>';
        var body = '<body>' + styles + this.html.getValue() + '</body>';
        $iframe.get()[0].contentWindow.document.open();
        $iframe.get()[0].contentWindow.document.write('<html>' + body + '</html>');
    },

    captureSnippet: function() {
        var canvas = this.$('.snippet-image').get()[0];
        var context = canvas.getContext('2d');
        context.scale(1,1);
        canvas.width = 200;
        canvas.height = 200;
        context.clearRect(0, 0, canvas.width, canvas.height);
        var $iframe = this.$('.snippet-output');
        var iframeContent = $iframe.get()[0].contentWindow.document;
        var styles = $iframe.get()[0].contentWindow.getComputedStyle(iframeContent.body, null).cssText;
        var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" text-rendering="optimizeLegibility" spape-rendering="optimizeQuality">' +
                   '<foreignObject width="200" height="200">' +
                   '<html xmlns="http://www.w3.org/1999/xhtml" style="font-size:16px">' +
                   iframeContent.head.outerHTML +
                   iframeContent.body.outerHTML +
                   '</html>' +
                   '</foreignObject>' +
                   '</svg>';

        var DOMURL = window.URL || window.webkitURL || window;

        var img = new Image();
        this.snippetBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        var url = DOMURL.createObjectURL(this.snippetBlob);
        img.src = url;
        img.onload = function () {
            drawImage({
                canvas: canvas,
                image: img
            });
            DOMURL.revokeObjectURL(url);
        }



    },

    randomlySelectMock: function() {
        if (fs.readdirSync) {
            var images = fs.readdirSync(__dirname + '/../../../public/images');
            this.mock = '/images/' + images[0];
        }
    },

    compareResult: function() {
        var home = this;
        home.$('.mock-image').get()[0].toBlob(function(mockBlob) {
            resemble(mockBlob).compareTo(home.snippetBlob).ignoreAntialiasing().onComplete(function(data) {
                console.log(data.getImageDataUrl());
                var score = 100 - data.misMatchPercentage;
                alert("Your score is: " + score + "%");
            }) 
        });
       
    },

    logic: function() {
        return {
            image: this.mock
        }
    }


});
/**
 * Writes an image into a canvas taking into
 * account the backing store pixel ratio and
 * the device pixel ratio.
 *
 * @author Paul Lewis
 * @param {Object} opts The params for drawing an image to the canvas
 */

function drawImage(opts) {

    if(!opts.canvas) {
        throw("A canvas is required");
    }
    if(!opts.image) {
        throw("Image is required");
    }

    // get the canvas and context
    var canvas = opts.canvas,
        context = canvas.getContext('2d'),
        image = opts.image;

    // now default all the dimension info
    var srcx = opts.srcx || 0,
        srcy = opts.srcy || 0,
        srcw = opts.srcw || image.naturalWidth,
        srch = opts.srch || image.naturalHeight,
        desx = opts.desx || srcx,
        desy = opts.desy || srcy,
        desw = opts.desw || srcw,
        desh = opts.desh || srch,
        auto = opts.auto;

    context.scale(1, 1);

    context.drawImage(image, srcx, srcy, srcw, srch, desx, desy, desw, desh);
}

module.exports = HomeView;
