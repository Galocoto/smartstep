// main.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Smartstep Associates landing page loaded.');

    // Hero Scroll & Mouse Parallax
    const heroSection = document.querySelector('.hero-section');
    const navbar = document.querySelector('.navbar');
    const heroBg = document.querySelector('.hero-bg');
    const heroImg = document.querySelector('.hero-img');
    const heroContent = document.querySelector('.hero-content');
    
    // Lower Section Reveal via IntersectionObserver
    const lowerSection = document.querySelector('.lower-section');
    if (lowerSection) {
        const lowerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lowerSection.classList.add('is-visible');
                    lowerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -40px 0px'
        });
        lowerObserver.observe(lowerSection);
    }
    
    let scrolled = 0;

    // Listen to scroll (optimized)
    window.addEventListener('scroll', () => {
        scrolled = window.scrollY;
        
        // Sticky navbar effect via CSS class
        if (navbar) {
            if (scrolled > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }, { passive: true });
    
    // Animation Loop for buttery-smooth updates (lerp)
    function animate() {
        const vpHeight = window.innerHeight;
        
        // 1. Hero Parallax (only if visible)
        if (scrolled < vpHeight) {
            // Background (slower scroll parallax)
            if (heroBg) {
                const bgScrollY = scrolled * 0.12;
                heroBg.style.transform = `translate3d(0, ${bgScrollY}px, 0) scale(1.15)`;
            }
            
            // Student Image (slightly faster scroll parallax for a fine 3D separation)
            if (heroImg) {
                const imgScrollY = scrolled * 0.20;
                heroImg.style.transform = `translate3d(0, ${imgScrollY}px, 0)`;
            }
            
            // Hero Content Text (slowest scroll parallax rate)
            if (heroContent) {
                const contentScrollY = scrolled * 0.08;
                heroContent.style.transform = `translate3d(0, ${contentScrollY}px, 0)`;
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation loop
    animate();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Interactive Level Tabs for Clases Online en Vivo
    const levelData = {
        a1: {
            pill: 'Nivel A1 · Principiante Absoluto',
            title: 'Construye tus bases sólidas desde cero',
            desc: 'Aprende a comunicarte en situaciones cotidianas básicas, presentarte, hacer preguntas y comprender conversaciones sencillas con pronunciación correcta desde el primer día.',
            objective: 'Conversación inicial, fonética inglesa y vocabulario esencial (800+ palabras).',
            schedules: ['07:00 - 08:00', '09:00 - 10:00', '11:00 - 12:00', '14:00 - 15:00', '16:00 - 17:00', '18:00 - 19:00', '19:30 - 20:30', '21:00 - 22:00']
        },
        a2: {
            pill: 'Nivel A2 · Básico / Elemental',
            title: 'Fluidez cotidiana y confianza comunicativa',
            desc: 'Describe experiencias, desenvuélvete en viajes, compras y expresa planes futuros con respuestas espontáneas sin traducir en tu mente.',
            objective: 'Estructuras gramaticales cotidianas, tiempos pasados y futuros en diálogos reales.',
            schedules: ['07:30 - 08:30', '09:30 - 10:30', '11:30 - 12:30', '14:30 - 15:30', '16:30 - 17:30', '18:30 - 19:30', '20:00 - 21:00', '21:30 - 22:30']
        },
        b1: {
            pill: 'Nivel B1 · Intermedio',
            title: 'Conversaciones complejas y expresión de opiniones',
            desc: 'Participa con soltura en conversaciones sobre temas de actualidad, redacción de correos formales y comprensión de hablantes nativos a velocidad estándar.',
            objective: 'Fluidez para conectar ideas, vocabulario técnico inicial y reducción drástica de pausas.',
            schedules: ['08:00 - 09:00', '10:00 - 11:00', '12:00 - 13:00', '15:00 - 16:00', '17:00 - 18:00', '19:00 - 20:00', '20:30 - 21:30', '22:00 - 23:00']
        },
        b2: {
            pill: 'Nivel B2 · Intermedio Alto / Profesional',
            title: 'Inglés profesional para trabajo y negocios globales',
            desc: 'Comunícate con espontaneidad y naturalidad sin esfuerzo. Prepárate para entrevistas laborales internacionales, presentaciones ejecutivas y negociaciones en inglés.',
            objective: 'Dominio de modismos (idioms), argumentación crítica y vocabulario corporativo avanzado.',
            schedules: ['07:00 - 08:00', '09:00 - 10:00', '11:00 - 12:00', '14:00 - 15:00', '16:00 - 17:00', '18:00 - 19:00', '19:30 - 20:30', '21:00 - 22:00']
        },
        c1: {
            pill: 'Nivel C1 - C2 · Avanzado & Bilingüe',
            title: 'Fluidez nativa y preparación de certificaciones',
            desc: 'Uso flexible y efectivo del idioma para fines académicos y profesionales de alto impacto. Preparación especializada para TOEFL, IELTS y Cambridge.',
            objective: 'Precisión estilística, acentos internacionales, velocidad nativa y redacción ejecutiva.',
            schedules: ['08:00 - 09:00', '10:00 - 11:00', '12:00 - 13:00', '15:00 - 16:00', '17:00 - 18:00', '19:00 - 20:00', '20:30 - 21:30', '21:30 - 22:30']
        }
    };

    const levelTabs = document.querySelectorAll('.level-tab');
    const detailPill = document.getElementById('detail-pill');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    const detailObjective = document.getElementById('detail-objective');
    const detailSchedule = document.getElementById('detail-schedule');
    const levelCard = document.getElementById('level-display');

    if (levelTabs.length > 0 && detailTitle) {
        levelTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const levelKey = tab.getAttribute('data-level');
                const data = levelData[levelKey];
                if (!data) return;

                // Update active tab
                levelTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                // Subtle card transition
                if (levelCard) {
                    levelCard.style.opacity = '0.4';
                    levelCard.style.transform = 'translateY(6px)';
                }

                setTimeout(() => {
                    if (detailPill) detailPill.textContent = data.pill;
                    if (detailTitle) detailTitle.textContent = data.title;
                    if (detailDesc) detailDesc.textContent = data.desc;
                    if (detailObjective) detailObjective.textContent = data.objective;

                    if (detailSchedule) {
                        detailSchedule.innerHTML = data.schedules
                            .map(time => `<span class="schedule-pill">${time}</span>`)
                            .join('');
                    }

                    if (levelCard) {
                        levelCard.style.opacity = '1';
                        levelCard.style.transform = 'translateY(0)';
                    }
                }, 120);
            });
        });
    }

    // --- Mobile Hamburger Menu ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        const toggleMenu = (forceState) => {
            const isOpen = forceState !== undefined ? forceState : !navLinks.classList.contains('active');
            navLinks.classList.toggle('active', isOpen);
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
            document.body.classList.toggle('menu-open', isOpen);
        };

        menuToggle.addEventListener('click', () => toggleMenu());

        // Close menu when clicking any nav item
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu(false);
                }
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu(false);
            }
        });
    }

    // --- FAQ Accordion Toggle ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const iconSpan = item.querySelector('.faq-icon');

        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Optional: close other open items for cleaner accordion
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherBtn = otherItem.querySelector('.faq-question');
                        const otherIcon = otherItem.querySelector('.faq-icon');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                        if (otherIcon) otherIcon.textContent = '+';
                    }
                });

                if (isActive) {
                    item.classList.remove('active');
                    questionBtn.setAttribute('aria-expanded', 'false');
                    if (iconSpan) iconSpan.textContent = '+';
                } else {
                    item.classList.add('active');
                    questionBtn.setAttribute('aria-expanded', 'true');
                    if (iconSpan) iconSpan.textContent = '−';
                }
            });
        }
    });

    // --- Admission Form Submission with Interactive Feedback ---
    const admissionForm = document.getElementById('admissionForm');
    const formFeedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('submitBtn');

    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const phone = document.getElementById('phone')?.value.trim();
            const campus = document.getElementById('campus')?.value;
            const course = document.getElementById('course')?.value;

            if (!fullName || !email || !phone || !campus || !course) {
                if (formFeedback) {
                    formFeedback.className = 'form-feedback error show';
                    formFeedback.innerHTML = '⚠️ Por favor completa todos los campos requeridos para coordinar tu nivelación.';
                }
                return;
            }

            // Button loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="btn-spinner"></span> Enviando solicitud...';
            }

            // Simulate server response
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span class="btn-text">Enviar solicitud y reservar nivelación</span>';
                }

                if (formFeedback) {
                    formFeedback.className = 'form-feedback success show';
                    formFeedback.innerHTML = `✅ <strong>¡Solicitud recibida con éxito, ${fullName}!</strong><br>Un asesor académico te contactará al <strong>${phone}</strong> para agendar tu test de nivelación gratuito.`;
                }

                admissionForm.reset();

                // Auto hide feedback after 8 seconds
                setTimeout(() => {
                    if (formFeedback) {
                        formFeedback.classList.remove('show');
                    }
                }, 8000);
            }, 1000);
        });
    }

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
