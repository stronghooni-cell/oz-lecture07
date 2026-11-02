// 읽은 글 표시하기 — 글 목록은 서버에서 받고, 읽은 글 번호는 localStorage에 둡니다
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?userId=1";
const READ_KEY = "day20-read";

const statusEl = document.querySelector("#status");
const retryBtn = document.querySelector("#retry-btn");
const listEl = document.querySelector("#list");
const resetBtn = document.querySelector("#reset-btn");

// 1. 읽은 글 번호 — 저장한 것이 없으면 빈 배열
let readIds = JSON.parse(localStorage.getItem(READ_KEY)) || [];
let posts = [];

function saveRead() {
  localStorage.setItem(READ_KEY, JSON.stringify(readIds));
}

// 2. 요청 함수 — ok가 아니면 실패로
async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`응답 상태 ${response.status}`);
  }
  return response.json();
}

// 3. 목록 그리기 — 읽은 글에는 read 클래스
function render() {
  listEl.textContent = "";
  posts.forEach((post) => {
    const itemEl = document.createElement("li");
    itemEl.textContent = `${post.id}. ${post.title}`;
    if (readIds.includes(post.id)) {
      itemEl.classList.add("read");
    }
    itemEl.addEventListener("click", () => markRead(post.id));
    listEl.appendChild(itemEl);
  });
  statusEl.textContent = `글 ${posts.length}개 · 읽은 글 ${readIds.length}개`;
}

// 4. 누른 글을 읽음으로
function markRead(id) {
  if (!readIds.includes(id)) {
    readIds.push(id);
    saveRead();
  }
  render();
}

// 5. 불러오기 — 불러오는 중 → 성공 또는 실패
async function loadPosts() {
  statusEl.textContent = "불러오는 중…";
  retryBtn.hidden = true;
  try {
    posts = await getJSON(POSTS_URL);
  } catch (error) {
    statusEl.textContent = "글을 불러오지 못했습니다 — 인터넷 연결을 확인해 주세요";
    retryBtn.hidden = false;
    return;
  }
  render();
}

// 6. 연결 — 읽음 표시 지우기, 다시 시도
resetBtn.addEventListener("click", () => {
  localStorage.removeItem(READ_KEY);
  readIds = [];
  render();
});
retryBtn.addEventListener("click", loadPosts);

loadPosts();