// Fetch current Bitcoin rate
async function fetchBitcoinRate() {
    try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
        const data = await response.json();
        const rate = data.bpi.USD.rate_float;
        document.getElementById('btc-rate').textContent = `$${rate.toLocaleString()}`;
        return rate;
    } catch (error) {
        console.error('Error fetching Bitcoin rate:', error);
    }
}

// Calculate balance in USD
async function calculateBalance() {
    const btcAmount = document.getElementById('btc-balance').value;
    const rate = await fetchBitcoinRate();
    const balanceInUSD = (btcAmount * rate).toFixed(2);
    document.getElementById('usd-balance').textContent = `$${balanceInUSD}`;
}

// Fetch the Bitcoin rate on page load
fetchBitcoinRate();

// Quiz functionality (same as before)
const questions = [
    {
        question: "What is Bitcoin?",
        options: {
            a: "A digital currency",
            b: "A type of stock",
            c: "A social network",
            d: "A physical coin"
        },
        correctAnswer: "a"
    },
    {
        question: "Who created Bitcoin?",
        options: {
            a: "Elon Musk",
            b: "Satoshi Nakamoto",
            c: "Vitalik Buterin",
            d: "Bill Gates"
        },
        correctAnswer: "b"
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const questionObj = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionObj.question;
    const options = document.querySelectorAll('.quiz-option');
    options[0].textContent = questionObj.options.a;
    options[1].textContent = questionObj.options.b;
    options[2].textContent = questionObj.options.c;
    options[3].textContent = questionObj.options.d;
}

function checkAnswer(answer) {
    const questionObj = questions[currentQuestionIndex];
    const result = document.getElementById('result');
    if (answer === questionObj.correctAnswer) {
        result.textContent = "Correct!";
        result.style.color = "#28a745";
    } else {
        result.textContent = "Wrong!";
        result.style.color = "#dc3545";
    }
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    document.getElementById('result').textContent = "";
    loadQuestion();
}

// Load the first question when the page loads
loadQuestion();

