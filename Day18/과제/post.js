// 글 한 편 보기 — 번호를 넣고 「보기」를 누르면 그 글을 불러와 씁니다
const idInput = document.querySelector("#post-id");
const showBtn = document.querySelector("#show-btn");
const statusEl = document.querySelector("#status");
const titleEl = document.querySelector("#title");
const bodyEl = document.querySelector("#body");

// 1. 글 불러오기 — 없는 번호면 오류로 보냅니다
async function showPost() {
  statusEl.textContent = "불러오는 중…";
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${idInput.value}`);
    if (!response.ok) {
      throw new Error(`${response.status} — 없는 글입니다`);
    }
    const post = await response.json();
    titleEl.textContent = post.title;
    bodyEl.textContent = post.body;
  } catch (error) {
    titleEl.textContent = "";
    bodyEl.textContent = error.message;
  } finally {
    statusEl.textContent = "";
  }
}

// 2. 버튼 연결
showBtn.addEventListener("click", showPost);