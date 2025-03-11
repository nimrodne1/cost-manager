const DB_NAME = "expenseManager";
const STORE_NAME = "expenses";
const DB_VERSION = 1;

/**
 * Open the IndexedDB database.
 * @returns {Promise<IDBDatabase>}
 */
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

/**
 * Add a new expense to the database.
 * @param {Object} expense - { sum, category, description, date }
 * @returns {Promise<number>} The ID of the added expense.
 */
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

/**
 * Get expenses for a specific month and year.
 * @param {number} month - The month (1-12).
 * @param {number} year - The year (e.g., 2025).
 * @returns {Promise<Array>}
 */
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

/**
 * Delete an expense by its ID.
 * @param {number} id - The ID of the expense.
 * @returns {Promise<void>}
 */
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

// Export all functions
export { openDB, addExpense, getExpensesByMonthYear, deleteExpense };
