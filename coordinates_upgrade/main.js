const vertical = document.querySelector('.vertical')
const horizontal = document.querySelector('.horizontal')
const target = document.querySelector('.target')
const tag = document.querySelector('.tag')


// 아래의 주석 코드는 마우스가 움직일 때마다 x,y값이 바뀌므로
// layout부터 paint, composition이 다 발생한다.
// 이는 성능에 좋지 않다.
// document.addEventListener('mousemove', (e) => {
//     const x = e.clientX;
//     const y = e.clientY;
//     vertical.style.left = `${x}px`;
//     horizontal.style.top = `${y}px`;
//     target.style.left = `${x}px`;
//     target.style.top = `${y}px`;
//     tag.style.left = `${x}px`;
//     tag.style.top = `${y}px`;
//     tag.innerHTML = `${x}px, ${y}px`
// })

// translate을 통해 개선해보자
// load한 뒤 불러오는 이유는 가끔 load되기 전에 target의 크기를 부르다보면
// load가 되지 않아 못부를 때가 있기 때문
addEventListener('load', () => {
    const targetRect = target.getBoundingClientRect();
    const targetHalfWidth = targetRect.width / 2;
    const targetHalfHeight = targetRect.height / 2;
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
    
        vertical.style.transform = `translateX(${x}px)`;
        horizontal.style.transform = `translateY(${y}px)`;
        target.style.transform = `translate(${x-targetHalfWidth}px, ${y-targetHalfHeight}px)`;
        tag.style.transform = `translate(${x+20}px, ${y+20}px)`;
        tag.innerHTML = `${x}px, ${y}px`;
    
    })
})
