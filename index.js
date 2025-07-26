let balance = 0;
let transactions = [];
let piggyBankBroken = false;

const balanceElement = document.getElementById('balance');
const transactionList = document.getElementById('transactionList');
const withdrawnAmountElement = document.getElementById('withdrawnAmount');
const brokenSection = document.getElementById('broken-section');
const amountInput = document.getElementById('amountInput');

function addMoney() {
    if (piggyBankBroken) return showPopup("❌ Piggy bank is broken. Start a new one!");
    const amount = parseInt(amountInput.value);
    if (isNaN(amount) || amount <= 0) return showPopup("⚠️ Please enter a valid amount.");
    balance += amount;
    transactions.push({
        type: 'Deposit',
        amount
    });
    amountInput.value = '';
    updateUI();
    showPopup(`✅ ₹${amount} added!`);
}

function breakPiggyBank() {
    if (piggyBankBroken) return;
    piggyBankBroken = true;
    withdrawnAmountElement.innerText = balance;
    document.querySelector('.card-box').style.display = 'none';
    document.querySelector('.transactions').style.display = 'none';
    brokenSection.classList.remove('hidden');
    showPopup(`💥 Piggy bank broken. You got ₹${balance}`);
}

function startNewPiggyBank() {
    balance = 0;
    transactions = [];
    piggyBankBroken = false;
    brokenSection.classList.add('hidden');
    document.querySelector('.card-box').style.display = 'flex';
    document.querySelector('.transactions').style.display = 'block';
    updateUI();
    showPopup("🆕 New piggy bank started!");
}

function updateUI() {
    balanceElement.innerText = balance;
    transactionList.innerHTML = '';
    transactions.forEach((txn, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>#${i + 1} - ${txn.type}</span><span>₹${txn.amount}</span>`;
        transactionList.appendChild(li);
    });
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'custom-popup';
    popup.innerText = message;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
}

updateUI();