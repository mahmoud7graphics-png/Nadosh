function showNotifications() { document.getElementById('notificationsModal').classList.add('show'); }
function closeNotifications() { document.getElementById('notificationsModal').classList.remove('show'); }

function sendReply() {
    const textarea = document.querySelector('.contact-form textarea');
    const message = textarea.value.trim();
    
    if (message) {
        // حفظ الرسالة في localStorage
        let messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
        messages.push({
            text: message,
            time: new Date().toLocaleString('ar-EG')
        });
        localStorage.setItem('loveMessages', JSON.stringify(messages));
        
        // نجاح
        alert('تم إرسال ردك بنجاح! 💖');
        textarea.value = '';
    } else {
        alert('الرجاء كتابة ردك أولاً');
    }
}

function openLetterAnimation() {
    const letter = document.querySelector('.letter-elegant');
    letter.style.animation = 'letterPop 0.5s ease';
    setTimeout(() => {
        letter.style.animation = '';
    }, 500);
}

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
    if (e.key === 'Escape') { closeNotifications(); }
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
});