// ── Year ──
const y = new Date().getFullYear();
document.querySelectorAll('#year, .year2, .year3').forEach(el => el.textContent = y);

// ── Pages ──
const pages = { home: 'page-home', blog: 'page-blog', projects: 'page-projects' };
let current = 'home';

function navigate(page) {
    if (page === current) return;
    const prev = document.getElementById(pages[current]);
    const next = document.getElementById(pages[page]);
    if (!next) return;
    prev.style.display = 'none';
    next.style.display = 'block';
    // re-trigger animation
    const content = next.querySelector('.page-content');
    if (content) { content.style.animation = 'none'; content.offsetHeight; content.style.animation = ''; }
    current = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Header scroll behavior ──
const header = document.getElementById('site-header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const s = window.scrollY;
    if (s > 20) header.classList.add('scrolled'); else header.classList.remove('scrolled');
    if (s < 150) { header.classList.remove('hidden'); }
    else if (s - lastScroll > 150) { header.classList.add('hidden'); lastScroll = s; }
    else if (lastScroll - s > 150) { header.classList.remove('hidden'); lastScroll = s; }
});

// ── Mobile drawer ──
function openDrawer() {
    document.getElementById('nav-drawer').classList.add('open');
    document.getElementById('nav-mask').classList.add('visible');
}
function closeDrawer() {
    document.getElementById('nav-drawer').classList.remove('open');
    document.getElementById('nav-mask').classList.remove('visible');
}

const toggleBtn = document.getElementById("theme-toggle");
const moon = toggleBtn.querySelector(".moon");
const sun = toggleBtn.querySelector(".sun");

function updateIcon(isDark) {
    if (isDark) {
        moon.style.display = "block";
        sun.style.display = "none";
    } else {
        moon.style.display = "none";
        sun.style.display = "block";
    }
}

// ── FIX: load saved theme on page load ──
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}

updateIcon(document.documentElement.classList.contains("dark"));

// toggle
toggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateIcon(isDark);
});