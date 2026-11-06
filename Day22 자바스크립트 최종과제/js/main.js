// 이벤트 연결 — 기존 기능 유지 + 도전 과제의 버튼과 기록 연결
import {
    appendNumber, appendOperator, calculate, deleteLast, clearAll,
    appendPercent, setExpression,
} from "./calculator.js";
import {
    loadHistory, addHistory, clearHistory, deleteHistoryItem,
} from "./history.js";

const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");
const historyBtn = document.getElementById("historyBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const themeBtn = document.getElementById("themeBtn");
const badge = document.getElementById("badge");

const clearOperatorHighlight = () => {
    document.querySelectorAll(".btn-op").forEach(b => b.classList.remove("active"));
};

// 기록을 화면에 그립니다. 글자는 textContent로 넣습니다.
const renderHistory = (history) => {
    badge.textContent = history.length;
    historyList.textContent = "";

    if (history.length === 0) {
        const emptyEl = document.createElement("li");
        emptyEl.className = "empty-msg";
        emptyEl.textContent = "아직 계산 기록이 없어요 🧮";
        historyList.appendChild(emptyEl);
        return;
    }

    history.forEach((item, index) => {
        const itemEl = document.createElement("li");
        itemEl.className = "history-item";
        itemEl.tabIndex = 0;
        itemEl.title = "누르면 이 결과를 계산기에 불러옵니다";

        const expressionEl = document.createElement("div");
        expressionEl.className = "hist-expr";
        expressionEl.textContent = `${item.expression} =`;

        const resultEl = document.createElement("div");
        resultEl.className = "hist-result";
        resultEl.textContent = item.result;

        const dateEl = document.createElement("div");
        dateEl.className = "hist-date";
        dateEl.textContent = item.date;

        // 도전 2: × 버튼을 눌렀을 때 기록 불러오기는 실행하지 않습니다.
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "del-item-btn";
        deleteBtn.textContent = "×";
        deleteBtn.setAttribute("aria-label", `${item.expression} 기록 삭제`);
        deleteBtn.style.opacity = "1"; // 터치 화면에서도 항상 보이도록 표시
        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            renderHistory(deleteHistoryItem(index));
        });

        // 도전 3: 기록의 수식·결과·날짜를 누르면 결과 불러오기
        const recall = () => {
            setExpression(item.result);
            clearOperatorHighlight();
        };
        itemEl.addEventListener("click", recall);
        itemEl.addEventListener("keydown", (event) => {
            if (event.target === itemEl && ["Enter", " "].includes(event.key)) {
                event.preventDefault();
                event.stopPropagation();
                recall();
            }
        });

        itemEl.append(expressionEl, resultEl, dateEl, deleteBtn);
        historyList.appendChild(itemEl);
    });
};

const chooseOperator = (op) => {
    clearOperatorHighlight();
    const button = document.querySelector(`[data-op="${op}"]`);
    if (button) button.classList.add("active");
    appendOperator(op);
};

const runCalculation = () => {
    const result = calculate();
    if (result) renderHistory(addHistory(result.expression, result.result));
    clearOperatorHighlight();
};

document.querySelectorAll(".btn-num").forEach(btn =>
    btn.addEventListener("click", () => appendNumber(btn.dataset.num))
);
document.querySelectorAll(".btn-op").forEach(btn =>
    btn.addEventListener("click", () => chooseOperator(btn.dataset.op))
);
document.querySelector("[data-action='equals']").addEventListener("click", runCalculation);
document.querySelector("[data-action='clear']").addEventListener("click", clearAll);
document.querySelector("[data-action='delete']").addEventListener("click", deleteLast);

// 도전 1: 원본 index.html에 이미 있는 % 버튼과 연결
document.querySelector("[data-action='percent']").addEventListener("click", appendPercent);

// 키보드 입력 — Enter가 포커스된 계산기 버튼까지 중복 클릭하지 않게 합니다.
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target.matches("input, textarea, select") || event.target.isContentEditable) return;

    // 기록 삭제·테마·기록 열기 등은 Enter의 원래 버튼 동작을 유지합니다.
    if (event.key === "Enter" && event.target.closest("button:not(.btn)")) return;

    const key = event.key;
    if (!/^[0-9.]$/.test(key) && !["+", "-", "*", "/", "%", "Enter", "=", "Backspace", "Escape"].includes(key)) return;
    event.preventDefault();

    if (/^[0-9.]$/.test(key)) appendNumber(key);
    else if (["+", "-", "*", "/"].includes(key)) chooseOperator(key);
    else if (key === "Enter" || key === "=") runCalculation();
    else if (key === "Backspace") deleteLast();
    else if (key === "Escape") clearAll();
    else if (key === "%") appendPercent();
});

historyBtn.addEventListener("click", () => historyPanel.classList.toggle("open"));
clearAllBtn.addEventListener("click", () => renderHistory(clearHistory()));

// 다크모드 — 기존 동작 유지
const applyTheme = (dark) => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    themeBtn.textContent = dark ? "☀️" : "🌙";
};
themeBtn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    applyTheme(!isDark);
    localStorage.setItem("calc_theme", !isDark ? "dark" : "light");
});

applyTheme(localStorage.getItem("calc_theme") === "dark");
renderHistory(loadHistory());
