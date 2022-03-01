import {
  MS_PER_SECOND,
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY,
  OSLO_COORDS,
  PARIS_COORDS,
} from "./constants.js";
import { geolocate, distance } from "./geoloc.js";

// DOM
const root = document.documentElement;
const countdownElement = document.getElementById("countdown");
const geolocHintElement = document.getElementById("location-hint");
const toggleElement = document.querySelector("input[type=checkbox]");
const titleElement = document.getElementById("title");

// Other
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

geolocate(function (position) {
  geolocHintElement.style.display = "block";

  const distanceOlso = distance(
    position.coords.latitude,
    position.coords.longitude,
    OSLO_COORDS.latitude,
    OSLO_COORDS.longitude
  );
  const distanceParis = distance(
    position.coords.latitude,
    position.coords.longitude,
    PARIS_COORDS.latitude,
    PARIS_COORDS.longitude
  );

  if (distanceOlso < distanceParis) {
    // Eleni
    toggleElement.checked = false;
    geolocHintElement.innerHTML =
      "(based on your current location you are likely to be <strong>Eleni</strong>)";
  } else {
    // Thomas
    toggleElement.checked = true;
    geolocHintElement.innerHTML =
      "(based on your current location you are likely to be <strong>Thomas</strong>)";
  }
  updateTitleText();
  updateColors();
});

const updateTitleText = () => {
  if (toggleElement.checked) {
    titleElement.innerHTML = `
      Time left before <strong>Eleni</strong> 👩🏼‍🎨<br /> comes back<br /> to Paris <small>(and me ❤️)</small>
    `;
  } else {
    titleElement.innerHTML = `
      Time left before <strong>Thomas</strong><br /> takes me in his (manly) arms<br /><small>(and gives me that long awaited kiss ❤️)</small>
    `;
  }
};

const updateColors = () => {
  if (toggleElement.checked) {
    root.style.setProperty("--highlight-color", "hsla(260, 100%, 50%, 0.3)");
  } else {
    root.style.setProperty("--highlight-color", "hsla(207, 90%, 54%, 0.3)");
  }
};

toggleElement.addEventListener("change", (event) => {
  updateTitleText();
  updateColors();
});

document.body.style.backgroundColor = `hsl(${randInt(0, 360)}, 100%, 80%)`;
updateTitleText();
rafId = requestAnimationFrame(tick);
