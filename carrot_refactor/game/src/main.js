'use strict';
import PopUp from './popup.js'
import { GameBuilder, Reason } from './game.js';


const gameFinishBanner = new PopUp();
// 빌더 클래스에서 return this를 통해 클래스 자체를 리턴해줬으므로
// 아래와 같이 체이닝이 가능하다.
// 이렇게 코드를 작성하면 어떤값을 우리가 뭘로 설정하는지 한눈에 알 수 있다.
const game = new GameBuilder()
.gameDuration(5)
.carrotCount(3)
.bugCount(3)
.build()

// reason을 문자열로 받으면 좋지 않다.
// 개발하면서 오타가 한글자만 나도 정상적으로 실행되지 않기 때문에
game.setGameStopListner((reason)=>{
  console.log(reason)
  let message;
  switch(reason) {
    case Reason.cancel:
      message = 'REPLAY❓'
      break;
      case Reason.win:
        message = 'YOU WON 🎉'
        break;
      case Reason.lose:
        message = 'YOU LOST 💩'
        break;
        default:
          throw new Error('not valid reason')
  }
  gameFinishBanner.showWithText(message)
})

// gameFinishBanner에 setClickListner함수를 실행한다.
// setClickListner 함수는 startGame을 받아서
// PopUp 클래스의 onClick 멤버변수에 startGame함수를 할당한다.
// 그 뒤 PopUp 클래스의 PopUpRefresh가 클릭되면 이벤트 리스너에 의해
// 주어진 콜백 this.onClick 즉 startGame이 호출되고 hide()함수가 실행된다.
gameFinishBanner.setClickListener(()=>{
  game.start();
})
