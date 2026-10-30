// 실습 01 — 모임 신청 폼 검증하기
const form = document.querySelector("#join-form");
const nameInput = document.querySelector("#name");
const peopleInput = document.querySelector("#people");
const agreeBox = document.querySelector("#agree");
const countEl = document.querySelector("#name-count");
const messageEl = document.querySelector("#message");

// 1. 이름을 칠 때마다 글자 수 보여 주기 (input)
nameInput.addEventListener("input", (event) => {
  countEl.textContent = `${event.target.value.length} / 10자`;
});

// 2. 동의를 바꿀 때마다 Console에 찍기 (change)
agreeBox.addEventListener("change", (event) => {
  console.log("동의", event.target.checked);
});

// 3. 안내 문구 보여 주기 — type은 "error" 또는 "ok"
function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.classList.remove("error", "ok");
  messageEl.classList.add(type);
}

// 4. 신청하기 (submit) — 새로고침을 막고 값 읽기
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const people = Number(peopleInput.value);

  // 5. 검사 — 걸리면 문구를 띄우고 멈추기
  if (name === "") {
    showMessage("이름을 입력해 주세요", "error");
    nameInput.focus();
    return;
  }
  if (people < 1 || people > 4) {
    showMessage("인원은 1명부터 4명까지입니다", "error");
    return;
  }
  if (!agreeBox.checked) {
    showMessage("안내 문자 동의가 필요합니다", "error");
    return;
  }

  // 6. 통과 — 완료 문구를 띄우고 폼 비우기
  showMessage(`${name}님, ${people}명 신청을 받았습니다`, "ok");
  form.reset();
  countEl.textContent = "0 / 10자";
});
