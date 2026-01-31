// ===================================================
// ===== SHIKSHA FLOW - PROFESSIONAL JAVASCRIPT =====
// ===================================================

(function() {
    'use strict';

    // ===== WAIT FOR DOM TO LOAD =====
    document.addEventListener('DOMContentLoaded', function() {
        
        // Initialize all functions
        initNavbar();
        initMobileMenu();
        initSmoothScrolling();
        initActiveLinks();
        initPageAnimations();
        initAOS();
        initTypewriter();
        
        console.log('✅ ShikshaFlow JavaScript loaded successfully!');
    });
    
    // ===================================================
    // ===== 1. NAVBAR STICKY EFFECT =====
    // ===================================================
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) return;

        function handleScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        }

        // Check on load
        handleScroll();
        
        // Check on scroll
        window.addEventListener('scroll', handleScroll);
    }

    // ===================================================
    // ===== 2. MOBILE MENU FUNCTIONALITY =====
    // ===================================================
    function initMobileMenu() {
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.navbar .links');
        const navItems = document.querySelectorAll('.nav-item .nav-link');
        
        if (!menuBtn || !navLinks) return;

        // Create hamburger spans if they don't exist
        if (!menuBtn.querySelector('span')) {
            menuBtn.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
        }

        // Toggle menu function
        function toggleMenu() {
            const isActive = navLinks.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        // Open menu
        function openMenu() {
            navLinks.classList.add('active');
            menuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Close menu
        function closeMenu() {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Click on hamburger button
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Click on nav links
        navItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 991) {
                    setTimeout(closeMenu, 300);
                }
            });
        });

        // Click outside menu
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                const isClickInsideNav = navLinks.contains(e.target);
                const isClickOnMenuBtn = menuBtn.contains(e.target);
                
                if (!isClickInsideNav && !isClickOnMenuBtn && navLinks.classList.contains('active')) {
                    closeMenu();
                }
            }
        });

        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 991) {
                    closeMenu();
                }
            }, 250);
        });
    }
    
    // ===================================================
    // ===== 3. SMOOTH SCROLLING =====
    // ===================================================
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or empty
                if (!href || href === '#' || href === '#!') {
                    e.preventDefault();
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===================================================
    // ===== 4. ACTIVE SECTION HIGHLIGHTING =====
    // ===================================================
    function initActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;

        function highlightActiveSection() {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 150;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (navLink) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                }
            });
        }

        // Highlight current page on load
        function highlightCurrentPage() {
            const currentPath = window.location.pathname;
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkPath = link.getAttribute('href');
                
                if (linkPath === currentPath || 
                    (currentPath.includes(linkPath) && linkPath !== '/' && linkPath !== '#')) {
                    link.classList.add('active');
                }
            });
        }

        highlightCurrentPage();
        window.addEventListener('scroll', highlightActiveSection);
    }

    // ===================================================
    // ===== 5. PAGE ANIMATIONS =====
    // ===================================================
    function initPageAnimations() {
        // Fade in on load
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            setTimeout(function() {
                document.body.style.transition = 'opacity 0.6s ease';
                document.body.style.opacity = '1';
            }, 100);
        });

        // Prevent double tap zoom on mobile
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Add loaded class to navbar
        window.addEventListener('load', function() {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.classList.add('loaded');
            }
        });
    }

    // ===================================================
    // ===== 6. AOS (ANIMATE ON SCROLL) INITIALIZATION =====
    // ===================================================
    function initAOS() {
        // Check if AOS library is loaded
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
                delay: 0,
                easing: 'ease-in-out'
            });
            console.log('✅ AOS initialized');
        }
    }

    // ===================================================
    // ===== 7. TYPEWRITER EFFECT (OPTIONAL) =====
    // ===================================================
    function initTypewriter() {
        const heroTitleElement = document.querySelector('.hero-title');
        
        if (!heroTitleElement) return;

        const fullText = heroTitleElement.textContent.trim();
        const typingText = "Empowering Students with Free, High-Quality Academic Resources";
        let i = 0;

        function typeWriter() {
            if (i < typingText.length) {
                heroTitleElement.innerHTML = typingText.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Replace with final HTML
                heroTitleElement.innerHTML = fullText.replace('High-Quality', '<strong>High-Quality</strong>');
            }
        }

        // Clear initial content
        heroTitleElement.innerHTML = '';

        // Start typing after delay
        setTimeout(typeWriter, 300);
    }

    // ===================================================
    // ===== 8. AUTH FORM FUNCTIONALITY (IF PRESENT) =====
    // ===================================================
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton && signInButton && container) {
        // Sign Up button
        signUpButton.addEventListener('click', function() {
            container.classList.add("right-panel-active");
            document.title = "Create Account | Sign Up Form";
        });

        // Sign In button
        signInButton.addEventListener('click', function() {
            container.classList.remove("right-panel-active");
            document.title = "Sign In | Login Form";
        });

        // Form submission handling
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const inputs = form.querySelectorAll('input');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        isValid = false;
                        input.style.border = '1px solid #FF4B2B';
                        
                        input.addEventListener('input', function() {
                            input.style.border = 'none';
                        });
                    }
                });
                
                if (isValid) {
                    alert('Form submitted successfully!');
                } else {
                    alert('Please fill in all required fields.');
                }
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl+Shift+S for Sign In
            if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                e.preventDefault();
                container.classList.remove("right-panel-active");
            }
            
            // Ctrl+Shift+U for Sign Up
            if (e.ctrlKey && e.shiftKey && e.key === 'U') {
                e.preventDefault();
                container.classList.add("right-panel-active");
            }
        });

        // Animation on page load
        window.addEventListener('load', function() {
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            
            setTimeout(function() {
                container.style.transition = 'opacity 0.5s, transform 0.5s';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 100);
        });

        // Social button hover effects
        document.querySelectorAll('.social').forEach(button => {
            button.addEventListener('mouseenter', function(e) {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.transition = 'transform 0.3s';
            });
            
            button.addEventListener('mouseleave', function(e) {
                e.target.style.transform = 'scale(1)';
            });
        });

        // Input focus styles
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', function() {
                input.style.outline = '2px solid #FF4B2B';
                input.style.outlineOffset = '2px';
            });
            
            input.addEventListener('blur', function() {
                input.style.outline = 'none';
            });
        });
    }

})();

// ===================================================
// ===== CONSOLE MESSAGE =====
// ===================================================
console.log(`
%c 🎓 ShikshaFlow - University Notes Platform %c
%c Powered by Professional JavaScript %c
`, 
'background: linear-gradient(90deg, #6C5CE7, #00C7E5); color: white; padding: 10px 20px; border-radius: 5px 5px 0 0; font-size: 16px; font-weight: bold;',
'',
'background: #f3f5f9; color: #6C5CE7; padding: 10px 20px; border-radius: 0 0 5px 5px; font-size: 12px;',
''
);
