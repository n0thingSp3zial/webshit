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
        permission()
    }
})

function permission() {
    if (typeof (DeviceMotionEvent) !== "undefined" && typeof (DeviceMotionEvent.requestPermission) === "function") {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then(response => {
                // (optional) Do something after API prompt dismissed.
                if (response === "granted") {
                    window.addEventListener("devicemotion", (e) => {
                        // do something for 'e' here.

                        let valueDisplays = document.querySelectorAll(".num")
                        let interval = 100   // 17 = 60Gh

                        valueDisplays.forEach((valueDisplay) => {
                            let axis = valueDisplay.getAttribute("data-val")
                            let counter = setInterval(function () {
                                if (axis === 'x') {
                                    valueDisplay.textContent = e.acceleration.x + ''
                                } else if (axis === 'y') {
                                    valueDisplay.textContent = e.acceleration.y + ''
                                } else {
                                    valueDisplay.textContent = e.acceleration.z + ''
                                }
                                // clearInterval(counter)
                            }, interval)
                        })
                    })
                }
            })
            .catch(console.error)
    } else {
        alert("DeviceMotionEvent is not defined");
    }
}

//===================================

