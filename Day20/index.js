// index.js — DAY 20 장표 예제 모음 : index.html에서 도는 예제를 장표 순서대로 모았습니다
// RUN에 장 번호를 넣고 저장한 뒤 새로고침하면, 그 장의 if 블록 하나만 실행됩니다.
// 결과는 Console에 찍히고 36 · 44장은 화면에 나옵니다. 주석에 적은 결과는 Chrome에서 실행해 확인한 값입니다.
const RUN = 8;

// 8~22장은 JSONPlaceholder에 요청합니다 — 인터넷이 필요합니다
const BASE_URL = "https://jsonplaceholder.typicode.com";

// ===== 01 · fetch 응답 처리 심화 =====

// 8장 · 본문을 읽기 전에 보는 상태와 헤더
// Console :
//   200 true
//   application/json; charset=utf-8
//   Leanne Graham
if (RUN === 17) {
  async function look() {
    const response = await fetch(`${BASE_URL}/users/1`);
    console.log(response.status, response.ok);
    console.log(response.headers.get("content-type"));
    const user = await response.json();
    console.log(user.name);
  }
  look();
}

// 9장 · 한 번만 읽을 수 있는 응답 본문
// Console :
//   Leanne Graham true
//   Uncaught (in promise) TypeError: Failed to execute 'json' on 'Response': body stream already read
if (RUN === 9) {
  async function readTwice() {
    const response = await fetch(`${BASE_URL}/users/1`);
    const user = await response.json();
    console.log(user.name, response.bodyUsed);
    const again = await response.json();
    console.log(again.name);
  }
  readTwice();
}

