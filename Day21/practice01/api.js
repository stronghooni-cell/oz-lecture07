// 통신 — 서버에 요청하고, 실패를 안내 문구로 바꿉니다
const BASE_URL = "https://jsonplaceholder.typicode.com";

// 1. 요청 함수 — 이 파일 안에서만 쓰므로 export하지 않습니다
async function getJSON(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
  if (!response.ok) {
    const error = new Error(`응답 상태 ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

// 2. 글 번호로 댓글 받기 — 주소 만드는 일은 통신 파일이 맡습니다
export function getComments(postId) {
  return getJSON(`${BASE_URL}/posts/${postId}/comments`);
}

// 3. 오류를 안내 문구로
export function toMessage(error) {
  if (error.name === "TimeoutError") return "응답이 너무 늦습니다";
  if (error.name === "TypeError") return "인터넷 연결을 확인해 주세요";
  if (error.status === 404) return "찾는 주소가 없습니다";
  return "잠시 후 다시 시도해 주세요";
}
