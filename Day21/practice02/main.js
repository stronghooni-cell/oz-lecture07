// 실습 02 — 연결 : 할 일 배열을 바꾸고, 저장하고, 다시 그립니다

import { loadTodos, saveTodos, loadDraft, saveDraft, clearDraft } from "./storage.js";
import { formatDate } from "./date.js";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const msgEl = document.querySelector("#todo-msg");
const listEl = document.querySelector("#todo-list");
const countEl = document.querySelector("#todo-count");

// 1. 불러오기 — 저장소에서 꺼내는 일은 storage.js가 합니다
let todos = loadTodos();

// 2. 화면 그리기 — 할 일마다 추가한 날짜를 함께 (id는 추가한 때의 Date.now())
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

    const dateEl = document.createElement("small");
    dateEl.textContent = formatDate(todo.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    itemEl.appendChild(textEl);
    itemEl.appendChild(dateEl);
    itemEl.appendChild(deleteBtn);
    listEl.appendChild(itemEl);
  });
  const left = todos.filter((todo) => !todo.done).length;
  countEl.textContent = `남은 일 ${left}개`;
}

// 3. 바꾸기 — 배열을 바꾸고, 저장하고, 다시 그리기
function addTodo(text) {
  todos.push({ id: Date.now(), text: text, done: false });
  saveTodos(todos);
  render();
}

function toggleTodo(id) {
  const todo = todos.find((item) => item.id === id);
  todo.done = !todo.done;
  saveTodos(todos);
  render();
}

function deleteTodo(id) {
  todos = todos.filter((item) => item.id !== id);
  saveTodos(todos);
  render();
}

// 4. 쓰던 글 — 이 탭에서만 기억
input.value = loadDraft();
input.addEventListener("input", () => {
  saveDraft(input.value);
});

// 5. 추가하기 (submit) — 비었으면 안내, 넣었으면 쓰던 글 지우기
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
  clearDraft();
});

render();
