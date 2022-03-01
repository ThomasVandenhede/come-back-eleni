const countdownElement = document.getElementById("countdown");
let rafId;

const randInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

document.body.style.backgroundColor = `hsl(${randInt(0, 360)}, 100%, 80%)`;

const tick = () => {
  const returnDate = new Date("March 3, 2022 18:00:00 UTC");
  const now = Date.now();
  const diff = Math.max(0, returnDate - now);
  const timeLeft = new Date(diff);
  const days = Math.floor(diff / (1000 * 3600 * 24));
  const hours = timeLeft.getHours();
  const minutes = timeLeft.getMinutes();
  const seconds = timeLeft.getSeconds();
  if (countdownElement) {
    countdownElement.innerHTML = `${days} days ${hours}h ${minutes}min and ${seconds}s`;
  }
  rafId = requestAnimationFrame(tick);
};

rafId = requestAnimationFrame(tick);
