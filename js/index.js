function showNotifications() { document.getElementById('notificationsModal').classList.add('show'); }
function closeNotifications() { document.getElementById('notificationsModal').classList.remove('show'); }

function createParticles() {
    const container = document.getElementById('particles');
    const count = window.innerWidth < 768 ? 15 : 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 30 + 10;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDuration = Math.random() * 15 + 10 + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(p);
    }
}

function animateStat(card) {
    const numberElement = card.querySelector('.stat-number');
    const target = parseInt(numberElement.dataset.target);
    if (!target || numberElement.textContent === '∞') return;
    let current = 0;
    const increment = target / 30;
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        numberElement.textContent = Math.floor(current);
    }, 50);
}

function createRipple(event) {
    const btn = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function playGreeting() { alert('أهلاً بكِ في رحلتك الخاصة!'); }

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeNotifications(); }
});

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    document.querySelectorAll('.stat-card').forEach(card => animateStat(card));
    
    const page = document.querySelector('.page');
    if (page) {
        page.style.animation = 'pageEnter 0.3s ease-out both';
    }
    
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.endsWith('.html') && !href.startsWith('#')) {
                if (this.classList.contains('feature-card')) {
                    e.preventDefault();
                } else {
                    e.preventDefault();
                    const page = document.querySelector('.page');
                    if (page) {
                        page.style.animation = 'pageExit 0.2s ease-in both';
                    }
                    setTimeout(() => {
                        window.location.href = href;
                    }, 200);
                }
            }
        });
    });
    
    document.getElementById('notificationsModal').addEventListener('click', function(e) {
        if (e.target === this) closeNotifications();
    });
});