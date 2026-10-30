// 실습 01 — 회원 목록 불러오기
const loadBtn = document.querySelector("#load-btn");
const statusEl = document.querySelector("#status");
const listEl = document.querySelector("#member-list");
const API_URL = "https://jsonplaceholder.typicode.com/users";

// 1. 회원 한 명으로 li 하나 만들기
function createMember(user) {
  const itemEl = document.createElement("li");
  itemEl.textContent = `${user.name} · ${user.email} · ${user.company.name}`;
  return itemEl;
}

// 2. 받은 회원 배열을 화면에 그리기
function render(users) {
  listEl.textContent = "";   // 앞서 그린 목록 비우기
  users.forEach((user) => {
    listEl.appendChild(createMember(user));
  });
  statusEl.textContent = `${users.length}명을 불러왔습니다`;
}

// 3. 불러오기 — 요청하고, 응답을 확인하고, JSON으로 바꿔 그리기
async function loadMembers() {
  statusEl.textContent = "불러오는 중…";
  statusEl.classList.remove("error");
  loadBtn.disabled = true;   // 받는 동안 다시 누르지 못하게
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`${response.status} 오류`);
    }
    const users = await response.json();
    render(users);
  } catch (error) {
    // 4. 실패하면 안내 문구를 빨갛게
    statusEl.textContent = `불러오지 못했습니다 — ${error.message}`;
    statusEl.classList.add("error");
  } finally {
    // 5. 성공해도 실패해도 버튼은 다시 쓸 수 있게
    loadBtn.disabled = false;
  }
}

// 6. 버튼 연결
loadBtn.addEventListener("click", loadMembers);
