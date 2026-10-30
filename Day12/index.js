// DAY 12 JavaScript 반복문과 함수
console.log("index.js가 연결됐습니다!!!");

//for 반복문
for(let i=0 i<5; i;;){
    console.log(i);
}

// for 반목문 밖에 변수 선언
let total = 0;
{for (let i = 1; i<=10; i++)
    total +=i;
}
console.log(total);

// z구구단 3단 만들기
for (let i=1; i<=9; i++){
    let dan=3;
    let result = dan*i;
    let message ='${dan} x ${1} = ${result}';
    console.log(message);
// console.log('3 x ${I} = ${3 *i};);
}

//중첩 for 반복문
for(let i=1; i<2; i++) {
    console.log("i 블록 시작");
    console.log("i", i);
    for(let k=1; k<2; k++){
        console.log("K 블록 시작")
        console.log("k", k)
        console.log("K 블록 끝")}
}
console.log(("i 블록 끝"))

// 배열 반복
const fruits =["사과", "바나나", "포도", "딸기"]
for (;et i=0; i<fruits.length; i++){
    console.log(fruits[i]);
}

//while 반복문
let money = 10000;
let cups = 0;
while (money >= 3000){
    money -= 3000;
    cups++;
}
console.log(`남은 돈: ${money}원, 구매한 컵 수 : ${cups}개`);