// DAY 11 Javascript 연산자와 조건문
console.log("index.js가 연결됐습니다");

// 단항연산자
let count = 10;
count++;
console.log(count); //11

count--;
console.log(count); //10

// 단항연산자의 순서
let num = 10;
let a = num++; // a = 10, num = 11
console.log("a :", a);
console.log("num :", num);

let b = ++num; // num = 12, b = 12
console.log("b :", b);
console.log("num :", num);

// 값 합산 +=
let total = 0;
total += 12000; // 티셔츠
total += 3000; // 배송비
console.log("총합 :", total); // 15000

let message = "안녕 ";
message += "하세요.";
console.log(message); // 안녕하세요.

//논리연산자

const age = 25;
const hasTicket = true;

console.log(age >= 25 && hasTicket); // true, 두 조건 모두 true여야 true
console.log(age >= 25 || hasTicket); // true, 두 조건 중 하나만 true여도 true
console.log(!hasTicket); // false, true의 반대값

// 괄호로 묶는 범위에 따라 결과가 다름
console.log(!true && false); // false, !true = false, false && false = false
console.log(!(true && false)); // true, true && false = false, !false = true

// 조건문
const score = 95;
if (score >= 90 && score <= 100) {
  console.log("A학점");
}

const day = "토";
if (day === "토" || day === "일") {
  console.log("주말입니다.");
}

// 중첩 if문
const isloggedIn = true;
const role = "admin";
if (isloggedIn) {
    console.log("로그인 0");
    if (role === "admin") {
        console.log("관리자 메뉴");
    } else {
        console.log("내 정보");
    }
}else{
    console.log("로그인 하기");
}


//switch문
const fruit = "사과";
switch (fruit) {
  case "사과":
    console.log("과일");
    break;
    case "당근":
    console.log("채소");
    break;
    default:
    console.log("과일도 채소도 아님");
}


// 삼항연산자
let result;
let score2 = 55; // 75로 바꿔보기

//if로 표현하면
if(score2 >= 60){
    result = "합격";
} else {
    result = "불합격";
}
console.log(result);

// 삼항연산자로 표현하면
result = score2 >= 60 ? "합격" : "불합격";
console.log(result);

//if의 괄호 생략
if(score2 >= 90) console.log("A학점");


// 점수 등급 계산기