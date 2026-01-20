// Console log to verify JavaScript is loaded
console.log("Website loaded successfully!");

// Toggle accordion service cards
function toggleService(element) {
    const serviceCard = element.parentElement;
    const isActive = serviceCard.classList.contains('active');
    
    // Close all other accordions
    document.querySelectorAll('.service.accordion').forEach(card => {
        card.classList.remove('active');
    });
    
    // Toggle current accordion
    if (!isActive) {
        serviceCard.classList.add('active');
    }
}

// ============================================
// MODERN UI/UX ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // 2. Sticky Nav
    const nav = document.querySelector('.main-nav');
    
    // 3. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections and elements for animation
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .workflow-step, .college-text, .workflow-intro-box, .cta-text, .college-graph-image, .workflow-lead, .workflow-note'
    );
    
    // Observe section headings separately for better control
    const sectionHeadings = document.querySelectorAll(
        '.how-i-work h2, .college-section h2, .video-section h2, .cta-text h2'
    );
    
    animatedElements.forEach((el, index) => {
        if (!el.classList.contains('college-graph-image')) {
            el.classList.add('animate-on-scroll');
        }
        observer.observe(el);
    });
    
    // Observe section headings
    sectionHeadings.forEach((heading) => {
        heading.classList.add('animate-on-scroll');
        observer.observe(heading);
    });
    
    // Observe college graph image separately
    const collegeGraph = document.querySelector('.college-graph-image');
    if (collegeGraph) {
        observer.observe(collegeGraph);
    }
    
    // Special handling for workflow steps - stagger delay
    document.querySelectorAll('.workflow-step').forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Special handling for timeline items - stagger delay
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.08}s`;
    });
    
    // 4. Apple-style Scroll Zoom Effect for Hero Section
    let scrollZoomTicking = false;
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    function initScrollZoom() {
        if (!heroSection || !heroContent) return;
        
        function updateScrollZoom() {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            const heroTop = heroSection.offsetTop;
            const heroBottom = heroTop + heroHeight;
            
            // Only apply zoom when scrolling within hero section
            if (scrolled >= heroTop && scrolled < heroBottom) {
                // Calculate scroll progress (0 to 1) within hero section
                const scrollProgress = (scrolled - heroTop) / heroHeight;
                
                // Clamp between 0 and 1
                const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);
                
                // Scale from 1.0 to 1.3 (30% zoom)
                const scale = 1 + (clampedProgress * 0.3);
                
                // Fade out as we zoom (opacity from 1 to 0.7)
                const opacity = 1 - (clampedProgress * 0.3);
                
                // Apply transforms
                heroContent.style.transform = `scale(${scale})`;
                heroContent.style.opacity = opacity;
            } else if (scrolled < heroTop) {
                // Reset when above hero
                heroContent.style.transform = 'scale(1)';
                heroContent.style.opacity = '1';
            } else {
                // Keep final state when past hero
                heroContent.style.transform = 'scale(1.3)';
                heroContent.style.opacity = '0.7';
            }
            
            scrollZoomTicking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!scrollZoomTicking) {
                window.requestAnimationFrame(updateScrollZoom);
                scrollZoomTicking = true;
            }
        });
        
        // Initial call to set correct state
        updateScrollZoom();
    }
    
    initScrollZoom();
    
    // 6. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 7. Add scroll fade effect to sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // 8. Enhanced CTA button interaction
    const ctaButtons = document.querySelectorAll('.cta');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 9. Dark Mode / Night Shift Toggle
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Apply saved theme on load
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
        
        // Toggle theme on button click
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                
                // Save preference
                const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
                localStorage.setItem('theme', currentTheme);
            });
        }
    }
    
    initThemeToggle();
    
    // 10. Custom Cursor Implementation
    function initCustomCursor() {
        const cursor = document.getElementById('custom-cursor');
        if (!cursor) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor follow animation
        function animateCursor() {
            // Easing for smooth following
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.1; // Adjust 0.1 for speed (lower = slower/smoother)
            cursorY += dy * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Add hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .cta, .theme-toggle, .nav-links a, input, textarea, select');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
        
        // Click animation
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
    }
    
    initCustomCursor();
    
    // 11. Video error handling
    const wolfVideo = document.getElementById('wolf-video');
    if (wolfVideo) {
        wolfVideo.addEventListener('error', function(e) {
            console.error('Video error:', e);
            const errorDiv = document.getElementById('video-error');
            if (errorDiv) {
                errorDiv.style.display = 'block';
            }
        });
        
        // Check if video can play
        wolfVideo.addEventListener('loadedmetadata', function() {
            console.log('Video metadata loaded');
        });
        
        wolfVideo.addEventListener('canplay', function() {
            console.log('Video can play');
        });
    }
    
});