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

function createItem (text) {
    const itemRow = document.createElement('li')
    itemRow.setAttribute('class', 'item__row')

    const item = document.createElement('div')
    item.setAttribute('class', 'item')

    const name = document.createElement('span')
    name.setAttribute('class', 'item__name')
    name.innerText = text

    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('class', 'item__delete')
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    // 현재 아래 코드는 item이 만들어질 때마다 삭제 버튼에 이벤트 리스너를
    // 생성하고 있다. -> 비효율 적이다. 이벤트 위임을 이용해 upgrade해보자(shoppingAppUpgrade에서)
    deleteBtn.addEventListener('click', () => {
        items.removeChild(itemRow)
    })

    const itemDivider = document.createElement('div')
    itemDivider.setAttribute('class', 'item__divider')
    
    item.appendChild(name)
    item.appendChild(deleteBtn)

    itemRow.appendChild(item)
    itemRow.appendChild(itemDivider)

    return itemRow
}

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        onAdd();
    }
})
