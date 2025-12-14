document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
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

    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    fadeElements.forEach(el => observer.observe(el));

    console.log("%cHello there! 👋 looking for clean code?", "font-size: 20px; font-weight: bold; color: #3b82f6;");
    console.log("Feel free to inspect the source. It's built with vanilla JS & CSS for maximum performance, just like my backends.");
});
