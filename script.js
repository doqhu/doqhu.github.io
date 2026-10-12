// Marks the page as scripted before it paints: the scroll reveal hides content only under `.js`,
// so with JavaScript off every section stays visible.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');

    if (!('IntersectionObserver' in window)) {
        fadeElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    console.log("%cHello there! 👋 looking for clean code?", "font-family: monospace; font-size: 20px; font-weight: bold; color: #ffb000; background: #0a0803;");
    console.log("Feel free to inspect the source. It's built with vanilla JS & CSS for maximum performance, just like my backends.");
});
