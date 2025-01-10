document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.overlay');
    const content = document.querySelector('.content');
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.subtitle');
    const videoSection = document.querySelector('.video-section');
    const statistics = document.querySelector('.statistics');
    let scrollAccumulator = 0;
    const scrollThreshold = 300;
    const videoThreshold = 600; // Increased threshold for video
    
    window.addEventListener('wheel', (e) => {
        scrollAccumulator += e.deltaY;
        scrollAccumulator = Math.min(Math.max(scrollAccumulator, 0), videoThreshold);
        
        // Calculate progress for initial content
        const initialProgress = Math.min(scrollAccumulator / scrollThreshold, 1);
        
        // Calculate progress for video section
        const videoProgress = Math.max(0, (scrollAccumulator - scrollThreshold) / (videoThreshold - scrollThreshold));
        
        // Apply smooth transitions
        overlay.style.background = `rgba(0, 0, 0, ${initialProgress * 0.9})`;
        heroTitle.style.opacity = `${1 - initialProgress}`;
        heroSubtitle.style.opacity = `${1 - initialProgress}`;
        
        // Fade out statistics as video fades in
        statistics.style.opacity = `${1 - videoProgress}`;
        statistics.style.transform = `translateY(${videoProgress * -20}px)`;
        
        // Video section fade in
        videoSection.style.opacity = videoProgress;
        videoSection.style.transform = `translateY(${20 - (videoProgress * 20)}px)`;
        
        // Toggle content visibility
        if (initialProgress > 0.8 && !content.classList.contains('visible')) {
            content.classList.add('visible');
        } else if (initialProgress < 0.2 && content.classList.contains('visible')) {
            content.classList.remove('visible');
        }
    });
});