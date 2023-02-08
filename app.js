const button = document.querySelector(".mainButton")
const chart = document.querySelector(".chart")
let startPage = 0 // 0 - start | 1 - stop | 2 - download/back
const rootEl = document.querySelector(':root')
const downloadButton = document.querySelector(".downloadButton")
const inputBoxes = document.querySelector(".inputBoxes")
let gestureArray = []
let indexOfGestureArray = 0
const n = 150
let gestureName = ''
let userName = ''


document.getElementById('gestureField').addEventListener('change', e => {
    gestureName = document.getElementById('gestureField').value
})

document.getElementById('nameField').addEventListener('change', e => {
    userName = document.getElementById('nameField').value
})

let x_acc = new Array(n).fill(0)
let y_acc = new Array(n).fill(0)
let z_acc = new Array(n).fill(0)
let a_rot = new Array(n).fill(0)
let b_rot = new Array(n).fill(0)
let g_rot = new Array(n).fill(0)

rootEl.style.setProperty('--chartWidth', Math.floor(document.documentElement.scrollWidth * 0.9) + 'px')

button.addEventListener("click", e => {
    e.preventDefault()
    button.classList.add("animate")
    setTimeout(() => {
        button.classList.remove("animate")
    }, 600)
    startPage += 1
    if (startPage % 3 === 0) {                                                      // START PAGE

        gestureArray = []
        indexOfGestureArray = 0
        x_acc = new Array(n).fill(0)
        y_acc = new Array(n).fill(0)
        z_acc = new Array(n).fill(0)
        a_rot = new Array(n).fill(0)
        b_rot = new Array(n).fill(0)
        g_rot = new Array(n).fill(0)

        rootEl.style.setProperty('--clr', '#c8ff00')
        button.innerText = 'start'
        chart.style.display = 'none'
        inputBoxes.style.display = 'block'
        downloadButton.style.display = 'none'
        rootEl.style.setProperty('--mrd', '10px')
        rootEl.style.setProperty('--mld', '0px')
        downloadButton.innerHTML = '<i class="fa-solid fa-download"></i>Download'
    } else if (startPage % 3 === 1) {                                               // CHARTS PAGE
        rootEl.style.setProperty('--clr', '#ff073a')
        button.innerText = 'stop'
        chart.style.display = 'block'
        inputBoxes.style.display = 'none'
        permission()
    } else {                                                                        // DOWNLOAD PAGE
        window.removeEventListener("devicemotion", myListener)
        rootEl.style.setProperty('--clr', '#04d9ff')
        button.innerText = 'back'
        downloadButton.style.display = 'block'
    }
})

function myListener(e) {
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

    x_acc.shift()
    x_acc.push(curObj.x_acc)
    y_acc.shift()
    y_acc.push(curObj.y_acc)
    z_acc.shift()
    z_acc.push(curObj.z_acc)
    a_rot.shift()
    a_rot.push(curObj.a_rot)
    b_rot.shift()
    b_rot.push(curObj.b_rot)
    g_rot.shift()
    g_rot.push(curObj.g_rot)

    accChart.update('none')
    gyroChart.update('none')
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

downloadButton.addEventListener('click', e => {
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
    const currentDate = new Date();
    const dateTime = '' + currentDate.getFullYear() + "_"
        + (currentDate.getMonth() + 1) + "_"
        + currentDate.getDate() + "@"
        + currentDate.getHours() + "_"
        + currentDate.getMinutes() + "_"
        + currentDate.getSeconds()
    const a = Object.assign(document.createElement('a'),
        {href, style: 'display:none', download: gestureName + '_' + userName + '_' + dateTime + '.json'})
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(href)
    a.remove()
})

//======================================================================================================================

Chart.defaults.font.size = 20
Chart.defaults.font.family = "'Symbol', system-ui"
Chart.defaults.color = '#e0e0e0'

const AccChart = document.getElementById('AccelerationChart')
const GyroChart = document.getElementById('GyroChart')

function createScales(suggested) {
    return {
        x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                display: false,
            },
            suggestedMin: -suggested,
            suggestedMax: suggested
        },
    };
}

const accChart = new Chart(AccChart, {
    type: 'line',
    data: {
        labels: Array(n).join('.').split('.'),
        datasets: [{
            label: 'X Axis',
            data: x_acc,
            fill: false,
            borderColor: '#bc13fe',
            pointRadius: 0
        },
            {
                label: 'Y Axis',
                data: y_acc,
                fill: false,
                borderColor: '#04d9ff',
                pointRadius: 0
            },
            {
                label: 'Z Axis',
                data: z_acc,
                fill: false,
                borderColor: '#c8ff00',
                pointRadius: 0
            }]
    },
    options: {
        scales: createScales(10),
        plugins: {
            title: {
                display: true,
                text: 'Acceleration',
                font: {
                    size: 40
                }
            }
        }
    }
})

const gyroChart = new Chart(GyroChart, {
    type: 'line',
    data: {
        labels: Array(n).join('.').split('.'),
        datasets: [{
            label: 'X Axis',
            data: a_rot,
            fill: false,
            borderColor: '#fe019a',
            pointRadius: 0
        },
            {
                label: 'Y Axis',
                data: b_rot,
                fill: false,
                borderColor: '#7df9ff',
                pointRadius: 0
            },
            {
                label: 'Z Axis',
                data: g_rot,
                fill: false,
                borderColor: '#5555ff',
                pointRadius: 0
            }]
    },
    options: {
        scales: createScales(150),
        plugins: {
            title: {
                display: true,
                text: 'Rotation',
                font: {
                    size: 40
                }
            }
        }
    }
})