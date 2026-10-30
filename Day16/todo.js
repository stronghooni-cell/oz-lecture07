// 실습 02 — Todo List 만들기
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const listEl = document.querySelector("#todo-list");
const msgEl = document.querySelector("#todo-msg");
const countEl = document.querySelector("#todo-count");

// 1. 남은 일 개수 쓰기 — 전체에서 끝낸 일을 뺍니다
function updateCount() {
  const total = document.querySelectorAll("#todo-list li").length;
  const done = document.querySelectorAll("#todo-list .done").length;
  countEl.textContent = `남은 일 ${total - done}개`;
}

// 2. 할 일 하나로 li 만들기
function createTodo(text) {
  const itemEl = document.createElement("li");
  const textEl = document.createElement("span");
  textEl.textContent = text;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";

  // 3. 글자를 누르면 끝낸 일로 바꾸기 (click)
  textEl.addEventListener("click", () => {
    itemEl.classList.toggle("done");
    updateCount();
  });

  // 4. 삭제 버튼을 누르면 목록에서 지우기 (click)
  deleteBtn.addEventListener("click", () => {
    listEl.removeChild(itemEl);
    updateCount();
  });

  itemEl.appendChild(textEl);
  itemEl.appendChild(deleteBtn);
  return itemEl;
}

// 5. 추가하기 (submit) — 새로고침을 막고, 비었으면 안내
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") {
    msgEl.textContent = "할 일을 입력해 주세요";
    return;
  }
  msgEl.textContent = "";
  listEl.appendChild(createTodo(text));
  input.value = "";
  updateCount();
});

// 6. Esc 키를 떼면 입력칸 비우기 (keyup)
input.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    input.value = "";
  }
});
