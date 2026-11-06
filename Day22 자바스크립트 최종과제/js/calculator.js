// 계산기 핵심 로직 — 기본 과제 1~4 + 도전 1, 3
const mainDisplay = document.getElementById("mainDisplay");
const subDisplay = document.getElementById("subDisplay");

let expression = "";
let justCalculated = false;

// 디스플레이 갱신 — 기존 코드 유지
export const updateDisplay = () => {
    mainDisplay.textContent = expression || "0";
    mainDisplay.style.fontSize = expression.length > 10 ? "1.8rem" : "2.6rem";
};

// 과제 1: 숫자와 소수점 입력
export const appendNumber = (num) => {
    if (!/^[0-9.]$/.test(num)) return;
    if (justCalculated) expression = "";

    const currentNumber = expression.split(/[+\-*/]/).pop();

    if (num === ".") {
        if (currentNumber.includes(".")) return;
        expression += currentNumber === "" ? "0." : ".";
    } else if (currentNumber === "0") {
        expression = expression.slice(0, -1) + num;
    } else {
        expression += num;
    }

    justCalculated = false;
    subDisplay.textContent = "";
    updateDisplay();
};

// 과제 2: 연산자 입력 — 연속해서 누르면 마지막 연산자로 교체
export const appendOperator = (op) => {
    if (!["+", "-", "*", "/"].includes(op)) return;
    if (expression === "") return;

    const lastChar = expression[expression.length - 1];
    if (["+", "-", "*", "/"].includes(lastChar)) {
        expression = expression.slice(0, -1);
    }

    expression += op;
    justCalculated = false;
    subDisplay.textContent = "";
    updateDisplay();
};

// 과제 3: 계산 후 원래 수식과 결과를 main.js에 반환
export const calculate = () => {
    if (expression === "" || /[+\-*/]$/.test(expression)) return null;
    const originalExpression = expression;

    try {
        // 숫자와 사칙연산만 허용합니다. e 표기는 큰 수의 계산 결과에 사용됩니다.
        const numberPattern = "\\d+(?:\\.\\d*)?(?:e[+-]?\\d+)?";
        const validExpression = new RegExp(
            "^-?" + numberPattern + "(?:[+*/-]" + numberPattern + ")*$"
        );
        if (!validExpression.test(originalExpression)) {
            subDisplay.textContent = "수식을 확인해 주세요";
            return null;
        }

        // /0.5는 허용하고, /0 또는 /0.00은 차단합니다.
        const divisions = originalExpression.match(/\/\d+(?:\.\d*)?(?:e[+-]?\d+)?/g) || [];
        if (divisions.some((part) => Number(part.slice(1)) === 0)) {
            subDisplay.textContent = "0으로 나눌 수 없습니다";
            return null;
        }

        // Function도 전역 범위에서 실행되므로, 위에서 입력 수식을 제한합니다.
        const value = Function('"use strict"; return (' + originalExpression + ')')();
        if (!Number.isFinite(value)) {
            subDisplay.textContent = "계산 범위를 벗어났습니다";
            return null;
        }

        const result = parseFloat(value.toFixed(10)).toString();
        expression = result;
        justCalculated = true;
        updateDisplay();
        subDisplay.textContent = originalExpression + " =";
        return { expression: originalExpression, result };
    } catch (error) {
        subDisplay.textContent = "수식을 확인해 주세요";
        return null;
    }
};

// 과제 4: 마지막 글자 삭제 — 계산 직후라면 전체 초기화
export const deleteLast = () => {
    if (justCalculated) {
        clearAll();
        return;
    }
    expression = expression.slice(0, -1);
    subDisplay.textContent = "";
    updateDisplay();
};

// 도전 1: 마지막 숫자만 100으로 나눕니다. 예: 100+50 → 100+0.5
export const appendPercent = () => {
    if (expression === "" || /[+\-*/]$/.test(expression)) return;

    const match = expression.match(/\d+(?:\.\d*)?(?:e[+-]?\d+)?$/);
    if (!match) return;

    const value = Number(match[0]) / 100;
    if (!Number.isFinite(value)) return;
    const percent = parseFloat(value.toFixed(10)).toString();

    expression = expression.slice(0, match.index) + percent;
    justCalculated = false;
    subDisplay.textContent = "";
    updateDisplay();
};

// 도전 3: 기록의 결과를 불러옵니다. 숫자는 새 계산, 연산자는 이어 계산합니다.
export const setExpression = (value) => {
    const text = String(value);
    if (!/^-?\d+(?:\.\d*)?(?:e[+-]?\d+)?$/.test(text)) return;
    if (!Number.isFinite(Number(text))) return;

    expression = text;
    justCalculated = true;
    subDisplay.textContent = "";
    updateDisplay();
};

// 전체 초기화 — 기존 코드 유지
export const clearAll = () => {
    expression = "";
    justCalculated = false;
    mainDisplay.textContent = "0";
    mainDisplay.style.fontSize = "2.6rem";
    subDisplay.textContent = "";
    document.querySelectorAll(".btn-op").forEach(b => b.classList.remove("active"));
};
