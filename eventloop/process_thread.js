// 프로세스란? 프로그램을 동작하게 하는 최고의 단위
// 컴퓨터 위에서(운영체제 위에서) 연속적으로 실행되고 있는 프로그램
// 각 프로세스는 서로 독립적으로 메모리 위에서 실행되고 있음
// 어플리케이션 하나가 죽어도 다른 어플리케이션은 영향을 받지 않음

// 프로세스 안에는
// 1. 코드 - 프로그램을 실행하기 위한코드
// 2. stack - 함수들이 어떤순서로 실행되어야 하는지에 대한 정보를 저장
// 3. heap - object같은 것을 만들 때 데이터가 저장되는 공간(동적으로 할당되는 변수가 저장됨)
// 4. data - 정적으로 할당되는 변수, static변수가 할당되어진다.

// thread란? 프로그램 안에서 동시에 여러개가 실행될 수 있는 작은 일꾼단위
// 한 프로세스 안에서 프로그램을 실행하는 일꾼(이게 여러개있으면 멀티쓰레드, 한개만 있으면 싱글 쓰레드)
// thread마다 실행순서를 기억해야 되기 때문에 stack이 할당되어 있다.
// 프로세스 내부의 code, heap, data에는 각각의 thread가 공통적으로 접근해서 공통적으로 업데이트가 가능하다.
// 예를들어 음악을 들으면서 사진을 편집할 수 있는 어플리케이션이 있다면
// 각각 음악을 재생하는 thread, 사진을 편집하는 thread가 있고
// 또한 thread는 동시 다발적으로 발생하기 때문에 프로세스가 효율적으로 일을 할 수 있도록 도움을 준다.
// 만약 프로세스가 딱 하나의 일만 할 수 있다면 음악을 듣는동안 사진편집 불가능
// 이렇게 thread들이 각각 들어있기 때문에 동시 수행이 가능하다.
// code, heap, data는 thread끼리 공통적으로 업데이트 하므로
// 멀티 쓰레딩이 어려운 이유는 실행순서가 맞지 않으면 문제가 발생한다.