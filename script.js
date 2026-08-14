/* =============================================================
   Lekshmy S Jaya — Portfolio Script (Premium Pastel Theme)
============================================================= */
document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. TYPING ANIMATION ─────────────────────────────── */
    const typedEl = document.querySelector('#typed-text');
    const words = [
        'Generative AI Ecosystems',
        'MS 365 + Power Automate Courses',
        'NSQF Textbooks & Curriculum',
        'Agentic AI Workflows',
        'Power BI & Data Analytics',
        'Prompt Engineering Pipelines'
    ];
    let wi = 0, ci = 0;

    function type() {
        if (!typedEl) return;
        if (ci < words[wi].length) {
            typedEl.textContent += words[wi][ci++];
            setTimeout(type, 62);
        } else { setTimeout(erase, 1900); }
    }
    function erase() {
        if (ci > 0) {
            typedEl.textContent = words[wi].substring(0, --ci);
            setTimeout(erase, 34);
        } else {
            wi = (wi + 1) % words.length;
            setTimeout(type, 280);
        }
    }
    if (typedEl) setTimeout(type, 800);


    /* ── 2. NAVBAR ───────────────────────────────────────── */
    const navbar = document.querySelector('#navbar');
    const menuToggle = document.querySelector('#menu-toggle');
    const navLinksEl = document.querySelector('#nav-links');
    const navLinks = document.querySelectorAll('#nav-links a');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        scrollSpy();
    }, { passive: true });

    menuToggle?.addEventListener('click', () => {
        navLinksEl.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.className = navLinksEl.classList.contains('active')
            ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
    });
    navLinks.forEach(l => l.addEventListener('click', () => {
        navLinksEl.classList.remove('active');
        const icon = menuToggle?.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars-staggered';
    }));


    /* ── 3. SCROLL SPY ───────────────────────────────────── */
    const sections = document.querySelectorAll('section[id]');
    function scrollSpy() {
        const y = window.scrollY + 150;
        sections.forEach(s => {
            if (y >= s.offsetTop && y < s.offsetTop + s.clientHeight) {
                navLinks.forEach(l =>
                    l.classList.toggle('active', l.getAttribute('href') === `#${s.id}`)
                );
            }
        });
    }


    /* ── 4. PROJECT FILTER ───────────────────────────────── */
    document.querySelectorAll('.f-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            document.querySelectorAll('.proj-card').forEach(c =>
                c.classList.toggle('hide', f !== 'all' && c.dataset.category !== f)
            );
        });
    });


    /* ── 5. CONTACT FORM ─────────────────────────────────── */
    const form   = document.querySelector('#contactForm');
    const modal  = document.querySelector('#formStatus');
    const closeB = document.querySelector('#closeStatus');
    form?.addEventListener('submit', e => { e.preventDefault(); modal?.classList.remove('hidden'); });
    closeB?.addEventListener('click', () => { modal?.classList.add('hidden'); form?.reset(); });


    /* ── 6. INTERSECTION OBSERVER ────────────────────────── */
    // SVG ring circumference for r=30: 2π×30 ≈ 188.5
    const C = 2 * Math.PI * 30;

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            /* Fade-up reveal */
            if (el.classList.contains('reveal')) el.classList.add('visible');

            /* Animate bars */
            el.querySelectorAll('.ibar-fill[data-width]').forEach(b => {
                b.style.width = b.dataset.width + '%';
            });

            /* Animate SVG rings using data-pct */
            el.querySelectorAll('.r-fill[data-pct]').forEach(ring => {
                const pct = parseFloat(ring.dataset.pct);
                const offset = C * (1 - pct / 100);
                requestAnimationFrame(() => {
                    setTimeout(() => { ring.style.strokeDashoffset = offset; }, 80);
                });
            });

            io.unobserve(el);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    document.querySelectorAll('.wip-card, .eco-card, .glass.sk-card').forEach(el => io.observe(el));

});
