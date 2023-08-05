let boardSize = 4
let gNums = []
let nextNumber = 1

let startTime;
let isRunning = false;
let timerInterval;

const elNextNumber = document.querySelector('.next-number')
const elTimer = document.querySelector('.timer')

function onInIt() {
    resetGame()
    gNums = shuffleArray(boardSize)
    renderBoard()
    stopTimer()
}

function renderBoard() {
    const elBoard = document.querySelector('.board')
    let strHtml = ''
    for (let i = 0; i < gNums.length; i += boardSize) {
        strHtml += createRowHtml(i)
    }
    elBoard.innerHTML = strHtml
}

function createRowHtml(index) {
    let strHtml = ''
    const row = gNums.slice(index, index + boardSize)
    for (let i = 0; i < row.length; i++) {
        const classAdd = row[i].isMarked ? 'clicked' : ''
        strHtml += `<div class="num-touch ${classAdd}" onclick = "onClick(${index + i},${row[i].num})" > ${row[i].num} </div>`
    }
    return `<div class="row"> ${strHtml} </div>`
}

function onClick(i, num) {
    if (num !== nextNumber) return
    if (!isRunning) startTimer()

    const cell = gNums[i]
    cell.isMarked = true

    nextNumber++

    updateNextNumberText(`Next number: ${nextNumber}`)
    renderBoard()
    checkEndGame();
}

function checkEndGame() {
    if (nextNumber === gNums.length + 1) {
        updateNextNumberText(`Game Finished`)
        stopTimer();
    }
}

function updateNextNumberText(text) {
    elNextNumber.innerText = text
}

function updateTimerText(text) {
    elTimer.innerText = text
}

function changeBoardSize(size) {
    boardSize = size
    onInIt()
}

function newGame() {
    boardSize = 4
    onInIt()
}

function shuffleArray() {
    const nums = generateNumbersUpToN(boardSize)
    for (let i = nums.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums
}

function generateNumbersUpToN(size) {
    const nums = []
    for (let i = 0; i < size * size; i++) {
        nums.push({ num: i + 1, isMarked: false })
    }
    return nums
}

function resetGame() {
    nextNumber = 1
    updateNextNumberText(`Next number: ${nextNumber}`)
    updateTimerText('Click to start Timer')
}

function startTimer() {
    isRunning = true;
    startTime = Date.now() - (startTime || 0);
    timerInterval = setInterval(updateTime, 10);
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startTime = 0
}

function updateTime() {
    var currentTime = Date.now() - startTime;
    var hours = Math.floor(currentTime / 3600000);
    var minutes = Math.floor((currentTime % 3600000) / 60000);
    var seconds = Math.floor((currentTime % 60000) / 1000);
    var milliseconds = Math.floor((currentTime % 1000) / 10);

    var timeDisplay = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds + ":" + (milliseconds < 10 ? "0" : "") + milliseconds;

    updateTimerText(timeDisplay)
}
