# function-wrap-loader for webpack

[webpack](http://webpack.github.io/) wraps source code with a function and optionally requires requested libs. This can be helpful to provide templated code as a function.

## Installation

`npm install function-wrap-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

The following is an example using this to wrap jsx template files.

Example react template file ```template.jsx```:
```jsx
<div class="testclass"></div>
```

Use the loader after the jsx loader (or babel or something else), and specify ```react``` at ```React```:
```javascript
var template = require("jsx!function-wrap-loader?React=react!./template.jsx");
```

Turns ```template.jsx``` in to:
```javascript
var React = __webpack_require__(10);
module.exports = function () { return React.createElement("div", {class: "testclass"}) };
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)



