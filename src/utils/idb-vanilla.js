const DB_NAME = "expenseManager";
const STORE_NAME = "expenses";
const DB_VERSION = 1;
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Failed to open database");
    });
}
async function addExpense(expense) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.add(expense);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Failed to add expense");
    });
}
async function getExpensesByMonthYear(month, year) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => {
            const allExpenses = request.result;
            const filteredExpenses = allExpenses.filter(exp => {
                const date = new Date(exp.date);
                return date.getMonth() + 1 === month && date.getFullYear() === year;
            });
            resolve(filteredExpenses);
        };
        request.onerror = () => reject("Failed to fetch expenses");
    });
}
async function deleteExpense(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Failed to delete expense");
    });
}
// 믇ל חשיפה-global scope (Vanilla)
window.idbvanilla = {
    openDB,
    addExpense,
    getExpensesByMonthYear,
    deleteExpense
};
