function showNotifications() { document.getElementById('notificationsModal').classList.add('show'); }
function closeNotifications() { document.getElementById('notificationsModal').classList.remove('show'); }

function openLoveDialog() { document.getElementById('loveDialog').classList.add('show'); document.body.style.overflow = 'hidden'; }
function closeLoveDialog() { document.getElementById('loveDialog').classList.remove('show'); document.body.style.overflow = ''; }

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

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeNotifications(); closeLoveDialog(); }
});

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    const page = document.querySelector('.page');
    if (page) {
        page.style.animation = 'pageEnter 0.3s ease-out both';
    }
    
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.endsWith('.html') && !href.startsWith('#')) {
                e.preventDefault();
                const page = document.querySelector('.page');
                if (page) {
                    page.style.animation = 'pageExit 0.2s ease-in both';
                }
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            }
        });
    });
    
    document.getElementById('notificationsModal').addEventListener('click', function(e) {
        if (e.target === this) closeNotifications();
    });
    document.getElementById('loveDialog').addEventListener('click', function(e) {
        if (e.target === this) closeLoveDialog();
    });
});