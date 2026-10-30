// 실습 01 — 입장 인원 세기 (클로저 카운터)

// 1. 카운터 만들기 — count는 이 함수 안에만 있고, 돌려준 메서드만 바꿀 수 있습니다
function createCounter(max) {
  let count = 0;

  return {
    increase() {
      if (count < max) {
        count += 1;
      }
      return count;
    },
    decrease() {
      if (count > 0) {
        count -= 1;
      }
      return count;
    },
    reset() {
      count = 0;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

// 2. 관 하나를 화면과 연결하기 — id 앞글자(a · b)와 정원을 받습니다
function connectHall(id, max) {
  const counter = createCounter(max);
  const countEl = document.querySelector(`#${id}-count`);
  const msgEl = document.querySelector(`#${id}-msg`);

  // 3. 지금 인원을 화면에 쓰기 — counter와 max를 기억하는 클로저
  function show() {
    const count = counter.getCount();
    countEl.textContent = `${count}명`;
    msgEl.textContent = count === max ? "정원이 찼습니다" : "";
  }

  // 4. 버튼마다 카운터의 메서드를 부르고 다시 쓰기
  document.querySelector(`#${id}-plus`).addEventListener("click", () => {
    counter.increase();
    show();
  });
  document.querySelector(`#${id}-minus`).addEventListener("click", () => {
    counter.decrease();
    show();
  });
  document.querySelector(`#${id}-reset`).addEventListener("click", () => {
    counter.reset();
    show();
  });

  show();
  return counter;
}

// 5. 1관과 2관 — 카운터를 하나씩 만들어 따로 셉니다
const hallA = connectHall("a", 5);
const hallB = connectHall("b", 3);
