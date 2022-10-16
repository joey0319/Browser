const items = document.querySelector('.items')
const input = document.querySelector('.footer__input')
const addBtn = document.querySelector('.footer__button')
const deleteBtn = document.querySelector('.item__delete')

function onAdd () { 
    // 1. 사용자가 입력한 텍스트를 받아온다.
    const text = input.value;

    // 만약 텍스트가 비어져있다면 추가 안한다.
    if (!text) {
        input.focus();
        return;
    }
    // 2. 텍스트를 받아와서 새로운 아이템을 만든다.(텍스트 + 삭제버튼)
    const item = createItem(text); // createItem이란 함수를 만든다.
    // 3. items 컨테이너 안에 새로 만든 아이템을 추가한다.
    items.appendChild(item);

    // cf 새로 추가된 아이템으로 이동(스크롤의 제일 하단으로 이동!)
    item.scrollIntoView({block: 'center'})

    // 4. 인풋을 초기화 한 후 커서 포커스 되게 한다.
    input.value = ''
    input.focus();
}

let id = 0; // UUID같은 라이브러리를 쓰는 것이 좋다.
function createItem (text) {
    const itemRow = document.createElement('li')
    itemRow.setAttribute('class', 'item__row')
    itemRow.setAttribute('data-id', id)
    itemRow.innerHTML = `
    <div class="item">
        <span class="item__name">${text}</span>
        <button class="item__delete">
            <i class="fas fa-trash-alt" data-id=${id}></i>
        </button>
    </div>
    <div class="item__divider"></div>`;
    id++;
    return itemRow
}



addBtn.addEventListener('click', () => {
    onAdd();
});

//press 이벤트의 종류
// 1. keyup : 사용자가 키보드를 눌렀다가 땔 때 발생
// 2. keydown : 사용자가 키보드를 누르면 발생, 계속 누르고 있어도 한번만 인식
// 3. keypress : 앞으로 지원되지 않을 가능성이 높다.
input.addEventListener('keydown', (e) => {
    // 글자가 생성되는 도중에는 아무것도 하지 않는다.
    if (e.isComposing) {
        return;
    }
    if (e.key === 'Enter') {
        onAdd();
    }
})

items.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    if (id) {
        // .클래스 선택자[조건]을 달때는 ""를 내부에 넣어줘야 한다.
        const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`)
        toBeDeleted.remove();
    }
})
