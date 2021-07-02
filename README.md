# elemobj
Elements object, create javascript DOM elements in a nicer way. Kinda like if html and js were blended together. It's still js syntax though, we don't speak jsx here.

## Install
```sh
npm i elemobj
```

## Like?
```javascript
document.body.appendChild($div([
    $button({onclick: e => alert("hi!")}, "hello"),
    $span("world")
]));
```

This is equivalent to what can be written in html as:
```html
<div>
  <button onclick="alert('hi!')">hello</button>
  <span>world</span>
</div>
```

But the way it works internally is more like:
```javascript
let container = document.createElement("div");

let btn = document.createElement("button");
btn.innerHTML = "hello";
btn.onclick = e => alert("hi!");
container.appendChild(btn);

let spn = document.createElement("span");
spn.innerHTML = "world";
container.appendChild(spn);

document.body.appendChild(container);
```

## How?
A single function, `$elem(tag, args, con)`.
- `args` can be "properties" or the "content".
- "properties" include properties of the element and optionally the "content"
- "content" can be an element, html string, or an array of any of both
- "con" is like "content" but preferred for inline cases

## When to use it?
If you're sick of react and others and you really want to build a "web app".

## When not to use it?
If you're building a basic website. Better to stay away from javascript anyway, if you can.

## Slightly longer example?
Check `./index.html` and `./example.js`. Hosted at https://naheel-azawy.github.io/elemobj/.

## License
GPL-3
