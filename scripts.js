// script.js

// Redirect to purchase page
function redirectToPurchasePage() {
    window.location.href = "https://www.purchasepage.com"; // Replace with your actual purchase page URL
}

// Redirect to Twitter
function redirectToTwitter() {
    window.location.href = "https://twitter.com/yourtwitterhandle"; // Replace with your actual Twitter URL
}

// Redirect to Discord
function redirectToDiscord() {
    window.location.href = "https://discord.com/yourdiscordinvite"; // Replace with your actual Discord URL
}

// Confetti explosion effect
document.addEventListener("click", function(event) {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            x: event.clientX / window.innerWidth,
            y: event.clientY / window.innerHeight
        }
    });
});

// Fetch Bitcoin price data from CoinGecko and display chart
fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7")
    .then(response => response.json())
    .then(data => {
        const prices = data.prices.map(price => ({
            x: new Date(price[0]),
            y: price[1]
        }));
        const ctx = document.getElementById('price-chart-container').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Bitcoin Price (USD)',
                    data: prices,
                    borderColor: '#FF4500',
                    backgroundColor: 'rgba(255, 69, 0, 0.2)',
                    fill: true
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    },
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    });

// Move the rocket in random directions on click
function moveRocket() {
    const rocket = document.querySelector('.rocket');
    const randomX = Math.random() * (window.innerWidth - rocket.width);
    const randomY = Math.random() * (window.innerHeight - rocket.height);

    rocket.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Confetti library
function confetti({particleCount, spread, origin}) {
    const colors = ['#FF4500', '#FFD700', '#00FF00', '#00FFFF', '#FF00FF'];
    const confettiCanvas = document.createElement('canvas');
    document.body.appendChild(confettiCanvas);
    const context = confettiCanvas.getContext('2d');

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiCanvas.style.position = 'absolute';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = '10000';

    for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = origin.x * confettiCanvas.width;
        const y = origin.y * confettiCanvas.height;
        const angle = Math.random() * 2 * Math.PI;
        const velocity = Math.random() * 5 + 2;

        const confetto = {
            color: color,
            x: x,
            y: y,
            angle: angle,
            velocity: velocity,
            size: Math.random() * 10 + 5,
            gravity: 0.05
        };

        const updateConfetto = () => {
            confetto.x += Math.cos(confetto.angle) * confetto.velocity;
            confetto.y += Math.sin(confetto.angle) * confetto.velocity + confetto.gravity;
            confetto.velocity *= 0.98;
            confetto.size *= 0.98;

            if (confetto.size < 1) {
                context.clearRect(confetto.x, confetto.y, confetto.size * 2, confetto.size * 2);
                return;
            }

            context.beginPath();
            context.arc(confetto.x, confetto.y, confetto.size, 0, 2 * Math.PI);
            context.fillStyle = confetto.color;
            context.fill();

            requestAnimationFrame(updateConfetto);
        };

        updateConfetto();
    }

    setTimeout(() => {
        document
