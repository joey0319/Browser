'use strict';
const CARROT_SIZE = 80
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 120;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();


const gameBtn = document.querySelector('.game__button')
const gameTimer = document.querySelector('.game__timer')
const gameScore = document.querySelector('.game__score')

const popUp = document.querySelector('.pop-up')
const popUpText = document.querySelector('.pop-up__message')
const popUpRefresh = document.querySelector('.pop-up__refresh')

const carrotSound = new Audio('./sound/carrot_pull.mp3')
const bugSound = new Audio('./sound/bug_pull.mp3')
const bgSound = new Audio('./sound/bg.mp3')
const alertSound = new Audio('./sound/alert.wav')
const winSound = new Audio('./sound/game_win.mp3')


let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', (event)=>{onFieldClick(event)});


gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
})

popUpRefresh.addEventListener('click', ()=>{
    startGame();
    hidePopUP();
})

function startGame() {
    started = true;
    score = 0
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound)
}

function stopGame() {
    started = false;
    stopGameTimer();
    playSound(alertSound)
    stopSound(bgSound)
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if(win) {
        playSound(winSound)
    }
    stopSound(bgSound)
    showPopUpWithText(win ? 'YOU WON🎉' : 'YOU LOST😂');
    stopGameTimer();
}


function showStopButton() {
    const icon = gameBtn.querySelector('.fas')
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play')
    gameBtn.style.visibility = 'visible'
}

function hideGameButton () {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible'
    gameScore.style.visibility = 'visible'
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return
        }
        updateTimerText(--remainingTimeSec);
    }, 1000)
}

function stopGameTimer() {
    // 전역변수로 timer를 설정해 놨기 때문에 undefined에서 바뀐 상태로
    // 전역에 저장 되어 있어서 바로 사용할 수 있다.
    clearInterval(timer)
    hideGameButton();
    showPopUpWithText('REPLAY❓');
}

function updateTimerText(time) {
    const minutes = Math.floor(time/60);
    const sec = time%60;
    gameTimer.innerText = `${minutes} : ${sec}`
}

function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up__hide')
}

function hidePopUP () {
    popUp.classList.add('pop-up__hide')
}

// 게임을 초기화 하는 함수
function initGame () {
    // 먼저 필드를 깨끗이 청소한다.
    field.innerHTML = ''
    gameScore.innerText = CARROT_COUNT;
    // 벌레와 당근을 생성한 뒤 랜덤배치한다.
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(event) {
    // 게임이 시작되지 않으면 아무것도 하지마라
    if(!started) {
        return;
    }
    const target = event.target;
    // css 선택자가 매칭되는지 확인하는 문법
    if(target.matches('.carrot')) {
        target.remove();
        score++;
        playSound(carrotSound)
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            // 당근을 다 찾았다면 이겼으므로 true
            finishGame(true);
        }
    } else if(target.matches('.bug')) {
        // 벌레를 만나면 졌으므로 false
        finishGame(false);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause()
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

// 아이템을 추가하는 함수
function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for (let i=0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        // x1(0)부터 x2(field의 끝)까지 중 랜덤한 수 받아옴
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`
        item.style.top = `${y}px`
        field.appendChild(item)
    }
}

function randomNumber(min, max) {
    return Math.random() * (max-min) + min;
}
