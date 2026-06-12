// State Aplikasi
let appData = {
    budget: 0,
    categories: ['Makanan', 'Transportasi', 'Hiburan', 'Tagihan'],
    expenses: [],
    theme: 'light'
};

// DOM Elements
const budgetInput = document.getElementById('budget-input');
const saveBudgetBtn = document.getElementById('save-budget-btn');
const budgetDisplay = document.getElementById('budget-display');
const remainingDisplay = document.getElementById('remaining-display');
const progressBar = document.getElementById('progress-bar');
const warningMessage = document.getElementById('warning-message');

const categoryInput = document.getElementById('category-input');
const addCategoryBtn = document.getElementById('add-category-btn');
const expenseCategorySelect = document.getElementById('expense-category');

const expenseForm = document.getElementById('expense-form');
const expenseTitle = document.getElementById('expense-title');
const expenseAmount = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const sortSelect = document.getElementById('sort-select');

const themeToggle = document.getElementById('theme-toggle');

// --- Fungsi Inisialisasi & Local Storage ---
function init() {
    const savedData = localStorage.getItem('atarduit_data');
    if (savedData) {
        appData = JSON.parse(savedData);
    }
    
    // Set tema awal
    document.documentElement.setAttribute('data-theme', appData.theme);

    renderCategories();
    renderDashboard();
    renderExpenses();
}

function saveData() {
    localStorage.setItem('atarduit_data', JSON.stringify(appData));
    renderDashboard();
}

// --- Format Mata Uang Rupiah ---
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
}

// --- Logika Anggaran Bulanan ---
saveBudgetBtn.addEventListener('click', () => {
    const amount = parseFloat(budgetInput.value);
    if (!isNaN(amount) && amount >= 0) {
        appData.budget = amount;
        budgetInput.value = '';
        saveData();
    }
});

function renderDashboard() {
    const totalExpenses = appData.expenses.reduce((sum, item) => sum + item.amount, 0);
    const remaining = appData.budget - totalExpenses;

    budgetDisplay.textContent = formatRupiah(appData.budget);
    remainingDisplay.textContent = formatRupiah(remaining);

    // Update Progress Bar & Deteksi Melebihi Batas Anggaran (Overlimit)
    let percent = appData.budget > 0 ? (totalExpenses / appData.budget) * 100 : 0;
    
    if (percent > 100) {
        progressBar.style.width = '100%';
        progressBar.classList.add('overlimit');
        warningMessage.classList.remove('hidden');
    } else {
        progressBar.style.width = `${percent}%`;
        progressBar.classList.remove('overlimit');
        warningMessage.classList.add('hidden');
    }
}

// --- Logika Kategori Kustom ---
addCategoryBtn.addEventListener('click', () => {
    const newCat = categoryInput.value.trim();
    if (newCat && !appData.categories.includes(newCat)) {
        appData.categories.push(newCat);
        categoryInput.value = '';
        saveData();
        renderCategories();
    }
});

function renderCategories() {
    expenseCategorySelect.innerHTML = '';
    appData.categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        expenseCategorySelect.appendChild(option);
    });
}

// --- Logika Transaksi ---
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newExpense = {
        id: Date.now(),
        title: expenseTitle.value.trim(),
        amount: parseFloat(expenseAmount.value),
        category: expenseCategorySelect.value,
        date: new Date().toISOString()
    };

    appData.expenses.push(newExpense);
    expenseForm.reset();
    saveData();
    renderExpenses();
});

function deleteExpense(id) {
    appData.expenses = appData.expenses.filter(item => item.id !== id);
    saveData();
    renderExpenses();
}

// --- Logika Sortir & Tampilkan Transaksi ---
sortSelect.addEventListener('change', renderExpenses);

function renderExpenses() {
    expenseList.innerHTML = '';
    let sortedExpenses = [...appData.expenses];

    // Fitur Sortir
    const sortVal = sortSelect.value;
    if (sortVal === 'amount-high') {
        sortedExpenses.sort((a, b) => b.amount - a.amount);
    } else if (sortVal === 'amount-low') {
        sortedExpenses.sort((a, b) => a.amount - b.amount);
    } else {
        // Default: Terbaru
        sortedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    sortedExpenses.forEach(item => {
        const li = document.createElement('li');
        li.className = 'expense-item';
        li.innerHTML = `
            <div class="item-details">
                <strong>${item.title}</strong>
                <span class="category-tag">${item.category}</span>
            </div>
            <div>
                <span style="font-weight: bold; margin-right: 15px;">${formatRupiah(item.amount)}</span>
                <button class="delete-btn" onclick="deleteExpense(${item.id})">🗑️</button>
            </div>
        `;
        expenseList.appendChild(li);
    });
}

// --- Fitur Toggle Dark/Light Mode ---
themeToggle.addEventListener('click', () => {
    appData.theme = appData.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', appData.theme);
    localStorage.setItem('atarduit_data', JSON.stringify(appData));
});

// Jalankan aplikasi pertama kali
init();