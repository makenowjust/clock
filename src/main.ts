// This file is the main entry point for the clock application.

import { type ClockComponent, create, MODES, setNextRotate } from "./clock";

import "./style.css";

// biome-ignore lint/style/noNonNullAssertion: We ensure the element exists. See `index.html`.
const app = document.querySelector<HTMLDivElement>("#app")!;

const container = document.createElement("container");
container.className = "container";

const clocks: ClockComponent[] = [];

for (let y = 0; y < 8; y++) {
  const row = document.createElement("div");
  row.className = "row";

  for (let x = 0; x < 15; x++) {
    const clock = create(x, y);
    clocks.push(clock);
    clock.elem.style.setProperty("--clock-big-hand-rotate", `${Math.random() * 360}deg`);
    clock.elem.style.setProperty("--clock-small-hand-rotate", `${Math.random() * 360}deg`);
    row.appendChild(clock.elem);
  }

  container.appendChild(row);
}

app.appendChild(container);

let modeIndex = 1; // Start with the "digital" mode.

const updateClocks = () => {
  const nextDate = new Date(Date.now() + 1000 * 30);
  for (const clock of clocks) {
    setNextRotate(nextDate, clock, MODES[modeIndex]);
  }
  modeIndex = (modeIndex + 1) % MODES.length;
};

setTimeout(updateClocks, 0);
setInterval(updateClocks, 1000 * 30);
