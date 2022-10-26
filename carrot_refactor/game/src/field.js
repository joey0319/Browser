'use strict';
import * as sound from './sound.js'
const CARROT_SIZE = 80;
export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        // 바인딩 1번 방법 클래스와 함수를 아래와 같이 바인드를 강제로 해준다.
        // 하지만 이 방법은 잘 안쓰고 arrow function으로 해결한다.
        // this.onClick = this.onClick.bind(this)

        // 바인딩 2번 방법 아래와 같이 arrow 사용하기
        // this.field.addEventListener('click', event => this.onClick(event))
        this.field.addEventListener('click', this.onClick)  
    }
    init() {
        this.field.innerHTML = '';
        this._addItem('carrot', this.carrotCount, 'img/carrot.png');
        this._addItem('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }
    
    // 바인딩 3번 방법 onClick 함수를 변수로 놓고 선언하기
    onClick =  event => {
        const target = event.target;
        if (target.matches('.carrot')) {
            // 당근!!
            target.remove();
            sound.playCarrot()
            // 클래스 안의 함수에 콜백으로 무언가를 전달하면
            // 클래스 내부의 정보가 사라져 this라고 써도 클래스라고 인식못한다.
            // this 바인딩을 안해주면 여기서 this는 클래스를 뜻하지 않아서
            // 클래스 안(this)에서 onItemClick을 찾지 못한다.
            this.onItemClick && this.onItemClick('carrot');
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        }
    }

    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}