document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800, 
        once: true,    
    });

    // 2. Mobile Menu Toggle (Revised for reliability)
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a'); 

    // Helper function to handle menu state
    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        // Change icon between bars (menu) and times (close)
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); 
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    };

    // Toggle menu on click
    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked (for single-page navigation on mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if menu is open and screen is mobile (using the CSS breakpoint of 992px)
            if (navMenu.classList.contains('active') && window.innerWidth <= 992) {
                toggleMenu(); 
            }
        });
    });

    // 3. Dynamic Typewriter Effect on Hero Title
    const heroTitleElement = document.querySelector('.hero-title');
    
    if (heroTitleElement) {
        // New Headline: "Empowering Students with Free, **High-Quality** Academic Resources"
        const fullText = heroTitleElement.textContent.trim();
        const typingText = "Empowering Students with Free, High-Quality Academic Resources";
        let i = 0;

        function typeWriter() {
            if (i < typingText.length) {
                heroTitleElement.innerHTML = typingText.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
                i++;
                setTimeout(typeWriter, 50); 
            } else {
                // Replace the typed text with the final HTML structure to apply bold styling from CSS
                heroTitleElement.innerHTML = fullText.replace('**High-Quality**', '<strong>High-Quality</strong>');
            }
        }
        
        // Clear initial content (allowing AOS to fade-in the text area)
        heroTitleElement.innerHTML = '';

        // Start typing after a short delay (AOS delay is 200ms)
        setTimeout(() => {
            typeWriter();
        }, 300); 
    }


    // 4. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Sticky Navbar Effect
    const navbar = document.querySelector(".navbar");
    function checkSticky() {
        if (window.scrollY > 50) { 
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    }
    checkSticky(); 
    window.addEventListener("scroll", checkSticky);

    // 2. Mobile Menu Toggle 
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".navbar .menu");
    // Safely select the icon for toggling
    const menuIcon = menuBtn ? menuBtn.querySelector("i") : null; 
    
    if (menuBtn && menu && menuIcon) {
        menuBtn.addEventListener("click", function() {
            menu.classList.toggle("active");
            
            // Toggle the icon class (fa-bars <-> fa-times)
            if (menu.classList.contains("active")) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-times");
            } else {
                menuIcon.classList.remove("fa-times");
                menuIcon.classList.add("fa-bars");
            }
        });
    }

    // 3. Close mobile menu when a link is clicked (smooth scrolling)
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            
            // Check if menu is open, then close it
            if (menu.classList.contains("active")) {
                menu.classList.remove("active");
                // Reset icon to bars
                if (menuIcon) {
                    menuIcon.classList.remove("fa-times");
                    menuIcon.classList.add("fa-bars");
                }
            }

            // Smooth scroll logic for internal links
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault(); 
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});