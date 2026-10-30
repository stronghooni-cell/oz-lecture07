// DAY 16 비동기처리
// console.log("index.js가 연결됐습니다!!!");

// // 비동기 : 기다리지 않고 실행되는 다음줄
// console.log("이미지 로딩 시작");
// setTimeout(() => console.log("이미지 로딩 완료"), 2000);
// console.log("다른 작업 수행");

// // clearTimeout(timerId) timer 취소
// const setBtn = document.querySelector("#set-btn");
// const cancelBtn = document.querySelector("#cancel-btn");
// const msgEl = document.querySelector("#msg");
// let timeoutId = null;

// setBtn.addEventListener("click", () => {
//   msgEl.textContent = "3초 뒤에 알려 드립니다";
//   timeoutId = setTimeout(() => {
//     msgEl.textContent = "3초가 지났습니다";
//   }, 3000);
// });

// cancelBtn.addEventListener("click", () => {
//   clearTimeout(timeoutId);
//   msgEl.textContent = "알림을 취소했습니다";
// });

// // setInterval - 정해진 시간마다 되풀이
// let count = 0;
// const intervalId = setInterval(() => {
//   count += 1;
//   console.log(`${count}초`);
//   if (count == 5) {
//     clearInterval(intervalId);
//     console.log("멈춤");
//   }
// }, 1000);

// // 콜백함수
// function sayHello(name, callback) {
//   console.log(`안녕 ${name}`);
//   callback();
// }

// sayHello("태민", () => console.log("콜백 실행"));

// // Promise
// const order = new Promise((resolve, reject) => {
//   //   setTimeout(() => resolve("아메리카노가 나왔습니다"), 2000);
//   setTimeout(() => reject("재고가 없습니다"), 2000);
// });
// console.log(order);
// order
//   .then((message) => {
//     console.log(message);
//     console.log(order);
//   })
//   .catch((error) => {
//     console.log(error);
//     console.log(order);
//   });

// async await : Promise가 끝나야 다음줄 실행
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function makeCoffee() {
  console.log("주문");
  await wait(1000);
  console.log("1초 - 원두 갈기");
  await wait(1000);
  console.log("2초 - 커피 완성");
}

makeCoffee();

// try catch 오류 처리
async function fetchWithError() {
  try {
    console.log("데이터 패치 시작");
    await new Promise((resolve, reject) => {
      setTimeout(() => reject("에러 발생"), 1000);
    });
    console.log("데이터 패치 종료");
  } catch (err) {
    console.log("에러 : ", err);
  }
}

fetchWithError();