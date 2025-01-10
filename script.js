document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.overlay');
    const content = document.querySelector('.content');
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.subtitle');
    const videoSection = document.querySelector('.video-section');
    const statistics = document.querySelector('.statistics');

    let lastScrollTime = Date.now();
    let scrollAccumulator = 0;
    const scrollThreshold = 300;
    const statsThreshold = 600;
    const videoThreshold = 900;
    const throttleDelay = 16;

    const updateAnimations = (e) => {
        const currentTime = Date.now();
        if (currentTime - lastScrollTime < throttleDelay) return;
        lastScrollTime = currentTime;

        scrollAccumulator += e.deltaY;
        scrollAccumulator = Math.min(Math.max(scrollAccumulator, 0), videoThreshold);

        const initialProgress = Math.min(scrollAccumulator / scrollThreshold, 1);
        const statsProgress = Math.max(0, Math.min((scrollAccumulator - scrollThreshold) / (statsThreshold - scrollThreshold), 1));
        const videoProgress = Math.max(0, (scrollAccumulator - statsThreshold) / (videoThreshold - statsThreshold));

        requestAnimationFrame(() => {
            overlay.style.background = `rgba(0, 0, 0, ${initialProgress * 0.9})`;
            heroTitle.style.opacity = `${1 - initialProgress}`;
            heroSubtitle.style.opacity = `${1 - initialProgress}`;
            
            statistics.style.opacity = statsProgress;
            statistics.style.transform = `translateY(${20 - (statsProgress * 20)}px)`;
            
            videoSection.style.opacity = videoProgress;
            videoSection.style.transform = `translateY(${20 - (videoProgress * 20)}px)`;

            content.classList.toggle('visible', initialProgress > 0.8);
        });
    };

    window.addEventListener('wheel', updateAnimations, { passive: true });
});