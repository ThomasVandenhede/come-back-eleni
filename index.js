import {
  MS_PER_SECOND,
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY,
} from "./constants.js";

const countdownElement = document.getElementById("countdown");
let rafId;

const randInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

const updateCountdown = () => {
  const returnDate = new Date("March 3, 2022 19:00:00 UTC");
  const now = Date.now();
  const diff = Math.max(0, returnDate - now);
  const days = Math.floor(diff / MS_PER_DAY);
  const hours = Math.floor((diff - MS_PER_DAY * days) / MS_PER_HOUR);
  const minutes = Math.floor(
    (diff - MS_PER_DAY * days - MS_PER_HOUR * hours) / MS_PER_MINUTE
  );
  const seconds = Math.floor(
    (diff - MS_PER_DAY * days - MS_PER_HOUR * hours - MS_PER_MINUTE * minutes) /
      MS_PER_SECOND
  );

  const daysHTML = `<span>${days}&nbsp;day${days != 1 ? "s" : ""}</span>`;
  const hoursHTML = `<span>${hours}&nbsp;hour${hours != 1 ? "s" : ""}</span>`;
  const minutesHTML = `<span>${minutes}&nbsp;minute${
    minutes != 1 ? "s" : ""
  }</span>`;
  const secondsHTML = `<span>${seconds}&nbsp;second${
    seconds != 1 ? "s" : ""
  }</span>`;

  if (countdownElement) {
    countdownElement.innerHTML = "";

    if (days > 0) {
      countdownElement.innerHTML += daysHTML + " ";
    }
    if (hours > 0 || days > 0) {
      countdownElement.innerHTML += hoursHTML + " ";
    }
    if (minutes > 0 || hours > 0 || days > 0) {
      countdownElement.innerHTML += minutesHTML + " ";
    }
    if (seconds > 0 || minutes > 0 || hours > 0 || days > 0) {
      countdownElement.innerHTML += secondsHTML;
    }
  }
};

const tick = () => {
  updateCountdown();
  rafId = requestAnimationFrame(tick);
};

document.body.style.backgroundColor = `hsl(${randInt(0, 360)}, 100%, 80%)`;
rafId = requestAnimationFrame(tick);
