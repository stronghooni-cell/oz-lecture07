// 실습 01 — 플랭크 타이머 (10초 카운트다운)
const timeEl = document.querySelector("#time");
const msgEl = document.querySelector("#msg");
const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const resetBtn = document.querySelector("#reset-btn");

const START = 10;
let left = START;     // 남은 초
let timerId = null;   // setInterval이 돌려준 번호 — 멈출 때 씁니다

// 1. 남은 시간을 화면에 쓰기
function render() {
  timeEl.textContent = left;
}

// 2. 처음 상태로 되돌리기
function reset() {
  clearInterval(timerId);
  timerId = null;
  left = START;
  msgEl.textContent = "";
  render();
}

// 3. 1초마다 할 일 — 하나 줄이고, 0이 되면 멈추기
function tick() {
  left -= 1;
  render();
  if (left === 0) {
    clearInterval(timerId);
    timerId = null;
    msgEl.textContent = "끝! 3초 뒤 처음으로 돌아갑니다";
    setTimeout(reset, 3000);
  }
}

// 4. 시작 — 이미 돌고 있거나 0초면 또 시작하지 않기
startBtn.addEventListener("click", () => {
  if (timerId !== null || left === 0) {
    return;
  }
  timerId = setInterval(tick, 1000);
});

// 5. 멈춤 — 남은 시간은 그대로
stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
});

// 6. 처음부터
resetBtn.addEventListener("click", reset);