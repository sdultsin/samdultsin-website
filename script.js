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
    
    // 2. Sticky Nav – add scrolled class when user scrolls
    const nav = document.querySelector('.main-nav');
    if (nav) {
        const scrollThreshold = 50;
        function updateNavScrolled() {
            if (window.scrollY > scrollThreshold) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', () => {
            if (!window.requestAnimationFrame) {
                updateNavScrolled();
            } else {
                requestAnimationFrame(updateNavScrolled);
            }
        });
        updateNavScrolled();
    }
    
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
        '.how-i-work h2, .college-section h2, .cta-text h2'
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
        
        function updateThemeLabel() {
            if (themeToggle) {
                themeToggle.setAttribute('aria-label', body.classList.contains('dark-mode') ? 'Switch to light mode' : 'Toggle dark mode');
            }
        }
        updateThemeLabel();
        
        // Toggle theme on button click
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                updateThemeLabel();
                
                // Save preference
                const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
                localStorage.setItem('theme', currentTheme);
            });
        }
    }
    
    initThemeToggle();

    // ============================================
    // ENHANCED UI/UX EFFECTS
    // ============================================

    // 10. Parallax Effect for Hero Image
    function initParallax() {
        const heroImage = document.querySelector('.hero-image img');
        if (!heroImage) return;

        let parallaxTicking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero');
            if (!heroSection) return;

            const heroHeight = heroSection.offsetHeight;

            if (scrolled < heroHeight) {
                const parallaxOffset = scrolled * 0.15;
                const rotateX = scrolled * 0.02;
                heroImage.style.transform = `translateY(${parallaxOffset}px) rotateX(${rotateX}deg)`;
            }

            parallaxTicking = false;
        }

        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                requestAnimationFrame(updateParallax);
                parallaxTicking = true;
            }
        });
    }

    initParallax();

    // 11. Animated Number Counters
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        if (counters.length === 0) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 6000; // 6 seconds
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Easing function for smooth animation
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const currentValue = Math.floor(easeOutQuart * target);

                        counter.textContent = currentValue;

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    initCounters();

    // 12. Timeline Line Fill Animation
    function initTimelineFill() {
        const timelineContainer = document.querySelector('.timeline-container');
        const timelineFill = document.querySelector('.timeline-line-fill');
        if (!timelineContainer || !timelineFill) return;

        let timelineTicking = false;

        function updateTimelineFill() {
            const containerRect = timelineContainer.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerHeight = containerRect.height;
            const windowHeight = window.innerHeight;

            // Calculate how much of the timeline is visible/passed
            const scrollProgress = (windowHeight - containerTop) / (containerHeight + windowHeight);
            const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);

            timelineFill.style.height = `${clampedProgress * 100}%`;

            timelineTicking = false;
        }

        window.addEventListener('scroll', () => {
            if (!timelineTicking) {
                requestAnimationFrame(updateTimelineFill);
                timelineTicking = true;
            }
        });

        // Initial call
        updateTimelineFill();
    }

    initTimelineFill();

    // 13. Card Tilt Effect on Timeline Items
    function initTiltEffect() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.classList.add('tilt-effect');
                // Remove animate-on-scroll transform to allow tilt
                this.style.transition = 'transform 0.15s ease-out';
            });

            item.addEventListener('mousemove', function(e) {
                if (!this.classList.contains('animate-in') && this.classList.contains('animate-on-scroll')) {
                    return; // Don't apply tilt if not yet animated in
                }

                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(12px) translateY(0)`;
            });

            item.addEventListener('mouseleave', function() {
                this.classList.remove('tilt-effect');
                // Reset to animated-in state
                this.style.transform = 'translateY(0)';
                this.style.transition = '';
            });
        });
    }

    initTiltEffect();

    // 14. Scroll-Triggered Text Highlight
    function initTextHighlight() {
        const highlightElements = document.querySelectorAll('.highlight-text');
        if (highlightElements.length === 0) return;

        const highlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Small delay for dramatic effect
                    setTimeout(() => {
                        entry.target.classList.add('highlighted');
                    }, 300);
                    highlightObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });

        highlightElements.forEach(el => highlightObserver.observe(el));
    }

    initTextHighlight();

});