let i = 0
color = ["#ff0000", "#00ff00", "#0000ff"]
document.querySelector("button").addEventListener("click",
    function() {
    i = i < color.length ? ++i : 0
    document.querySelector("body").style.background = color[i]
    }
)