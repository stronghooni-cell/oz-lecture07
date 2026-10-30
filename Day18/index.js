console.log("index.js 연결 완료");

// JSON.stringify 값을 JSON 문자로 바꾸기
const user = {
  name: "김오즈",
  age: 20,
  tags: ["학생", "개발"],
  greet() {
    return "안녕하세요";
  },
};
const text = JSON.stringify(user);
console.log(text);
console.log(typeof text);
console.log(JSON.stringify(user, null, 2));

// JSON.parse JSON 문자를 값으로 바꾸기
const userParsed = JSON.parse(text);
console.log(userParsed);
console.log(typeof userParsed);
console.log(userParsed.tags[0]);

async function load() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await response.json();
  console.log(users);
  const firstUser = users[0];
  console.log(firstUser);
  console.log(firstUser.id);
  console.log(firstUser.name);
}
load();

// response.status response.ok

async function check(path) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/${path}`);
  console.log(path, response.status, response.ok);
}

async function main() {
  console.log("메인시작");
  await check("users");
  await check("users/1");
  await check("todos");
  await check("usersssssssss");
  console.log("메인끝");
}

main();