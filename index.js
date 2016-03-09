var loaderUtils = require("loader-utils");

// query options to ignore from requites
var IGNORE_FROM_REQUIRES = {
  hoistRequires: true // for backwards compatibility
};

module.exports = function (originalSource) {
  this.cacheable && this.cacheable();

  // construct requires
  var query = loaderUtils.parseQuery(this.query);
  var requires = [];
  Object.keys(query).forEach(function(name) {
    if (IGNORE_FROM_REQUIRES[name]) return;
    requires.push("var " + name + " = require('" + query[name] + "');");
  });

  // hoist requires if requested
  // TODO: use esprima instead of regexes to determine requires
  var source = originalSource;
  var lines = source.split(/\r\n?|\n/);
  for (var i = 0, l = lines.length; i < l; ++i) {
    var line = lines[i];
    if (line.trim().length && line[0].match(/[<({\[]/)) {
      break;
    }
  }

  // update requires and source
  requires.push.apply(requires, lines.slice(0,i));
  source = lines.slice(i).join("\n");

  // return output 
  return requires.join("\n") + 
    "\nmodule.exports = function () { return " + source.trim() + " };";
};
