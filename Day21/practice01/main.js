// 실습 01 — 연결 : 두 모듈을 가져와 상태를 바꾸고 버튼에 연결합니다
import { getComments, toMessage } from "./api.js";
import { render } from "./view.js";

const formEl = document.querySelector("#search-form");
const inputEl = document.querySelector("#post-id");
const retryBtn = document.querySelector("#retry-btn");

// 5. 상태 — 바꾸면 render(state)로 다시 그립니다
let state = { status: "idle", comments: [], message: "" };

function setState(nextState) {
  state = nextState;
  render(state);
}

async function loadComments() {
  setState({ status: "loading", comments: [], message: "" });

  let comments;
  try {
    comments = await getComments(inputEl.value);
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

render(state);
