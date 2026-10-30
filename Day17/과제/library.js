// 도서 대출 확인 — 1초 동안 서가를 확인한 뒤 결과를 씁니다
const statusEl = document.querySelector("#status");
const princeBtn = document.querySelector("#prince-btn");
const demianBtn = document.querySelector("#demian-btn");
const available = ["어린 왕자", "모모"];   // 지금 빌릴 수 있는 책

// 1. 책이 있는지 확인하는 Promise — 1초 뒤 결과가 나옵니다
function checkBook(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (available.includes(title)) {
        resolve(`${title} — 대출 완료`);
      } else {
        reject(`${title} — 모두 대출 중입니다`);
      }
    }, 1000);
  });
}

// 2. 대출하기 — 결과를 기다렸다가 화면에 씁니다
async function borrow(title) {
  statusEl.textContent = "서가를 확인하는 중…";
  try {
    const message = await checkBook(title);
    statusEl.textContent = message;
  } catch (error) {
    statusEl.textContent = error;
  }
}

// 3. 버튼마다 연결
princeBtn.addEventListener("click", () => borrow("어린 왕자"));
demianBtn.addEventListener("click", () => borrow("데미안"));