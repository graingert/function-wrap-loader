# function-wrap-loader for webpack

[webpack](http://webpack.github.io/) wraps source code with a function and optionally requires requested libs. This can be helpful to provide templated code as a function.

## Installation

`npm install function-wrap-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Example react template file ```template.jsx```:
```jsx
<div class="testclass"></div>
```

Use the loader...
```javascript
var template = require("function-wrap-loader?React=react!./template.jsx");
```

Turns ```template.jsx``` in to:
```javascript
var React = __webpack_require__(10);
module.exports = function () { return React.createElement("div", {class: "testclass"}) };
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)



