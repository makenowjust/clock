/** `DIGIT_IDS` is a constant array to obtain the digit ID based on the clock's position in a grid. */
const DIGIT_IDS = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 2, 2, 2, 0, 3, 3, 3, 4, 4, 4, 0],
  [0, 1, 1, 1, 2, 2, 2, 0, 3, 3, 3, 4, 4, 4, 0],
  [0, 1, 1, 1, 2, 2, 2, 0, 3, 3, 3, 4, 4, 4, 0],
  [0, 1, 1, 1, 2, 2, 2, 0, 3, 3, 3, 4, 4, 4, 0],
  [0, 1, 1, 1, 2, 2, 2, 0, 3, 3, 3, 4, 4, 4, 0],
  [0, 1, 1, 1, 2, 2, 2, 0, 3, 3, 3, 4, 4, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/** `SEGMENT_IDS` is a constant array to obtain the segment ID based on the clock's position in a grid. */
const SEGMENT_IDS = [
  [0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0,  0, 0],
  [0,  1,  2,  3,  1,  2,  3, 0,  1,  2,  3,  1,  2,  3, 0],
  [0,  4,  5,  6,  4,  5,  6, 0,  4,  5,  6,  4,  5,  6, 0],
  [0,  7,  8,  9,  7,  8,  9, 0,  7,  8,  9,  7,  8,  9, 0],
  [0, 10, 11, 12, 10, 11, 12, 0, 10, 11, 12, 10, 11, 12, 0],
  [0, 13, 14, 15, 13, 14, 15, 0, 13, 14, 15, 13, 14, 15, 0],
  [0, 16, 17, 18, 16, 17, 18, 0, 16, 17, 18, 16, 17, 18, 0],
  [0,  0,  0,  0,  0,  0,  0, 0,  0,  0,  0,  0,  0,  0, 0],
];

/** `FONTS` is a constant array representing the font patterns for each digit used in the digital clock display. */
const FONTS = [
  [
    "┌─┐",
    "│╷│",
    "│││",
    "│││",
    "│╵│",
    "└─┘"
  ],
  [
    "┌─┐",
    "└┐│",
    " ││",
    " ││",
    " ││",
    " └┘"
  ],
  [
    "┌─┐",
    "└┐│",
    "┌┘│",
    "│┌┘",
    "│└┐",
    "└─┘"
  ],
  [
    "┌─┐",
    "└┐│",
    "┌┘│",
    "└┐│",
    "┌┘│",
    "└─┘"
  ],
  [
    "┌┐┐",
    "│││",
    "│└│",
    "└┐│",
    " ││",
    " └┘",
  ],
  [
    "┌─┐",
    "│┌┘",
    "│└┐",
    "└┐│",
    "┌┘│",
    "└─┘"
  ],
  [
    "┌─┐",
    "│┌┘",
    "│└┐",
    "│^│",
    "│v│",
    "└─┘"
  ],
  [
    "┌─┐",
    "└┐│",
    " xx",
    "yy ",
    "││ ",
    "└┘ "
  ],
  [
    "┌─┐",
    "│^│",
    "│v│",
    "│^│",
    "│v│",
    "└─┘"
  ],
  [
    "┌─┐",
    "│╷│",
    "│╵│",
    "└┐│",
    " ││",
    " └┘"
  ]
];

/** `ROTATES` is a constant object mapping characters to their corresponding rotation angles for clock hands.
  *
  * The first value in the array is the rotation for the big hand, and the second value is for the small hand.
  */
const ROTATES: Record<string, [number, number]> = {
  "┌": [90, 180],
  "┐": [180, 270],
  "└": [0, 90],
  "┘": [0, 270],
  "─": [90, 270],
  "│": [0, 180],
  "╷": [180, 180],
  "╵": [0, 0],
  "x": [0, 225],
  "y": [45, 180],
  "^": [135, 225],
  "v": [45, 315],
};

/** `ClockComponent` represents a clock component with its HTML element and position in a grid. */
export type ClockComponent = {
  elem: HTMLDivElement;
  x: number;
  y: number;
};

/** `MODES` is a constant array representing the available clock modes. */
export const MODES = ["analog", "digital"] as const;

/** `ClockMode` represents the type of clock modes available. */
export type ClockMode = (typeof MODES)[number];

/** `create` creates a new clock component with the specified position in a grid.
  *
  * This function creates an HTML structure for a clock, but does not mount it to the actual DOM.
  */
export const create = (x: number, y: number): ClockComponent => {
  const elem = document.createElement("div");
  elem.className = "clock";

  const centerElem = document.createElement("div");
  centerElem.className = "center";

  const bigHandElem = document.createElement("div");
  bigHandElem.className = "big-hand";

  const smallHandElem = document.createElement("div");
  smallHandElem.className = "small-hand";

  elem.appendChild(centerElem);
  elem.appendChild(bigHandElem);
  elem.appendChild(smallHandElem);

  return {
    elem,
    x,
    y,
  };
};

/** `setNextRotate` sets the next rotation angles for the clock hands based on the current time and clock mode. */
export const setNextRotate = (date: Date, clock: ClockComponent, mode: ClockMode): void => {
  const hour = date.getHours();
  const minute = date.getMinutes();

  switch (mode) {
  case "analog":
    {
      const bigHandRotate = minute * 6;
      const smallHandRotate = (hour % 12) * 30 + (minute / 60) * 30;
  
      clock.elem.style.setProperty("--clock-big-hand-rotate", `${bigHandRotate}deg`);
      clock.elem.style.setProperty("--clock-small-hand-rotate", `${smallHandRotate}deg`);
    }
    break;

  case "digital":
    {
      const digitId = DIGIT_IDS[clock.y][clock.x];
      const segmentId = SEGMENT_IDS[clock.y][clock.x];
      const segmentX = (segmentId - 1) % 3;
      const segmentY = Math.floor((segmentId - 1) / 3);
  
      const hour0 = Math.floor(hour / 10);
      const hour1 = hour % 10;
      const minute0 = Math.floor(minute / 10);
      const minute1 = minute % 10;
  
      const segmentDigit: number | null = [hour0, hour1, minute0, minute1][digitId - 1] ?? null;
  
      if (segmentDigit === null || FONTS[segmentDigit][segmentY][segmentX] === " ") {
        clock.elem.style.setProperty("--clock-big-hand-rotate", `225deg`);
        clock.elem.style.setProperty("--clock-small-hand-rotate", `225deg`);
      } else {
        const char = FONTS[segmentDigit][segmentY][segmentX];
        const [bigHandRotate, smallHandRotate] = ROTATES[char];

        clock.elem.style.setProperty("--clock-small-hand-rotate", `${smallHandRotate}deg`);
        clock.elem.style.setProperty("--clock-big-hand-rotate", `${bigHandRotate}deg`);
      }
    }
    break;
  }
};