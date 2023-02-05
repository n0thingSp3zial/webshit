const button = document.querySelector(".mainButton")
const chart = document.querySelector(".chart")
let startPage = 0 // 0 - start | 1 - stop | 2 - download/back
const rootEl = document.querySelector(':root')
const valueDisplays = document.querySelectorAll(".num")
const downloadButton = document.querySelector(".downloadButton")
let gestureArray = []
let indexOfGestureArray = 0

button.addEventListener("click", (e) => {
    e.preventDefault()
    button.classList.add("animate")
    setTimeout(() => {
        button.classList.remove("animate")
    }, 600)
    startPage += 1
    if (startPage % 3 === 0) {

        gestureArray = []
        indexOfGestureArray = 0
        valueDisplays.forEach((valueDisplay) => {
            valueDisplay.textContent = '0.00'
        })

        rootEl.style.setProperty('--clr', '#9bff1e')
        button.innerText = 'start'
        rootEl.style.setProperty('--offset', '0px')
        chart.style.display = 'none'
        downloadButton.style.display = 'none'
        rootEl.style.setProperty('--mrd', '10px')
        rootEl.style.setProperty('--mld', '0px')
        downloadButton.innerHTML = '<i class="fa-solid fa-download"></i>Download'
    } else if (startPage % 3 === 1) {
        rootEl.style.setProperty('--clr', '#ff1867')
        button.innerText = 'stop'
        rootEl.style.setProperty('--offset', Math.floor(document.documentElement.scrollHeight / 4) + 'px')
        chart.style.display = 'block'
        permission()
    } else {
        window.removeEventListener("devicemotion", myListener)
        rootEl.style.setProperty('--clr', '#1867ff')
        button.innerText = 'back'
        downloadButton.style.display = 'block'
    }
})

function myListener(e) {
    valueDisplays.forEach((valueDisplay) => {
        let axis = valueDisplay.getAttribute("data-val")
        if (axis === 'x') {
            valueDisplay.textContent = (Math.round(e.acceleration.x * 100) / 100).toFixed(2) + ''
        } else if (axis === 'y') {
            valueDisplay.textContent = (Math.round(e.acceleration.y * 100) / 100).toFixed(2) + ''
        } else {
            valueDisplay.textContent = (Math.round(e.acceleration.z * 100) / 100).toFixed(2) + ''
        }
        const curObj = {
            'index': indexOfGestureArray++,
            'x_acc': e.acceleration.x,
            'y_acc': e.acceleration.y,
            'z_acc': e.acceleration.z,
            'a_rot': e.rotationRate.alpha,
            'b_rot': e.rotationRate.beta,
            'g_rot': e.rotationRate.gamma
        }
        gestureArray.push(curObj)
    })
}

function permission() {
    if (typeof (DeviceMotionEvent) !== "undefined" && typeof (DeviceMotionEvent.requestPermission) === "function") {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then(response => {
                // (optional) Do something after API prompt dismissed.
                if (response === "granted") {
                    window.addEventListener("devicemotion", myListener)
                }
            })
            .catch(console.error)
    } else {
        alert("DeviceMotionEvent is not defined");
    }
}

//======================================================================================================================

downloadButton.addEventListener('click', (e) => {
    e.preventDefault()
    downloadButton.classList.add("animate")
    setTimeout(() => {
        downloadButton.classList.remove("animate")
    }, 600)

    rootEl.style.setProperty('--mrd', '0px')
    rootEl.style.setProperty('--mld', '10px')
    downloadButton.innerHTML = 'done<i class="fa-solid fa-check"></i>'

    const gesture = JSON.stringify(gestureArray, null, 2)
    const blob = new Blob([gesture], {type: 'application/json'})

    const href = URL.createObjectURL(blob)
    const a = Object.assign(document.createElement('a'),
        {href, style: 'display:none', download: 'myGesture.json'})
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(href)
    a.remove()
})

