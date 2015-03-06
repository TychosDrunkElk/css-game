var Hogan = require('hogan.js');

var t = {
  /* jshint ignore:start */
  'home/home' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<h1>CSS Game</h1>");t.b("\n");t.b("\n" + i);t.b("<p class=\"alert alert-info\">");t.b("\n" + i);t.b("    Write CSS and HTML to match the mock image below! click capture to see your result, and compare to get your score (The higher the better)");t.b("\n" + i);t.b("</p>");t.b("\n" + i);t.b("<div class=\"to-match\">");t.b("\n" + i);t.b("    <h2>Match this mock!</h2>");t.b("\n" + i);t.b("    <img class=\"mock\" src=\"");t.b(t.v(t.f("image",c,p,0)));t.b("\"/>");t.b("\n" + i);t.b("    <canvas class=\"mock-image\"></canvas>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"controls\">");t.b("\n" + i);t.b("    <a href=\"\" class=\"btn btn-primary snippet-capture\">Capture!</a>");t.b("\n" + i);t.b("    <a href=\"\" class=\"btn btn-success compare\">Compare!</a>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"output\">");t.b("\n" + i);t.b("    <iframe class=\"snippet-output\" width=\"200\" height=\"200\"></iframe>");t.b("\n" + i);t.b("    <canvas class=\"snippet-image\"></canvas>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"css-code\">");t.b("\n" + i);t.b("    <label class=\"css-label\">css</label>");t.b("\n" + i);t.b("    <textarea class=\"css\" rows=\"10\" cols=\"50\"></textarea>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"html-code\">");t.b("\n" + i);t.b("    <label class=\"html-label\">html</label>");t.b("\n" + i);t.b("    <textarea class=\"html\" rows=\"10\" cols=\"50\"><!-- HTML Here --></textarea>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n");return t.fl(); },partials: {}, subs: {  }}),
  'layout/defaultLayout' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!DOCTYPE html>");t.b("\n" + i);t.b("<html>");t.b("\n" + i);t.b("<head>");t.b("\n" + i);t.b("    <link href=\"/stylesheets/application.css\" media=\"all\" rel=\"stylesheet\" type=\"text/css\">");t.b("\n" + i);t.b("    <link href=\"/lib/codemirror/codemirror.css\" media=\"all\" rel=\"stylesheet\" type=\"text/css\">");t.b("\n" + i);t.b("    <meta charset=\"utf-8\">");t.b("\n" + i);t.b("    <script src=\"/lib/canvas-to-blob.js\"></script>");t.b("\n" + i);t.b("    <script src=\"/lib/resemble.js\"></script>");t.b("\n" + i);t.b("    <script src=\"/lib/codemirror/codemirror-compressed.js\"></script>");t.b("\n" + i);t.b("</head>");t.b("\n" + i);t.b("<body>");t.b("\n" + i);t.b("    <div id=\"content\">");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <script type=\"text/javascript\" src=\"/javascripts/application.js\"></script>");t.b("\n" + i);t.b("</body>");t.b("\n" + i);t.b("</html>");return t.fl(); },partials: {}, subs: {  }})
  /* jshint ignore:end */
},
r = function(n) {
  var tn = t[n];
  return function(c, p, i) {
    return tn.render(c, p || t, i);
  };
};
module.exports = {
  templates : t,
  'home/home' : r('home/home'),
  'layout/defaultLayout' : r('layout/defaultLayout')
};