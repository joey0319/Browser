# 1. 브라우저에서 URL을 입력하면 일어나는 순서

# (critical rendering path)

### - construction

#### 1. requests/response : 서버에게 HTML 파일을 요청하고 받게 됨

#### 2. loading : 받아 온 HTML 파일을 한 줄씩 읽어서 

#### 3. scripting : DOM 요소로 변환한다.

#### 4.rendering : DOM과 CCSOM을 만들고 최종적으로 Rendor Tree를 만든다.

### - Operation

#### 5. layout : 각각의 요소들이 어떤 위치에 얼마의 크기로 배치 될지 계산하고

#### 6. painting : 계산한 것들을 바로 브라우저에 그림을 그리는것이 아니라 각각의 요소들을 비트맵 데이터 형태로 변환하고 레이어 단계를 만들어 레이어 별로 페인트를 준비만 해둠. 그렇게 하는 이유는 브라우저가 성능 개선을 위해 스스로 준비하는 것 레이어 단위로 그려 부분적으로 변하는 부분을 변환할 때 효율적임 css will-change 속성은 opacity를 언제든지 변경할 수 있다는 얘기이므로 브라우저는 레이어를 추가해서 opacity가 바뀌면 opacity만 바뀔 수 있도록 준비해둔다. 따라서 will-change 속성값을 남용하면 브라우저가 너무 많은 레이어가 존재하게 되어 브라우저 성능이 안좋아진다.

#### 7. composition : 미리 준비한 레이어를 순서대로 차곡차곡 브라우저에 표기해준다. 레이어는 일종의 층이다. ppt 맨앞으로 오기와 같은 개념



# 2. 랜더링 성능을 올리는 방법

#### 1. 요소들의 개수를 작게만든다. 쓸데없는 태그를 쓰지 않는다

#### 2. 따라서 동적 애니메이션을 구현할 때 rendering path에서 composition만 다시 발생시키는것이 best

#### 3. layout이 다시 일어나게 한다면 worst(애니메이션에 의해 주변 요소들의 크기나 배치가 바뀌는 경우)

