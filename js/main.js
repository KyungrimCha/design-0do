const phrases = [
  "design 공도",
  "空渡",
  "gongdo",
  "0do",
  "0°",
  "공도",
];

const TYPE_MS = 90;
const DELETE_MS = 50;
const HOLD_MS = 1400;
const GAP_MS = 320;

const typer = document.getElementById("hero-typer");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const segmenter = "Segmenter" in Intl
  ? new Intl.Segmenter("ko", { granularity: "grapheme" })
  : null;

const splitGraphemes = (text) =>
  segmenter
    ? Array.from(segmenter.segment(text), (s) => s.segment)
    : Array.from(text);

async function typeText(text) {
  const chars = splitGraphemes(text);
  let buf = "";
  for (const ch of chars) {
    buf += ch;
    typer.textContent = buf;
    await sleep(TYPE_MS);
  }
}

async function deleteText() {
  const chars = splitGraphemes(typer.textContent);
  for (let i = chars.length - 1; i >= 0; i--) {
    typer.textContent = chars.slice(0, i).join("");
    await sleep(DELETE_MS);
  }
}

async function loop() {
  await sleep(HOLD_MS);
  let i = 0;
  while (true) {
    await deleteText();
    await sleep(GAP_MS);
    i = (i + 1) % phrases.length;
    await typeText(phrases[i]);
    await sleep(HOLD_MS);
  }
}

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduced) {
  loop();
}
