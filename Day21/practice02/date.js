// 날짜 — Date로 「10월 9일」 모양을 만듭니다
export function formatDate(time) {
  const date = new Date(time);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}
