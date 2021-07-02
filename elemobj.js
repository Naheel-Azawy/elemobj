/* Copyright 2021-present Naheel Azawy.  All rights reserved.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// `args` can be "properties" or the "content"
// "properties" include properties of the element and optionally the "content"
// "content" can be an element, html string, or an array of any of both
// "con" is like "content" but preferred for inline cases
function $elem(tag, args, con) {
    function pushstuff(parent, stuff) {
        let children;
        if (Array.isArray(stuff)) {
            children = stuff;
        } else {
            children = [stuff];
        }
        for (let child of children) {
            if (typeof child == "string") {
                parent.innerHTML += child;
            } else if (child instanceof Element) {
                parent.appendChild(child);
            } else {
                throw new Error("Unknown child type");
            }
        }
    }

    let elem = document.createElement(tag);

    if (args) {
        try {
            // assume args are the content
            pushstuff(elem, args);
        } catch (e) {
            // assume args are the properties
            if (e.message == "Unknown child type") {
                // extract special props
                let content = args.content;
                let style = args.style;
                let run = args.run;
                delete args.content;
                delete args.style;

                for (let prop in args) {
                    elem[prop] = args[prop];
                }

                if (content) {
                    pushstuff(elem, content);
                }

                if (con) {
                    pushstuff(elem, con);
                }

                if (style) {
                    if (typeof style == "object") {
                        Object.assign(elem.style, style);
                    } else {
                        elem.style = style;
                    }
                }

                if (run) {
                    run(elem);
                }
            } else {
                throw e;
            }
        }
    }
    return elem;
}

function $get(q) {
    if (q[0] == '#') {
        return document.getElementById(q.substring(1));
    } else if (q[0] == '.') {
        return document.getElementsByClassName(q.substring(1));
    } else {
        return document.getElementsByTagName(q);
    }
}

const elemobj = {
    $elem: $elem,
    $get: $get
};

for (let tag of
     // https://www.w3schools.com/TAGs/
     ["a", "abbr", "acronym", "address", "applet", "area",
      "article", "aside", "audio", "b", "base", "basefont",
      "bdi", "bdo", "big", "blockquote", "body", "br", "button",
      "canvas", "caption", "center", "cite", "code", "col",
      "colgroup", "data", "datalist", "dd", "del", "details",
      "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed",
      "fieldset", "figcaption", "figure", "font", "footer",
      "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5",
      "h6", "head", "header", "hr", "html", "i", "iframe", "img",
      "input", "ins", "kbd", "label", "legend", "li", "link",
      "main", "map", "mark", "meta", "meter", "nav", "noframes",
      "object", "ol", "optgroup", "option", "output", "p",
      "param", "picture", "pre", "progress", "q", "rp", "rt",
      "ruby", "s", "samp", "script", "section", "select", "small",
      "source", "span", "strike", "strong", "style", "sub",
      "summary", "sup", "svg", "table", "tbody", "td", "template",
      "textarea", "tfoot", "th", "thead", "time", "title", "tr",
      "track", "tt", "u", "ul", "var", "video", "wbr"]) {
    elemobj["$" + tag] = (args, con) => $elem(tag, args, con);
}

if (typeof globalThis != "undefined") {
    Object.assign(globalThis, elemobj);
}

if (typeof module != "undefined") {
    module.exports = elemobj;
}
