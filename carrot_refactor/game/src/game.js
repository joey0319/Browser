'use strict'
import * as sound from './sound.js'
import Field from './field.js';

export const Reason = Object.freeze({
    win:'win',
    lose:'lose',
    cancel:'cancel'
});

// Builder pattern
export class GameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this; // 클래스 자체를 리턴한다.
    }
    carrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    bugCount(num) {
        this.bugCount = num;
        return this;
    }
    // build 함수를 실행하면 게임이 만들어짐
    build() {
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        )
    }
}


// Game이라는 클래스는 export(외부에 공개를 안한다.)
// 그대신 game을 생성할 수 있는 GameBuilder 클래스를 만든다.
class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop();
            } else {
                this.start();
            }
        });

        this.timerIndicator = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener((item) => {
            this.onItemClick(item);
        })

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListner(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start = () => {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground()
    }
    
    stop = () => {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.playAlert()
        sound.stopBackground()
        this.onGameStop && this.onGameStop(Reason.cancel);
    }

    finish = (win) => {
        this.started = false;
        this.hideGameButton();
        if (win) {
            sound.playWin()
        } else {
            sound.playBug()
        }
        this.stopGameTimer();
        sound.stopBackground()
        this.onGameStop && this.onGameStop(win?Reason.win:Reason.lose);
    }

    // 이렇게 콜백으로 전달 받은 함수에 this 바인딩을 하려면
    // 변수로서 함수를 정의하자
    onItemClick = item => {
        // 바인딩 안해주면 this.started에서 this를 알아먹지를 못함
        // this가 바인딩이 안되면 this가 클래스라는 것을 모름
        if (!this.started) {
            return;
        }
    
        if (item == 'carrot') {
            this.score++;
            this.updateScoreBoard();
            if (this.score == this.carrotCount) {
            this.finish(true)
            }
        } else if (item === 'bug') {
            this.finish(false);
        }
    }

    initGame() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    }
    
    showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    
    hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
    }
    
    showTimerAndScore() {
        this.timerIndicator.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
            clearInterval(this.timer);
            this.finish(this.score === this.carrotCount);
            return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    
    stopGameTimer() {
        clearInterval(this.timer);
    }
    
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
    }
    
    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }
}
