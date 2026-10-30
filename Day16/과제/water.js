// 오늘 마신 물 기록 — 목표를 채우면 글자가 초록색으로 바뀝니다
const goalSelect = document.querySelector("#goal");
const statusEl = document.querySelector("#status");
const plusBtn = document.querySelector("#plus-btn");
const resetBtn = document.querySelector("#reset-btn");
let cups = 0;

// 1. 지금 상태를 화면에 쓰기
function render() {
  // select의 값은 글자라서 Number로 숫자로 바꿉니다
  const goal = Number(goalSelect.value);
  statusEl.textContent = `${cups}잔 / 목표 ${goal}잔`;
  if (cups >= goal) {
    statusEl.classList.add("done");
  } else {
    statusEl.classList.remove("done");
  }
}

// 2. 한 잔 마셨어요 — 누를 때마다 1 늘리기
plusBtn.addEventListener("click", () => {
  cups += 1;
  render();
});

// 3. 처음부터 — 0으로 되돌리기
resetBtn.addEventListener("click", () => {
  cups = 0;
  render();
});

// 4. 목표를 바꾸면 다시 쓰기
goalSelect.addEventListener("change", () => {
  render();
});