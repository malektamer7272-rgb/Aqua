// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll(’.reveal’);
const observer = new IntersectionObserver((entries) => {
entries.forEach((e, i) => {
if (e.isIntersecting) {
setTimeout(() => e.target.classList.add(‘visible’), i * 80);
}
});
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── LIVE DEATH COUNTER ──
let deaths = 0;
const ratePerSec = 3300 / 86400;
const counterEl = document.getElementById(‘deathCounter’);
let startTime = null;

function updateCounter(ts) {
if (!startTime) startTime = ts;
const elapsed = (ts - startTime) / 1000;
deaths = Math.floor(elapsed * ratePerSec);
counterEl.textContent = deaths.toLocaleString();
requestAnimationFrame(updateCounter);
}
requestAnimationFrame(updateCounter);

// ── SEVERITY BARS ANIMATION ON SCROLL ──
const barObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const fills = entry.target.querySelectorAll(’.severity-bar-fill’);
fills.forEach(bar => {
const target = bar.style.width;
bar.style.width = ‘0%’;
requestAnimationFrame(() => {
setTimeout(() => { bar.style.width = target; }, 100);
});
});
barObserver.unobserve(entry.target);
}
});
}, { threshold: 0.2 });

const table = document.querySelector(’.regions-table’);
if (table) barObserver.observe(table);

// ── NEWSLETTER SUBMIT ──
document.querySelector(’.newsletter-btn’).addEventListener(‘click’, function() {
const input = document.querySelector(’.newsletter-input’);
if (input.value && input.value.includes(’@’)) {
input.value = ‘’;
this.textContent = ‘Subscribed ✓’;
this.style.background = ‘#1a7a4a’;
setTimeout(() => {
this.textContent = ‘Subscribe’;
this.style.background = ‘’;
}, 3000);
} else {
input.style.borderColor = ‘#c23b22’;
setTimeout(() => { input.style.borderColor = ‘’; }, 2000);
}
});
