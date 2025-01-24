class ScrollAnimator {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.overlay = document.querySelector('.overlay');
        this.sections = Array.from(document.querySelectorAll('.scroll-section'));
        this.currentSection = -1;
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setInitialState();
        this.bindEvents();
        this.calculateHeight();
    }

    setInitialState() {
        this.sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
        });
    }

    calculateHeight() {
        const totalHeight = (this.sections.length + 1) * window.innerHeight;
        document.body.style.height = `${totalHeight}px`;
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => this.handleScroll());
        });
        window.addEventListener('resize', () => this.calculateHeight());
    }

    handleScroll() {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollProgress = scrollPosition / viewportHeight;

        // Handle hero and overlay fade
        if (scrollProgress <= 1) {
            const opacity = scrollProgress;
            this.overlay.style.opacity = opacity;
            this.hero.style.opacity = 1 - opacity;
        }

        // Handle sections
        this.sections.forEach((section, index) => {
            const sectionTrigger = (index + 1) * viewportHeight;
            const sectionOffset = scrollPosition - sectionTrigger;
            
            if (sectionOffset >= -viewportHeight * 0.5 && sectionOffset <= viewportHeight * 0.5) {
                if (!section.classList.contains('active')) {
                    section.classList.add('active');
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            } else {
                section.classList.remove('active');
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimator();
});
