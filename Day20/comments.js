// 실습 01 — 댓글 보기 : 불러오는 중 · 실패 · 성공을 상태로 나눠 그립니다
const BASE_URL = "https://jsonplaceholder.typicode.com";

const formEl = document.querySelector("#search-form");
const inputEl = document.querySelector("#post-id");
const loadBtn = document.querySelector("#load-btn");
const statusEl = document.querySelector("#status");
const retryBtn = document.querySelector("#retry-btn");
const listEl = document.querySelector("#list");

// 1. 요청 함수 — 5초가 넘거나 ok가 아니면 실패로
async function getJSON(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
  if (!response.ok) {
    const error = new Error(`응답 상태 ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

// 2. 오류를 안내 문구로
function toMessage(error) {
  if (error.name === "TimeoutError") return "응답이 너무 늦습니다";
  if (error.name === "TypeError") return "인터넷 연결을 확인해 주세요";
  if (error.status === 404) return "찾는 주소가 없습니다";
  return "잠시 후 다시 시도해 주세요";
}

// 3. 상태 — 화면에 보일 것을 객체 하나에
let state = { status: "idle", comments: [], message: "" };

function setState(nextState) {
  state = nextState;
  render();
}

// 4. 상태를 보고 화면 그리기
function render() {
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

// 5. 흐름 — 불러오는 중 → 요청 → 성공 또는 실패
async function loadComments() {
  setState({ status: "loading", comments: [], message: "" });

  let comments;
  try {
    comments = await getJSON(`${BASE_URL}/posts/${inputEl.value}/comments`);
  } catch (error) {
    setState({ status: "error", comments: [], message: toMessage(error) });
    return;
  }
  setState({ status: "success", comments: comments, message: "" });
}

// 6. 연결 — 제출과 다시 시도
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  loadComments();
});
retryBtn.addEventListener("click", loadComments);

render();
