// 실습 02 — 할 일 모아 보기 (JavaScript 기초 종합)
const userSelect = document.querySelector("#user");
const allBtn = document.querySelector("#all-btn");
const doneBtn = document.querySelector("#done-btn");
const leftBtn = document.querySelector("#left-btn");
const statusEl = document.querySelector("#status");
const countEl = document.querySelector("#count");
const listEl = document.querySelector("#todo-list");

let todos = [];        // 받아 온 할 일 (DAY 13 배열)
let view = "all";      // 지금 보기 : "all" · "done" · "left"

// 1. 지금 보기에 맞는 할 일만 고르기 (DAY 14 filter)
function getVisible() {
  if (view === "done") {
    return todos.filter((todo) => todo.completed);
  }
  if (view === "left") {
    return todos.filter((todo) => !todo.completed);
  }
  return todos;
}

// 2. 화면 다시 그리기 (DAY 15 createElement · classList)
function render() {
  const visible = getVisible();
  listEl.textContent = "";
  visible.forEach((todo) => {
    const itemEl = document.createElement("li");
    itemEl.textContent = todo.title;
    if (todo.completed) {
      itemEl.classList.add("done");
    }
    listEl.appendChild(itemEl);
  });
  countEl.textContent = `${visible.length}개 / 전체 ${todos.length}개`;
}

// 3. 회원의 할 일 불러오기 (DAY 17 async · await, DAY 18 fetch · JSON)
async function loadTodos(userId) {
  statusEl.textContent = "불러오는 중…";
  statusEl.classList.remove("error");
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`${response.status} 오류`);
    }
    todos = await response.json();
    statusEl.textContent = "";
  } catch (error) {
    todos = [];
    statusEl.textContent = `불러오지 못했습니다 — ${error.message}`;
    statusEl.classList.add("error");
  } finally {
    render();   // 성공해도 실패해도 화면은 지금 todos로 다시 그림
  }
}

// 4. 회원을 바꾸면 다시 불러오기 (DAY 16 change)
userSelect.addEventListener("change", () => {
  loadTodos(userSelect.value);
});

// 5. 보기 버튼 (DAY 16 click)
allBtn.addEventListener("click", () => {
  view = "all";
  render();
});
doneBtn.addEventListener("click", () => {
  view = "done";
  render();
});
leftBtn.addEventListener("click", () => {
  view = "left";
  render();
});

// 6. 처음 열 때 1번 회원의 할 일
loadTodos(userSelect.value);