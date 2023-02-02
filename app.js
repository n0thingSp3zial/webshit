const button = document.querySelector(".mainButton")
const chart = document.querySelector(".chart")
let startPage = true
const rootEl = document.querySelector(':root')

button.addEventListener("click", (e) => {
    e.preventDefault
    button.classList.add("animate")
    setTimeout(() => {
        button.classList.remove("animate")
    }, 600)

    startPage = !startPage
    if (startPage) {
        rootEl.style.setProperty('--clr', '#9bff1e')
        button.innerText = 'start'
        rootEl.style.setProperty('--offset', '0px')
        chart.style.display = 'none'
    } else {
        rootEl.style.setProperty('--clr', '#ff1867')
        button.innerText = 'stop'
        rootEl.style.setProperty('--offset', Math.floor(document.documentElement.scrollHeight / 4) + 'px')
        chart.style.display = 'block'
    }
})