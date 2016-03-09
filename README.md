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
var template = require("function-wrap-loader?React=react!jsx!./template.jsx");
```

Turns ```template.jsx``` in to:
```javascript
var React = __webpack_require__(10);
module.exports = function () { return React.createElement("div", {class: "testclass"}) };
```

### hoistRequires

This option is deprecated. Every before the first line that starts with a ```<```, ```(```, ```{```, or ```[``` will be hoisted outside of the function wrap.
 
Example react template file ```template.jsx```:
```jsx
import _ from 'lodash';
var __ = require('underscore');

<div class="testclass"></div>
```

Use the loader after the jsx loader (or babel or something else), and specify ```react``` at ```React```, as well as ```hoistRequires=true```:
```javascript
var template = require("function-wrap-loader?React=react&hoistRequires=true!jsx!./template.jsx");
```

Turns ```template.jsx``` in to:
```javascript
var React = __webpack_require__(10);
var _ = __webpack_require__(12);
var __ = __webpack_require__(13);

module.exports = function () { return React.createElement("div", {class: "testclass"}) };
```                                                                                                                                 

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

