const button = document.querySelector(".mainButton")
let startPage = true
const rootEl = document.querySelector(':root')

button.addEventListener("click", (e) => {
    e.preventDefault
    button.classList.add("animate")
    setTimeout(() => {
        button.classList.remove("animate")
    }, 600)

    startPage = startPage ? false : true
    if (startPage)
    {
        rootEl.style.setProperty('--clr', '#9bff1e')
        button.innerText = 'start'
        rootEl.style.setProperty('--offset', '0px')
    }
    else
    {
        rootEl.style.setProperty('--clr', '#ff1867')
        button.innerText = 'stop'
        rootEl.style.setProperty('--offset', document.documentElement.scrollHeight / 2 - 100 + 'px')
        console.log(document.documentElement.scrollHeight)
    }
})

