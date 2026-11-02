// 저장 — 할 일 목록은 localStorage, 쓰던 글은 sessionStorage
const TODOS_KEY = "day21-todos";
const DRAFT_KEY = "day21-draft";

export function loadTodos() {
  return JSON.parse(localStorage.getItem(TODOS_KEY)) || [];
}

export function saveTodos(todos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

export function loadDraft() {
  return sessionStorage.getItem(DRAFT_KEY) || "";
}

export function saveDraft(text) {
  sessionStorage.setItem(DRAFT_KEY, text);
}

export function clearDraft() {
  sessionStorage.removeItem(DRAFT_KEY);
}
