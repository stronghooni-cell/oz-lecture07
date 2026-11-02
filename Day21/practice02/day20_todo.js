// 실습 02 — 새로고침해도 남는 할 일 : 목록은 localStorage, 쓰던 글은 sessionStorage
const TODOS_KEY = "day20-todos";
const DRAFT_KEY = "day20-draft";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const msgEl = document.querySelector("#todo-msg");
const listEl = document.querySelector("#todo-list");
const countEl = document.querySelector("#todo-count");

// 1. 불러오기 — 저장한 것이 없으면 null이라 빈 배열로
let todos = JSON.parse(localStorage.getItem(TODOS_KEY)) || [];

// 2. 저장하기 — 배열을 JSON 글자로 바꿔서
function save() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

// 3. 화면 그리기 — todos 배열을 보고 처음부터 다시
function render() {
  listEl.textContent = "";
  todos.forEach((todo) => {
    const itemEl = document.createElement("li");
    if (todo.done) {
      itemEl.classList.add("done");
    }
    const textEl = document.createElement("span");
    textEl.textContent = todo.text;
    textEl.addEventListener("click", () => toggleTodo(todo.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    itemEl.appendChild(textEl);
    itemEl.appendChild(deleteBtn);
    listEl.appendChild(itemEl);
  });
  const left = todos.filter((todo) => !todo.done).length;
  countEl.textContent = `남은 일 ${left}개`;
}

// 4. 바꾸기 — 배열을 바꾸고, 저장하고, 다시 그리기
function addTodo(text) {
  todos.push({ id: Date.now(), text: text, done: false });
  save();
  render();
}

function toggleTodo(id) {
  const todo = todos.find((item) => item.id === id);
  todo.done = !todo.done;
  save();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((item) => item.id !== id);
  save();
  render();
}

// 5. 쓰던 글 — 이 탭에서만 기억
input.value = sessionStorage.getItem(DRAFT_KEY) || "";
input.addEventListener("input", () => {
  sessionStorage.setItem(DRAFT_KEY, input.value);
});

// 6. 추가하기 (submit) — 비었으면 안내, 넣었으면 쓰던 글 지우기
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") {
    msgEl.textContent = "할 일을 입력해 주세요";
    return;
  }
  msgEl.textContent = "";
  addTodo(text);
  input.value = "";
  sessionStorage.removeItem(DRAFT_KEY);
});

render();
