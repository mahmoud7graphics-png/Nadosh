function showNotifications() { document.getElementById('notificationsModal').classList.add('show'); }
function closeNotifications() { document.getElementById('notificationsModal').classList.remove('show'); }

function revealMemoryV2(card) { card.classList.toggle('reveal'); }

function revealPhoto(item) {
    item.style.transform = 'scale(0.95)';
    setTimeout(() => {
        item.style.transform = 'scale(1)';
    }, 200);
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

// التحميل المسبق للصور والفيديو
function preloadMedia() {
    const images = [
        'https://i.ibb.co/JRf44vMB/file-00000000d208820a833056c330ff0277.png',
        'https://i.ibb.co/twV4dRsw/file-0000000004308246820734a6349eb178.png',
        'https://i.ibb.co/KcWphCtk/file-000000006e2481f49260786d8ebf1518.png',
        'https://i.ibb.co/93SM22Br/file-0000000060dc8246bd64e12130ccef2e.png',
        'https://i.ibb.co/YFKxHV4Y/file-00000000c19c81f4ad564bee194e8a58.png',
        'https://i.ibb.co/4R25zqwk/file-00000000cf3c81f4b0cb75ebc7f5d036.png',
        'https://i.ibb.co/BkyjT0s/file-00000000792c81f4a764b842fcec7b8b.png',
        'https://i.ibb.co/F4kkRprZ/file-00000000f8a0824695ad36d0ee1e6930.png',
        'https://i.ibb.co/7tNY4Rk2/file-00000000d5a0820aab68fc7df187adfb.png',
        'https://i.ibb.co/yngGfCNz/file-00000000462481f49dbbb58bf3a8f51a.png',
        'https://i.ibb.co/Tpx19L8/file-000000009e048243bffb4cb4acd308c8.png',
        'https://i.ibb.co/vN4WYHp/file-00000000f4e0820aa4f46e38d2474753.png',
        'https://i.ibb.co/tMw61cRx/file-0000000020248246b916978334158865.png',
        'https://i.ibb.co/G4CRJQ7H/file-00000000ba1c81f4a08e8d4bc168a108.png'
    ];
    
    // تحميل مسبق للصور
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // تحميل مسبق للفيديو
    const video = document.querySelector('video');
    if (video) {
        video.preload = 'auto';
        video.load();
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeNotifications(); }
});

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    // بدء التحميل المسبق فوراً
    preloadMedia();
    
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