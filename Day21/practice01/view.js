// 화면 — 상태를 받아 그립니다
const loadBtn = document.querySelector("#load-btn");
const statusEl = document.querySelector("#status");
const retryBtn = document.querySelector("#retry-btn");
const listEl = document.querySelector("#list");

// 4. 상태를 보고 화면 그리기 — 상태는 매개변수로 받습니다
export function render(state) {
  loadBtn.disabled = state.status === "loading";
  retryBtn.hidden = state.status !== "error";
  statusEl.className = state.status === "error" ? "status error" : "status";
  listEl.textContent = "";

  if (state.status === "idle") {
    statusEl.textContent = "글 번호를 넣고 「댓글 보기」를 누르세요";
  } else if (state.status === "loading") {
    statusEl.textContent = "불러오는 중…";
  } else if (state.status === "error") {
    statusEl.textContent = state.message;
  } else if (state.comments.length === 0) {
    statusEl.textContent = "댓글이 없습니다";
  } else {
    statusEl.textContent = `댓글 ${state.comments.length}개`;
    state.comments.forEach((comment) => {
      const itemEl = document.createElement("li");
      itemEl.textContent = `${comment.email} — ${comment.name}`;
      listEl.appendChild(itemEl);
    });
  }
}
