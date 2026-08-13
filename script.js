/* -------------------------------------------------------------
   Lekshmy S Jaya 
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Dynamic AI Typing Animation
    const typedTextSpan = document.querySelector("#typed-text");
    const textArray = [
        "AI-Powered Learning Systems", 
        "NSQF Curriculum Pipelines", 
        "UiPath & Power Automate RPA", 
        "Power BI & DAX Decision Dashboards"
    ];
    const typingSpeed = 60;
    const erasingSpeed = 35;
    const newTextDelay = 1800;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingSpeed + 300);
        }
    }

    if (typedTextSpan) {
        setTimeout(type, 700);
    }


    // 2. Navbar Scroll Style & Mobile Toggle
    const navbar = document.querySelector("#navbar");
    const menuToggle = document.querySelector("#menu-toggle");
    const navLinksContainer = document.querySelector("#nav-links");
    const navLinks = document.querySelectorAll("#nav-links a");

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars-staggered';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars-staggered';
        });
    });


    // 3. Project Filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });


    // 4. Scroll Spy
    const sections = document.querySelectorAll("section");
    
    window.addEventListener('scroll', () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // 5. Contact Form Mock Submit Handler
    const contactForm = document.querySelector("#contactForm");
    const formStatusModal = document.querySelector("#formStatus");
    const closeStatusBtn = document.querySelector("#closeStatus");

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (formStatusModal) {
                formStatusModal.classList.remove('hidden');
            }
        });
    }

    if (closeStatusBtn) {
        closeStatusBtn.addEventListener('click', () => {
            if (formStatusModal) {
                formStatusModal.classList.add('hidden');
            }
            if (contactForm) {
                contactForm.reset();
            }
        });
    }
});
