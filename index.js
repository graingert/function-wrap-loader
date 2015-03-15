var loaderUtils = require("loader-utils");

module.exports = function (source) {
  this.cacheable && this.cacheable();

  // construct requires
  var query = loaderUtils.parseQuery(this.query);
  var requires = [];
  Object.keys(query).forEach(function(name) {
    requires.push("var " + name + " = require('" + query[name] + "');");
  });

  // return output 
  return requires.join("\n") + 
    "\nmodule.exports = function () { return " + source.trim() + " };";
};
