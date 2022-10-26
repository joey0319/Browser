'use strict';

// 클래스를 외부로 노출시키는 export default
export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh'); 
        this.popUpRefresh.addEventListener('click', ()=>{
            this.onClick && this.onClick();
            this.hide();
        })
    }
    setClickListener(onClick) {
        this.onClick = onClick;
    }

    hide() {
        this.popUp.classList.add('pop-up--hide')
    }

    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }
}