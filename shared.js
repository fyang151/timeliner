function needsDarkText(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function timeToSeconds(t) {
  const [h, m] = t.split(":").map(Number);
  return 86400 + h * 3600 + m * 60;
}

function secondsToTimeString(s) {
  s = ((Math.floor(s) % 86400) + 86400) % 86400;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
}

function nowSeconds() {
  const now = new Date();
  return 86400 + now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

function decodeState(hash) {
  try {
    return JSON.parse(atob(hash.replace(/^#/, "")));
  } catch {
    return null;
  }
}

function spanDuration(startSec, endSec) {
  return endSec > startSec ? endSec - startSec : endSec + 86400 - startSec;
}

function buildTickLabels(container, startSec, cellCount, intervalSec) {
  container.innerHTML = "";
  for (let i = 0; i < cellCount; i++) {
    const span = document.createElement("span");
    span.className = "tick-label";
    span.textContent = secondsToTimeString(startSec + i * intervalSec);
    container.appendChild(span);
  }
  const endSpan = document.createElement("span");
  endSpan.className = "tick-label tick-label-end";
  endSpan.textContent = secondsToTimeString(startSec + cellCount * intervalSec);
  container.appendChild(endSpan);
}

function buildRowBackground(cellCount) {
  const bg = document.createElement("div");
  bg.className = "row-grid";
  for (let i = 0; i < cellCount; i++) {
    const c = document.createElement("div");
    c.className = "cell-bg";
    bg.appendChild(c);
  }
  return bg;
}

function updateTimeIndicator(indicatorEl, startSec, endSec, nowSec) {
  const duration = spanDuration(startSec, endSec);
  const elapsed =
    nowSec >= startSec ? nowSec - startSec : nowSec + 86400 - startSec;
  if (elapsed < 0 || elapsed > duration) {
    indicatorEl.style.display = "none";
    return;
  }
  indicatorEl.style.left = (elapsed / duration) * 100 + "%";
  indicatorEl.style.display = "block";
}
