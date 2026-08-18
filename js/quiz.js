let quizCurrentQuestion = 1;
let quizAnswers = [false, false, false];

function showNotifications() { document.getElementById('notificationsModal').classList.add('show'); }
function closeNotifications() { document.getElementById('notificationsModal').classList.remove('show'); }

const quizData = [
    { question: 'ما هو أفضل وقت في اليوم بالنسبة لكِ؟', options: ['الصباح الباكر', 'الظهيرة', 'المساء', 'منتصف الليل'], feedback: 'اختيار رائع!' },
    { question: 'لو اخترتِ رحلة سريعة، أين تذهبين؟', options: ['شاطئ البحر', 'الجبال', 'مدينة تاريخية', 'الغابة'], feedback: 'اختيار مميز!' },
    { question: 'ما الذي يسعدكِ بسرعة؟', options: ['رسالة لطيفة', 'حلوى لذيذة', 'أغنية قديمة', 'نزهة قصيرة'], feedback: 'جميل!' }
];

function selectQuizOption(element) {
    document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    quizAnswers[quizCurrentQuestion - 1] = true;
    const feedback = document.getElementById('quizFeedback');
    feedback.style.display = 'block';
    feedback.innerHTML = `<i class="fas fa-heart"></i> ${quizData[quizCurrentQuestion - 1].feedback}`;
    if (quizAnswers.every(a => a)) {
        const nextBtn = document.getElementById('quizNextBtn');
        nextBtn.style.pointerEvents = 'auto';
        nextBtn.style.opacity = '1';
    }
    setTimeout(() => {
        if (quizCurrentQuestion < 3) {
            quizCurrentQuestion++;
            document.getElementById('quizQuestion').textContent = quizData[quizCurrentQuestion - 1].question;
            const optionsContainer = document.getElementById('quizOptions');
            optionsContainer.innerHTML = '';
            const icons = ['fa-sun', 'fa-cloud-sun', 'fa-moon', 'fa-star'];
            quizData[quizCurrentQuestion - 1].options.forEach((option, index) => {
                const div = document.createElement('div');
                div.className = 'quiz-option';
                div.onclick = function() { selectQuizOption(this); };
                div.innerHTML = `<i class="fas ${icons[index]}"></i> ${option}`;
                optionsContainer.appendChild(div);
            });
            document.querySelectorAll('.quiz-step').forEach((step, i) => {
                step.classList.remove('active');
                if (i < quizCurrentQuestion - 1) step.classList.add('completed');
                else if (i === quizCurrentQuestion - 1) step.classList.add('active');
            });
            feedback.style.display = 'none';
        } else {
            feedback.innerHTML = '<i class="fas fa-trophy"></i> أحسنت! أكملت الاختبار';
            document.querySelectorAll('.quiz-step').forEach(step => { step.classList.add('completed'); step.classList.remove('active'); });
        }
    }, 1500);
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