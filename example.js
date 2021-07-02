Object.assign(document.body.style, {
    background: "#050505",
    color:      "white",
    fontFamily: "sans-serif"
});

document.body.appendChild($div({
    style: {
        textAlign: "center",
        maxWidth:  "700px",
        margin:    "auto"
    },
    content: [
        $h1("elemobj"),

        $p({style: {textAlign: "left"}},
           "Elements object, create javascript DOM elements in a nicer way. " +
           "Kinda like if html and js were blended together. " +
           "It's still js syntax though, we don't speak jsx here."),

        $table({
            style: {
                width:        "100%",
                margin:       "auto",
                background:   "#ffffff11",
                padding:      "10px",
                borderRadius: "10px",
                boxShadow:    "0px 1px #000000ff"
            },
            content: [
                $tr([
                    $td("COUNTER:"),
                    $td($span({id: "counter"}, "0"))
                ]),

                $tr([
                    $td("BUTTON:"),
                    $td($button({
                        onclick: event => ++$get("#counter").innerText,
                        run: it => console.log(`added a new ${it.tagName}`)
                    }, "CLICKY"))
                ])
            ]
        }),

        $br(),
        $a({
            href: "https://github.com/Naheel-Azawy/elemobj",
            style: {float: "right"}
        }, "GitHub")
    ]
}));
