const score = 87; // 이 숫자를 바꾸며 확인하세요.

// 0~100 밖의 점수를 먼저 거르기
if (score < 0 || score > 100) {
  console.log("0~100 사이의 점수를 입력해 주세요.");
} else {
  // 1. 점수에 따라 등급 정하기
  let grade;

  if (score >= 90) {
    grade = "A";
  } else if (score >= 80) {
    grade = "B";
  } else if (score >= 70) {
    grade = "C";
  } else if (score >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }

  // 2. 등급에 따라 한마디 정하기
  let message;

  switch (grade) {
    case "A":
      message = "최고예요";
      break;

    case "B":
      message = "잘했어요";
      break;

    case "C":
    case "D":
      message = "조금만 더 힘내요";
      break;

    default:
      message = "다시 도전해요";
  }

  // 3. 삼항 연산자로 합격 여부 정하기
  const result = score >= 60 ? "합격" : "불합격";

  // 4. 결과 출력하기
  console.log(`점수 ${score}점 → ${grade}등급 (${result})`);
  console.log(message);
}