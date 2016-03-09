var loaderUtils = require("loader-utils");

// query options to ignore from requites
var IGNORE_FROM_REQUIRES = {
  hoistRequires: true,
  allowLocals: true
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

  var source = originalSource;
  var lines = source.split(/\r\n?|\n/);
  var i = 0;

  // hoist requires if requested
  // TODO: use esprima instead of regexes to determine requires
  var hoistRequires = query.hoistRequires;
  if (hoistRequires !== false || hoistRequires !== 'false') {
    // determine when requires stop
    for (l = lines.length; i < l; ++i) {
      var line = lines[i];
      if (line.trim().length &&  
          !line.match(/^(\s*import\s+.+\s+from\s+|.*require\()/)) {
        break;
      }
    }

    // update requires and source
    requires.push.apply(requires, lines.slice(0, i));
  }

  // determine locals to extract
  var allowLocals = query.allowLocals;
  var locals;
  if (allowLocals !== false || allowLocals !== 'false') {
    var localsStartIndex = i;
    // determine when requires stop
    for (l = lines.length; i < l; ++i) {
      var line = lines[i];
      if (line.trim().length && line[0].match(/[<({\[]/)) {
        break;
      }
    }

    // set locals
    locals = lines.slice(localsStartIndex, i); 
  }

  // return output 
  var body = lines.slice(i).join("\n");
  return requires.join("\n") + 
    "\nmodule.exports = function () {\n" + 
    (locals.length ? locals.join("\n") + "\n" : "") +
    "return " + body.trim() + "\n};";
};
