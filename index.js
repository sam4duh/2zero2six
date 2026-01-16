// Reference DOM elements
const gridElement = document.getElementById('grid');
const countdownElement = document.getElementById('countdown');

// Define start and end dates for the countdown
const startDate = new Date(2026, 0, 1);
const endDate = new Date(2026, 11, 31, 23, 59, 59);

/**
 * Updates the countdown display.
 */
function updateCountdown() {
  const now = new Date();
  const diff = endDate - now;

  if (diff <= 0) {
    countdownElement.textContent = "The year 2026 has ended.";
    return;
  }

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
}

/**
 * Renders the dot grid for the year.
 */
function renderGrid() {
  gridElement.innerHTML = '';

  const now = new Date();
  const todayIndex = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  for (let i = 0; i < totalDays; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    if (i < todayIndex) dot.classList.add('past');
    if (i === todayIndex) dot.classList.add('today');

    gridElement.appendChild(dot);
  }

  // Auto-scroll to the current day
  const todayDot = gridElement.querySelector('.dot.today');
  if (todayDot) {
    todayDot.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Initialize grid and countdown
renderGrid();
updateCountdown();
setInterval(updateCountdown, 1000);
