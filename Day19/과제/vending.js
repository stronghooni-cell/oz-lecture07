// 음료 자판기 — 동전을 넣고 음료를 고르면 넣은 돈과 오늘 판매액이 바뀝니다
const balanceEl = document.querySelector("#balance");
const totalEl = document.querySelector("#total");
const messageEl = document.querySelector("#message");
const todayEl = document.querySelector("#today");

// 1. 자판기 객체 — 넣은 돈(balance)과 판 음료의 가격(sales)을 가집니다
const machine = {
  balance: 0,
  sales: [],

  insert(amount) {
    this.balance += amount;
    this.show(`${amount}원을 넣었습니다`);
  },

  buy(name, price) {
    if (this.balance < price) {
      this.show(`${price - this.balance}원이 모자랍니다`);
      return;
    }
    this.balance -= price;
    this.sales.push(price);
    this.show(`${name} 1개가 나왔습니다`);
  },

  show(message) {
    const total = this.sales.reduce((sum, price) => sum + price, 0);
    balanceEl.textContent = `${this.balance}원`;
    totalEl.textContent = `${total}원`;
    messageEl.textContent = message;
  },
};

// 2. 음료 버튼에 넣을 함수를 만들어 주는 함수 (고차 함수)
function makeBuyer(name, price) {
  return () => machine.buy(name, price);
}

// 3. 오늘 날짜 — 판매 칸 앞에 「10월 29일」처럼 씁니다 (달은 0부터라 + 1)
const today = new Date();
todayEl.textContent = `${today.getMonth() + 1}월 ${today.getDate()}일`;

// 4. 버튼 연결 — 동전 버튼에는 화살표 함수 안에서 machine.insert를 부르는 함수를 넘깁니다
document.querySelector("#coin-500").addEventListener("click", () => machine.insert(500));
document.querySelector("#coin-1000").addEventListener("click", () => machine.insert(1000));
document.querySelector("#water").addEventListener("click", makeBuyer("물", 800));
document.querySelector("#juice").addEventListener("click", makeBuyer("주스", 1200));

machine.show("동전을 넣어 주세요");