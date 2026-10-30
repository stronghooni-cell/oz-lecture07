// 실습 02 — 카페 주문 처리
const form = document.querySelector("#order-form");
const menuSelect = document.querySelector("#menu");
const logEl = document.querySelector("#log");
const soldOut = ["바닐라라테"];

// 1. 진행 상황을 목록에 한 줄 더하기
function addLog(text) {
  const itemEl = document.createElement("li");
  itemEl.textContent = text;
  logEl.appendChild(itemEl);
}

// 2. ms만큼 기다렸다가 이행되는 Promise
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// 3. 주문 받기 — 0.5초 뒤 품절이면 reject, 아니면 resolve
function takeOrder(menu) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (soldOut.includes(menu)) {
        reject(`${menu}는 오늘 품절입니다`);
      } else {
        resolve(menu);
      }
    }, 500);
  });
}

// 4. 음료 만들기 — 1.5초 기다린 뒤 완성 글을 돌려줌
async function makeDrink(menu) {
  await wait(1500);
  return `${menu} 완성`;
}

// 5. 주문 처리 — 차례로 기다리고, 실패하면 catch로
async function serve(menu) {
  addLog(`${menu} 주문 접수 중…`);
  try {
    await takeOrder(menu);
    addLog(`${menu} 확인 — 만드는 중…`);
    const drink = await makeDrink(menu);
    addLog(`${drink}! 픽업대로 오세요`);
  } catch (error) {
    addLog(`주문 실패 : ${error}`);
  }
}

// 6. 주문하기 (submit) — DAY 16의 preventDefault
form.addEventListener("submit", (event) => {
  event.preventDefault();
  serve(menuSelect.value);
});
