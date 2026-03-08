function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(m) {
  return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
}

function decodeState(hash) {
  try { return JSON.parse(atob(hash.replace(/^#/, ''))); } catch { return null; }
}

function spanDuration(startMin, endMin) {
  return endMin > startMin ? endMin - startMin : endMin + 1440 - startMin;
}

function buildTickLabels(container, startMin, cellCount, interval) {
  container.innerHTML = '';
  for (let i = 0; i < cellCount; i++) {
    const span = document.createElement('span');
    span.className = 'tick-label';
    span.textContent = minutesToTime((startMin + i * interval) % 1440);
    container.appendChild(span);
  }
}

function buildRowBackground(cellCount) {
  const bg = document.createElement('div');
  bg.className = 'row-grid';
  for (let i = 0; i < cellCount; i++) {
    const c = document.createElement('div');
    c.className = 'cell-bg';
    bg.appendChild(c);
  }
  return bg;
}

function updateTimeIndicator(indicatorEl, startMin, endMin, nowMin) {
  const duration = spanDuration(startMin, endMin);
  const elapsed = nowMin >= startMin ? nowMin - startMin : nowMin + 1440 - startMin;
  if (elapsed < 0 || elapsed > duration) { indicatorEl.style.display = 'none'; return; }
  indicatorEl.style.left = (elapsed / duration * 100) + '%';
  indicatorEl.style.display = 'block';
}
