var intro = {};

intro.javascript = (function () {/*
//CodeMirror theme builder
var i = 0;
function foo(bar){
  var res = /(.*?)/g.match(bar);
  if(res === false){
    i+=5;
  }
  else{
    i*=5;
  }
  return res;
}
var string1 = "this is a string";
var string2 = 'this is another string';
var obj = {
  prop1: true,
  prop2: false
};
alert(obj.prop1);

//random text by Michael Kaminsky
//https://mkaminsky11.github.io
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

intro.html = (function () {/*
<!DOCTYPE html>
<html lang="en">
  <head>

  </head>
  <body>
    <h1>hi there</h1>
    <pre>
      this is a test
      it tests all kinds of cool stuff
    </pre>
    <div style="background-color:#eee">
      <a href="https://mkaminsky11.github.io">go here</a>
    </div>
  </body>
</html>

<!--random text by Michael Kaminsky-->
<!--https://mkaminsky11.github.io-->
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

intro.css = (function () {/*
#myid{
  background-color: #eee;
  border: solid thick red;
}
div{
  background-image: url("https://example.com/png");
}
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

var default_themes = [
"3024-day",
"eclipse",
"neat",
"tomorrow-night-bright",
"3024-night",
"elegant",
"neo",
"tomorrow-night-eighties",
"ambiance-mobile",
"erlang-dark",
"night",
"twilight",
"ambiance",
"lesser-dark",
"paraiso-dark",
"vibrant-ink",
"base16-dark",
"liquibyte",
"paraiso-light",
"xq-dark",
"base16-light",
"mbo",
"pastel-on-dark",
"xq-light",
"blackboard",
"mdn-like",
"rubyblue",
"zenburn",
"cobalt",
"midnight",
"solarized",
"colorforth",
"monokai",
"the-matrix"
];

var params = [
  {
    elem: [".cm-s-?.CodeMirror"],
    attr: ["background","color"]
  },
  {
    elem: [".cm-s-? div.CodeMirror-selected"],
    attr: ["background"]
  },
  {
    elem: [".cm-s-? .CodeMirror-gutters"],
    attr: ["background"]
  },
  {
    elem: [".cm-s-? .CodeMirror-guttermarker"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? .CodeMirror-guttermarker-subtle"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? .CodeMirror-linenumber"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? .CodeMirror-cursor"],
    attr: ["border-color"]
  },
  {
    elem: [".cm-s-? span.cm-comment"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-atom"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-number"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-property"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-attribute"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-keyword"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-string"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-string-2"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-variable"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-variable-2"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-def"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-bracket"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-tag"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-link"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? span.cm-error"],
    attr: ["background","color"]
  },
  {
    elem: [".cm-s-? .CodeMirror-activeline-background"],
    attr: ["color"]
  },
  {
    elem: [".cm-s-? .CodeMirror-matchingbracket"],
    attr: ["color"]
  }
];

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

var not_allowed = [" ", "~", ".", "/", "+", "=", "|", "\\"];
