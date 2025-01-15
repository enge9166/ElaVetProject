const sections = document.querySelectorAll('.scroll-section');
const hero = document.querySelector('.hero');
const overlay = document.querySelector('.overlay');

window.addEventListener('scroll', checkSections);

checkSections();

function checkSections() {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    // Handle hero fade
    const scrollPosition = window.scrollY;
    const opacity = Math.min(scrollPosition / 300, 0.8);
    overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
    
    if (scrollPosition > 100) {
        hero.querySelector('h1').style.opacity = '0';
        hero.querySelector('.subtitle').style.opacity = '0';
    } else {
        hero.querySelector('h1').style.opacity = '1';
        hero.querySelector('.subtitle').style.opacity = '1';
    }

    // Handle sections animation
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if(sectionTop < triggerBottom) {
            section.classList.add('show');
        } else {
            section.classList.remove('show');
        }
    });
}