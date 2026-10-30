// 실습 02 — 한 주 운동 기록 통계 (반복문 → map · filter · reduce)
const records = [
  { day: "월", type: "걷기", minutes: 40 },
  { day: "화", type: "달리기", minutes: 25 },
  { day: "수", type: "자전거", minutes: 50 },
  { day: "목", type: "걷기", minutes: 30 },
  { day: "금", type: "달리기", minutes: 35 },
  { day: "토", type: "자전거", minutes: 80 },
  { day: "일", type: "걷기", minutes: 20 },
];

// 1. 총 운동 시간 — reduce로 모두 더해 값 하나로
const total = records.reduce((sum, record) => sum + record.minutes, 0);

// 2. 하루 평균
const average = total / records.length;

// 3. 가장 오래 한 날 — 둘 중 긴 쪽을 남기는 reduce (초기값 없음)
const best = records.reduce((longest, record) => {
  return record.minutes > longest.minutes ? record : longest;
});

// 4. 30분 이상 한 날 — filter로 고르고 map으로 요일만
const longDays = records
  .filter((record) => record.minutes >= 30)
  .map((record) => record.day);

// 5. 종류별 시간 — reduce로 객체 만들기
const byType = records.reduce((acc, record) => {
  acc[record.type] = (acc[record.type] || 0) + record.minutes;
  return acc;
}, {});

// 6. 화면에 쓰기 (두 파일이 같습니다)
document.querySelector("#total").textContent = `${total}분`;
document.querySelector("#average").textContent = `${average}분`;
document.querySelector("#best").textContent = `${best.day}요일 ${best.type} ${best.minutes}분`;

const longDaysEl = document.querySelector("#long-days");
longDays.forEach((day) => {
  const itemEl = document.createElement("li");
  itemEl.textContent = day;
  longDaysEl.appendChild(itemEl);
});

const byTypeEl = document.querySelector("#by-type");
Object.keys(byType).forEach((type) => {
  const itemEl = document.createElement("li");
  itemEl.textContent = `${type} ${byType[type]}분`;
  byTypeEl.appendChild(itemEl);
});
