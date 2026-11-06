// 계산 기록 관리 — 기본 과제 5~7 + 도전 2
const STORAGE_KEY = "calc_history";
const MAX_COUNT = 20;

// 과제 5: 저장된 JSON 문자열을 배열로 되돌립니다.
export const loadHistory = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];
    return JSON.parse(saved);
};

// 과제 6: 최신 20개만 저장하고 실제 저장한 배열을 반환합니다.
export const saveHistory = (history) => {
    const limitedHistory = history.slice(0, MAX_COUNT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
    return limitedHistory;
};

// 과제 7: 새 기록을 배열 맨 앞에 넣습니다.
export const addHistory = (expression, result) => {
    const history = loadHistory();
    const newItem = {
        expression,
        result,
        date: new Date().toLocaleString("ko-KR"),
    };
    return saveHistory([newItem, ...history]);
};

// 도전 2: 해당 순서의 기록 하나만 제외하고 다시 저장합니다.
export const deleteHistoryItem = (index) => {
    const history = loadHistory();
    const updatedHistory = history.filter((item, itemIndex) => itemIndex !== index);
    return saveHistory(updatedHistory);
};

// 기록 전체 삭제 — 기존 코드 유지
export const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    return [];
};