// 10장 · fetch · ok 확인 · json을 묶은 함수 하나
// getJSON은 뒤의 장(12 · 18 · 19 · 20 · 22장)도 쓰므로 if 밖에 둡니다
async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(`응답 상태 ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

// Console :
//   sunt aut facere repellat provident occaecati excepturi optio reprehenderit
//   GET …/posts/0 404 (Not Found)   ← 빨간 줄, Chrome이 실패한 요청을 알림
//   응답 상태 404 404
if (RUN === 10) {
  async function test() {
    const post = await getJSON(`${BASE_URL}/posts/1`);
    console.log(post.title);
    try {
      await getJSON(`${BASE_URL}/posts/0`);
    } catch (error) {
      console.log(error.message, error.status);
    }
  }
  test();
}

// 12장 · 실패마다 사람이 읽을 문구로 바꾸기
// toMessage는 18장도 쓰므로 if 밖에 둡니다
function toMessage(error) {
  if (error.name === "TypeError") return "인터넷 연결을 확인해 주세요";
  if (error.status === 404) return "찾는 주소가 없습니다";
  return "잠시 후 다시 시도해 주세요";
}

// Console (사이에 Chrome의 빨간 404 · ERR_NAME_NOT_RESOLVED 줄) :
//   성공 : 1
//   실패 : 찾는 주소가 없습니다
//   실패 : 인터넷 연결을 확인해 주세요
if (RUN === 12) {
  async function show(url) {
    try {
      const post = await getJSON(url);
      console.log("성공 :", post.id);
    } catch (error) {
      console.log("실패 :", toMessage(error));
    }
  }
  // 세 주소를 차례로 — .invalid는 서버를 찾을 수 없는 이름
  async function run() {
    await show(`${BASE_URL}/posts/1`);
    await show(`${BASE_URL}/posts/0`);
    await show("https://jsonplaceholder.invalid/posts/1");
  }
  run();
}

// 13장 · 기다릴 시간 정하기 — AbortSignal.timeout
// 이 탭을 앞에 두고 실행합니다 — 뒤에 둔 탭은 타이머가 늦게 울려 1ms에도 받을 때가 있음
// Console :
//   5000ms 안에 받음 : 1
//   1ms 실패 : TimeoutError signal timed out
if (RUN === 13) {
  async function load(id, ms) {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        signal: AbortSignal.timeout(ms),
      });
      const post = await response.json();
      console.log(`${ms}ms 안에 받음 :`, post.id);
    } catch (error) {
      console.log(`${ms}ms 실패 :`, error.name, error.message);
    }
  }
  async function run() {
    await load(1, 5000);
    await load(2, 1);
  }
  run();
}

// ===== 02 · async/await 구조화 =====

// 17장 · getJSON이 던진 오류를 load의 catch로 받기
// 이 장의 getJSON은 시작 · 끝을 찍는 판이라 블록 안에 따로 둡니다 — 이 블록에서는 이것을 씀
// Console :
//   load 시작
//   getJSON 시작
//   GET …/posts/0 404 (Not Found)   ← 빨간 줄, Chrome이 씀
//   load가 받은 오류 : 응답 상태 404
//   load 끝
if (RUN === 17) {
  async function getJSON(url) {
    console.log("getJSON 시작");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`응답 상태 ${response.status}`);
    }
    console.log("getJSON 끝");
    return response.json();
  }
  async function load() {
    console.log("load 시작");
    try {
      await getJSON(`${BASE_URL}/posts/0`);
      console.log("받았습니다");
    } catch (error) {
      console.log("load가 받은 오류 :", error.message);
    }
    console.log("load 끝");
  }
  load();
}

// 18장 · try에는 실패할 수 있는 요청만 넣기
// render는 address를 adress로 잘못 쓴 함수입니다
// Console :
//   A : 인터넷 연결을 확인해 주세요
//   Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'city')
if (RUN === 18) {
  function render(user) {
    console.log(user.adress.city);
  }
  // A — try 안에서 그리기
  async function loadA() {
    try {
      const user = await getJSON(`${BASE_URL}/users/1`);
      render(user);
    } catch (error) {
      console.log("A :", toMessage(error));
    }
  }
  // B — try에는 요청만
  async function loadB() {
    let user;
    try {
      user = await getJSON(`${BASE_URL}/users/1`);
    } catch (error) {
      console.log("B :", toMessage(error));
      return;
    }
    render(user);
  }
  async function run() {
    await loadA();
    await loadB();
  }
  run();
}

// 19장 · 서로 상관없는 요청은 함께 기다리기
// 장표 화면은 Network의 Disable cache를 켜고 찍었습니다
// Console (ms는 할 때마다 다르고, 차례로가 두 배 가까이) :
//   차례로 : 251ms Ervin Howell 10
//   함께 : 127ms Clementine Bauch 10
if (RUN === 19) {
  async function inOrder() {
    const start = performance.now();
    const user = await getJSON(`${BASE_URL}/users/2`);
    const posts = await getJSON(`${BASE_URL}/posts?userId=2`);
    const ms = Math.round(performance.now() - start);
    console.log(`차례로 : ${ms}ms`, user.name, posts.length);
  }
  async function together() {
    const start = performance.now();
    const [user, posts] = await Promise.all([
      getJSON(`${BASE_URL}/users/3`),
      getJSON(`${BASE_URL}/posts?userId=3`),
    ]);
    const ms = Math.round(performance.now() - start);
    console.log(`함께 : ${ms}ms`, user.name, posts.length);
  }
  // 먼저 /todos/1을 한 번 받아 서버와 연결을 연 뒤 둘을 차례로 부름
  async function run() {
    await getJSON(`${BASE_URL}/todos/1`);
    await inOrder();
    await together();
  }
  run();
}

// 20장 · 앞 요청의 결과를 써야 하면 차례로 기다리기
// Console :
//   Leanne Graham 1 — sunt aut facere repellat provident occaecati excepturi optio reprehenderit
if (RUN === 20) {
  async function firstPostOf(username) {
    const users = await getJSON(`${BASE_URL}/users?username=${username}`);
    const user = users[0];
    const posts = await getJSON(`${BASE_URL}/posts?userId=${user.id}`);
    console.log(user.name, user.id, "—", posts[0].title);
  }
  firstPostOf("Bret");
}

// 22장 · 하나가 실패해도 다 받기 — Promise.allSettled
// Console (빨간 ERR_NAME_NOT_RESOLVED 줄 둘은 Chrome이 씀) :
//   Promise.all : Failed to fetch
//   성공 : Leanne Graham
//   실패 : Failed to fetch
if (RUN === 22) {
  const urls = [
    "https://jsonplaceholder.typicode.com/users/1",
    "https://jsonplaceholder.invalid/users/2",
  ];
  async function run() {
    try {
      await Promise.all(urls.map((url) => getJSON(url)));
    } catch (error) {
      console.log("Promise.all :", error.message);
    }
    const results = await Promise.allSettled(urls.map((url) => getJSON(url)));
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        console.log("성공 :", result.value.name);
      } else {
        console.log("실패 :", result.reason.message);
      }
    });
  }
  run();
}

// ===== 03 · 로딩 · 오류 · 성공 상태 분리 =====

// 25장(상태 없이 쓴 코드)은 입력칸 · 버튼 · 목록이 있는 실습 01 화면에서 도는 코드라 넣지 않았습니다.
// 27 · 28 · 29장의 코드는 실습 01 완성 파일 comments.js에 있습니다(33장은 그 72번 줄 return; 앞에 //).

// ===== 04 · 브라우저 저장소 =====
// 저장소 예제의 결과는 저장소를 비운 상태에서 실행한 값입니다

// 36장 · 새로고침하면 처음 값으로 돌아가는 변수
// 화면 「누른 횟수」 : +1을 세 번 누르면 3번 → 새로고침하면 0번
if (RUN === 36) {
  const countEl = document.querySelector("#count");
  let count = 0;
  document.querySelector("#add-btn").addEventListener("click", () => {
    count += 1;
    countEl.textContent = `${count}번`;
  });
}

// 38장 · setItem · getItem · removeItem · clear
// clear()는 이 출처의 키를 모두 지웁니다 — 다른 장의 예제가 넣은 키도 함께 지워짐
// Console :
//   dark
//   2
//   null
//   0
if (RUN === 38) {
  localStorage.setItem("theme", "dark");
  localStorage.setItem("lang", "ko");
  console.log(localStorage.getItem("theme"));
  console.log(localStorage.length);
  localStorage.removeItem("lang");
  console.log(localStorage.getItem("lang"));
  localStorage.clear();
  console.log(localStorage.length);
}

// 40장 · 글자만 들어가는 저장소
// Console :
//   3 string
//   31
//   [object Object]
//   라떼,모카
if (RUN === 40) {
  localStorage.setItem("count", 3);
  console.log(
    localStorage.getItem("count"),
    typeof localStorage.getItem("count"),
  );
  console.log(localStorage.getItem("count") + 1);
  const person = { name: "김오즈" };
  localStorage.setItem("user", person);
  console.log(localStorage.getItem("user"));
  localStorage.setItem("menu", ["라떼", "모카"]);
  console.log(localStorage.getItem("menu"));
}

// 41장 · 배열과 객체는 JSON 글자로 바꿔 넣기
// Console :
//   {"name":"Jane","preferences":{"theme":"dark"}}
//   Jane dark
if (RUN === 41) {
  const user = { name: "Jane", preferences: { theme: "dark" } };
  localStorage.setItem("user", JSON.stringify(user));
  console.log(localStorage.getItem("user"));

  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser.name, storedUser.preferences.theme);
}

// 42장 · 저장한 적이 없으면 null — 빈 배열로 시작
// Console :
//   null
//   null
//   [] 0
if (RUN === 42) {
  console.log(localStorage.getItem("todos"));
  console.log(JSON.parse(localStorage.getItem("todos")));
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  console.log(todos, todos.length);
}

// 44장 · 연 횟수로 보는 두 저장소
// 화면 「연 횟수」(이 탭 · 이 브라우저) : 처음 1 · 1 → 새로고침 2 · 2 → 같은 주소를 새 탭으로 1 · 3
if (RUN === 44) {
  const tabCount = Number(sessionStorage.getItem("visits") || 0) + 1;
  const allCount = Number(localStorage.getItem("visits") || 0) + 1;
  sessionStorage.setItem("visits", tabCount);
  localStorage.setItem("visits", allCount);
  document.querySelector("#tab-count").textContent = tabCount;
  document.querySelector("#all-count").textContent = allCount;
}

// 45장은 두 폴더의 페이지(share_a.html · share_b.html)가 필요해 넣지 않았습니다.

// 46장 · 넣을 수 있는 양과 넣지 말 것
// Console :
//   QuotaExceededError
//   Failed to execute 'setItem' on 'Storage': Setting the value of 'big' exceeded the quota.
//   null
if (RUN === 46) {
  try {
    localStorage.setItem("big", "가".repeat(6 * 1024 * 1024));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
  console.log(localStorage.getItem("big"));
}

// 48장의 코드는 실습 02 완성 파일 todo.js에 있습니다(53장은 그 16번 줄의 JSON.stringify(todos)를 todos로).