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

function _(selector) {
    return document.querySelector(selector)
}
let x = _('#x')
let y = _('#y')
let z = _('#z')

if (window.DeviceMotionEvent == undefined) {
    alert('no accelerometer')
} else {
    window.addEventListener("devicemotion", accelerometerUpdate, true)
}

function accelerometerUpdate(e) {
    let acc = e.accelerationIncludingGravity
    let aX = acc.x
    let aY = acc.y
    let aZ = acc.z
    x.innerText = aX.toFixed(2)
    y.innerText = aY.toFixed(2)
    z.innerText = aZ.toFixed(2)
}