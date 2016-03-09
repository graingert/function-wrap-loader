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

Pass ```hoistRequires=true``` to hoist any requires/import statements outside the function wrap. This assumes requires/imports are at the top of the file and uses regexes to identify them. This will be replaced by inspection of the AST in the future. This is useful for requiring components in templates:
 
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
 
### allowLocals

Pass ```allowLocals=true``` to enable local variables before the return statement in a function body. This assumes the return statement starts with a ```<```, ```(```, ```{```, or ```[```. This will be replaced by inspection of the AST in the future. This is useful for enabling local variables in templates.
 
Example react template file ```template.jsx```:
```jsx
import _ from 'lodash';
var a = 1;
<div class="testclass"></div>
```

Use the loader after the jsx loader (or babel or something else), and specify ```react``` at ```React```, as well as ```hoistRequires=true```:
```javascript
var template = require("function-wrap-loader?React=react&hoistRequires=true&useLocals=true!jsx!./template.jsx");
```

Turns ```template.jsx``` in to:
```javascript
var React = __webpack_require__(10);
var _ = __webpack_require__(12);
module.exports = function () { var a = 1; return React.createElement("div", {class: "testclass"}); };
```                                                                                                                                 
 
## License

MIT (http://www.opensource.org/licenses/mit-license.php)

