/* ============================================
   SCRIPT DE LA LANDING PAGE
   El Buen Vestir
   ============================================ */

let currentTestimonio = 1;

// ============================================
// SLIDER DE TESTIMONIOS
// ============================================

function currentSlide(n) {
    showSlide(currentTestimonio = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.testimonio-card');
    const dots = document.querySelectorAll('.dot');

    if (n > slides.length) {
        currentTestimonio = 1;
    }
    if (n < 1) {
        currentTestimonio = slides.length;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentTestimonio - 1].classList.add('active');
    dots[currentTestimonio - 1].classList.add('active');
}

function nextSlide() {
    showSlide(currentTestimonio += 1);
}

function prevSlide() {
    showSlide(currentTestimonio -= 1);
}

// ============================================
// EVENTO LISTENERS PARA BOTONES DEL SLIDER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Auto-rotation de testimonios cada 8 segundos
    setInterval(nextSlide, 8000);

    // Inicializar el primer testimonio
    showSlide(currentTestimonio);

    // ========================================
    // ANIMACIÓN AL HACER SCROLL
    // ========================================
    observeElementsOnScroll();

    // ========================================
    // ANIMACIÓN AL CARGAR LA PÁGINA
    // ========================================
    animateOnLoad();
});

// ============================================
// OBSERVER PARA ANIMACIONES AL HACER SCROLL
// ============================================

function observeElementsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar elementos que aparecen al hacer scroll
    const elements = document.querySelectorAll('.servicio-card, .razon-card, .info-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// ANIMACIONES AL CARGAR LA PÁGINA
// ============================================

function animateOnLoad() {
    // Animar el contenido del hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'slideInUp 0.8s ease-out';
    }

    // Animar la barra de navegación
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.animation = 'slideDown 0.6s ease-out';
    }
}

// ============================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // No prevenir el comportamiento por defecto si es un enlace de control del slider
        if (href === '#' || this.classList.contains('slider-btn')) {
            return;
        }

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80; // Altura del navbar sticky
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// EFECTO DE HIGHLIGHT EN LA NAVEGACIÓN
// ============================================

window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY;

    const sections = [
        { id: 'servicios', element: document.getElementById('servicios') },
        { id: 'por-que', element: document.getElementById('por-que') },
        { id: 'contacto', element: document.getElementById('contacto') }
    ];

    sections.forEach(section => {
        if (section.element) {
            const sectionTop = section.element.offsetTop - 100;
            const sectionBottom = sectionTop + section.element.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.style.color = '#333';
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.style.color = '#0099FF';
                    }
                });
            }
        }
    });
});

// ============================================
// AGREGAR ANIMACIÓN SLIDEDOWN AL CSS SI NO EXISTE
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// LOGGING PARA DEBUGGING (Opcional)
// ============================================

console.log('✅ Script de El Buen Vestir cargado correctamente');
console.log('Funciones disponibles:');
console.log('- currentSlide(n): Ir al testimonio número n');
console.log('- nextSlide(): Siguiente testimonio');
console.log('- prevSlide(): Testimonio anterior');
