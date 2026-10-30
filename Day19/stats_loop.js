// 실습 02 — 반복문으로 쓴 원래 코드 (stats.js로 복사해 1~5번을 map · filter · reduce로 고쳐 씁니다)
const records = [
  { day: "월", type: "걷기", minutes: 40 },
  { day: "화", type: "달리기", minutes: 25 },
  { day: "수", type: "자전거", minutes: 50 },
  { day: "목", type: "걷기", minutes: 30 },
  { day: "금", type: "달리기", minutes: 35 },
  { day: "토", type: "자전거", minutes: 80 },
  { day: "일", type: "걷기", minutes: 20 },
];

// 1. 총 운동 시간
let total = 0;
for (let i = 0; i < records.length; i++) {
  total += records[i].minutes;
}

// 2. 하루 평균
const average = total / records.length;

// 3. 가장 오래 한 날
let best = records[0];
for (let i = 1; i < records.length; i++) {
  if (records[i].minutes > best.minutes) {
    best = records[i];
  }
}

// 4. 30분 이상 한 날
const longDays = [];
for (let i = 0; i < records.length; i++) {
  if (records[i].minutes >= 30) {
    longDays.push(records[i].day);
  }
}

// 5. 종류별 시간
const byType = {};
for (let i = 0; i < records.length; i++) {
  const type = records[i].type;
  if (byType[type] === undefined) {
    byType[type] = 0;
  }
  byType[type] += records[i].minutes;
}

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
