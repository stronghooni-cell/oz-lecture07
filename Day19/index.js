// DAY 19 고급함수와 고차함수
// console.log("index.js가 연결됐습니다!!!");

// // 클로저 : 함수가 끝난 뒤에도 함수 내의 변수를 기억함
// const x = 1;

// function outer() {
//   const x = 10;
//   const inner = function () {
//     console.log(x);
//   };
//   return inner;
// }

// const innerFunc = outer();
// innerFunc();

// // 카운터 : 누구나 바꾸는 전역변수
// let num = 0;

// const increase = function () {
//   return ++num;
// };

// console.log(increase());
// console.log(increase());
// num = 100; // 의도하지 않은 전연변수 변경
// console.log(increase());

// // 카운터 : 클로저로 숨기고 기억하기
// function makeIncrease() {
//   let num = 0;
//   return function () {
//     return ++num;
//   };
// }
// const increaseC = makeIncrease();
// console.log(increaseC());
// console.log(increaseC());
// console.log(increaseC());

// // this의 쓰임 : function과 arrow function
// const timer = {
//   secondes: 3,
//   start() {
//     setTimeout(function () {
//       console.log("function :", this.secondes);
//       console.log(this);
//     }, 0);
//     setTimeout(() => {
//       console.log("화살표 :", this.secondes);
//       console.log(this);
//     }, 0);
//   },
// };
// timer.start();

// // this의 쓰임 : 이벤트 리스너의 this
// const likeBtn = document.querySelector("#like-btn");

// likeBtn.addEventListener("click", function () {
//   this.textContent = "눌렀어요";
//   console.log("function :", this);
// });

// likeBtn.addEventListener("click", () => {
//   console.log(this);
//   console.log("화살표 :", this === window);
// });

// 기본객체 Math
console.log(Math.round(4.5)); // 반올림
console.log(Math.floor(4.7)); // 내림
console.log(Math.ceil(4.2)); // 올림
console.log(Math.max(72, 95, 58)); // 가장 큰 수
console.log(Math.min(72, 95, 58)); // 가장 작은 수
console.log(Math.abs(-3)); // 절댓값
console.log(Math.PI);
console.log(Math.random());

// 기본객체 Date
const day = new Date();
console.log(day.getFullYear()); // 연도
console.log(day.getMonth() + 1); // 월 0부터 시작
console.log(day.getDate()); // 일
console.log(day.getDay()); // 요일 [0,1,2,3,4,5,6] 일,월,화...토
console.log(day.getHours()); // 시간

// Higer Order Function 고차함수
// const addFunction = (a) => {
//   let first = a;
//   return (b) => {
//     let second = b;
//     return a + b;
//   };
// };

const add = (a) => (b) => a + b;
const add5 = add(5);

console.log(add5);
console.log(add5(10));

function makeMultiple(n) {
  return function (x) {
    return x * n;
  };
}
const double = makeMultiple(2);
const triple = makeMultiple(3);
console.log(double(4), triple(4));

// for와 메서드 이어쓰기
const scores = [72, 95, 58, 88, 64];

// 반복문 - 어떻게 할지를 한단계씩
let total = 0;
for (let i = 0; i < scores.length; i++) {
  const score = scores[i];
  if (score >= 60) total += score;
}
console.log("for :", total);

// method 이어쓰기 - 무엇을 할지를 차례로
const total2 = scores
  .filter((score) => score >= 60)
  .reduce((acc, score) => acc + score, 0);
console.log("method :", total2);