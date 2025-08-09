/* ===================================
   Modern Dragon Ball Z: Fighter's Edition JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Define utility functions first
    function createEnergyBlast(orb) {
        const blast = document.createElement('div');
        const rect = orb.getBoundingClientRect();
        
        blast.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            background: radial-gradient(circle, #ffd700, #ff6b1a);
            border-radius: 50%;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 30px #ffd700;
            pointer-events: none;
            z-index: 1000;
            animation: energyBlast 1s ease-out forwards;
        `;
        
        document.body.appendChild(blast);
        
        // Add blast animation
        const blastStyle = document.createElement('style');
        blastStyle.textContent = `
            @keyframes energyBlast {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(blastStyle);
        
        // Remove blast after animation
        setTimeout(() => {
            blast.remove();
            blastStyle.remove();
        }, 1000);
    }
    
    function createEnergyTrail(element) {
        const trail = document.createElement('div');
        const rect = element.getBoundingClientRect();
        
        trail.style.cssText = `
            position: fixed;
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #ff6b1a, transparent);
            left: ${rect.left}px;
            top: ${rect.bottom - 2}px;
            pointer-events: none;
            z-index: 999;
            animation: energyTrail 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        // Add trail animation
        const trailStyle = document.createElement('style');
        trailStyle.textContent = `
            @keyframes energyTrail {
                0% {
                    width: 0px;
                    opacity: 1;
                }
                100% {
                    width: ${rect.width}px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(trailStyle);
        
        // Remove trail after animation
        setTimeout(() => {
            trail.remove();
            trailStyle.remove();
        }, 600);
    }

    // Initialize all functionality
    initMobileMenu();
    initScrollProgress();
    initSmoothAnimations();
    initParticleEffects();
    initEnergyOrbs();
    initContentAnimations();
    initNavigationDropdowns(); // Add this line
    
    // Mobile Menu Toggle
    function initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                
                // Animate hamburger menu
                const spans = mobileToggle.querySelectorAll('span');
                if (mobileToggle.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
            
            // Close menu when clicking on regular navigation links (but NOT dropdown toggles)
            const navLinks = navMenu.querySelectorAll('a:not(.nav-toggle)');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    // Only close if this is not inside a dropdown submenu that's currently open
                    const parentDropdown = this.closest('.nav-dropdown');
                    if (parentDropdown && parentDropdown.classList.contains('active')) {
                        // This is a submenu link in an open dropdown - close the menu
                        navMenu.classList.remove('active');
                        mobileToggle.classList.remove('active');
                        const spans = mobileToggle.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    } else if (!parentDropdown) {
                        // This is a regular nav link (not in a dropdown) - close the menu
                        navMenu.classList.remove('active');
                        mobileToggle.classList.remove('active');
                        const spans = mobileToggle.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                    // If it's a dropdown toggle, do nothing - let the dropdown handle it
                });
            });
        }
    }
    
    // Scroll Progress Bar
    function initScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        
        if (progressBar) {
            window.addEventListener('scroll', function() {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollProgress = (window.scrollY / scrollHeight) * 100;
                progressBar.style.width = Math.min(scrollProgress, 100) + '%';
            });
        }
    }
    
    // Smooth Scroll for Navigation Links
    function initSmoothAnimations() {
        // Add fade-in animation to content when page loads
        const contentBox = document.querySelector('.content-box');
        if (contentBox) {
            contentBox.classList.add('fade-in');
        }
        
        // Disabled problematic scroll animations that were causing content to disappear
        // Intersection Observer for scroll animations
        // const observerOptions = {
        //     threshold: 0.1,
        //     rootMargin: '0px 0px -50px 0px'
        // };
        
        // const observer = new IntersectionObserver(function(entries) {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting) {
        //             entry.target.style.opacity = '1';
        //             entry.target.style.transform = 'translateY(0)';
        //         }
        //     });
        // }, observerOptions);
        
        // Observe elements for scroll animations
        // const animateElements = document.querySelectorAll('.content-box, .footer');
        // animateElements.forEach(el => {
        //     el.style.opacity = '0';
        //     el.style.transform = 'translateY(30px)';
        //     el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        //     observer.observe(el);
        // });
    }
    
    // Enhanced Particle Effects
    function initParticleEffects() {
        const particlesBg = document.getElementById('particles-bg');
        
        if (particlesBg) {
            // Create floating energy particles
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: ${Math.random() > 0.5 ? '#ff6b1a' : '#ffd700'};
                    border-radius: 50%;
                    box-shadow: 0 0 10px currentColor;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: floatParticle ${Math.random() * 10 + 5}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 5}s;
                    opacity: ${Math.random() * 0.5 + 0.3};
                `;
                particlesBg.appendChild(particle);
            }
            
            // Add CSS for particle animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px) scale(1);
                    }
                    33% {
                        transform: translateY(-30px) translateX(20px) scale(1.2);
                    }
                    66% {
                        transform: translateY(30px) translateX(-20px) scale(0.8);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Interactive Energy Orbs
    function initEnergyOrbs() {
        const energyOrbs = document.querySelectorAll('.energy-orb');
        
        energyOrbs.forEach((orb, index) => {
            // Add click interaction
            orb.addEventListener('click', function() {
                createEnergyBlast(orb);
            });
            
            // Add random color variation
            const colors = ['#ff6b1a', '#ffd700', '#1e88e5'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            orb.style.background = randomColor;
            orb.style.boxShadow = `0 0 20px ${randomColor}`;
        });
        
        // Mouse parallax effect for orbs
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            energyOrbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                const xOffset = (mouseX - 0.5) * speed * 20;
                const yOffset = (mouseY - 0.5) * speed * 20;
                
                orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }
    
    // Content Animations
    function initContentAnimations() {
        // Disabled problematic typewriter effect that was causing text to disappear
        // Typewriter effect for titles
        // const titles = document.querySelectorAll('h1, h2');
        // titles.forEach(title => {
        //     const text = title.textContent;
        //     title.textContent = '';
        //     title.style.borderRight = '2px solid #ff6b1a';
        //     
        //     let i = 0;
        //     const typeInterval = setInterval(() => {
        //         title.textContent += text.charAt(i);
        //         i++;
        //         if (i >= text.length) {
        //             clearInterval(typeInterval);
        //             setTimeout(() => {
        //                 title.style.borderRight = 'none';
        //             }, 500);
        //         }
        //     }, 50);
        // });
        
        // Enhanced hover effects for navigation
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                // Create energy trail effect
                createEnergyTrail(this);
            });
        });
    }
    
    // Enhanced Logo Interaction
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            // Create power-up effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'logoGlow 3s ease-in-out infinite alternate';
            }, 10);
            
            // Screen flash effect
            const flash = document.createElement('div');
            flash.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent 50%);
                pointer-events: none;
                z-index: 2000;
                animation: powerFlash 0.5s ease-out;
            `;
            
            document.body.appendChild(flash);
            
            const flashStyle = document.createElement('style');
            flashStyle.textContent = `
                @keyframes powerFlash {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `;
            document.head.appendChild(flashStyle);
            
            setTimeout(() => {
                flash.remove();
                flashStyle.remove();
            }, 500);
        });
    }
    
    // Enhanced Navigation Dropdown Behavior
    function initNavigationDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.nav-toggle');
            const submenu = dropdown.querySelector('.nav-submenu');
            let hideTimeout;
            
            if (!toggle || !submenu) return;
            
            // Function to check if we're on mobile
            function isMobile() {
                return window.innerWidth <= 768 || 'ontouchstart' in window;
            }
            
            // Handle click/touch on toggle
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Clear any existing hide timeout
                clearTimeout(hideTimeout);
                
                // Close other dropdowns on mobile
                if (isMobile()) {
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active', 'hover');
                        }
                    });
                }
                
                // Toggle active class
                const isActive = dropdown.classList.contains('active');
                dropdown.classList.toggle('active');
                dropdown.classList.remove('hover');
                
                // Add debugging for mobile
                console.log('Dropdown clicked:', {
                    isMobile: isMobile(),
                    wasActive: isActive,
                    nowActive: dropdown.classList.contains('active'),
                    submenuHeight: submenu.scrollHeight
                });
                
                // On mobile, keep dropdown open until another action
                if (!isMobile()) {
                    // On desktop, auto-close after 3 seconds
                    if (dropdown.classList.contains('active')) {
                        setTimeout(() => {
                            dropdown.classList.remove('active');
                        }, 3000);
                    }
                }
            });
            
            // Add touch event for better mobile support
            toggle.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Trigger the same behavior as click
                this.click();
            });
            
            // Handle mouse enter to show dropdown (desktop only)
            dropdown.addEventListener('mouseenter', function() {
                if (!isMobile()) { // Only on desktop
                    clearTimeout(hideTimeout);
                    dropdown.classList.add('hover');
                }
            });
            
            // Handle mouse leave with delay (desktop only)
            dropdown.addEventListener('mouseleave', function() {
                if (!isMobile()) { // Only on desktop
                    dropdown.classList.remove('hover');
                    hideTimeout = setTimeout(() => {
                        dropdown.classList.remove('active');
                    }, 500);
                }
            });
            
            // Handle clicks on submenu links
            const submenuLinks = submenu.querySelectorAll('a');
            submenuLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Add visual feedback
                    this.style.background = 'rgba(255, 107, 26, 0.3)';
                    
                    // Close dropdown immediately on mobile after link click
                    if (isMobile()) {
                        dropdown.classList.remove('active', 'hover');
                    } else {
                        // Desktop: Keep dropdown visible briefly during navigation
                        clearTimeout(hideTimeout);
                        hideTimeout = setTimeout(() => {
                            dropdown.classList.remove('active', 'hover');
                        }, 1000);
                    }
                    
                    // Reset visual feedback after a short time
                    setTimeout(() => {
                        this.style.background = '';
                    }, 200);
                });
            });
        });
        
        // Close dropdowns when clicking outside (mobile)
        document.addEventListener('click', function(e) {
            if (isMobile()) {
                if (!e.target.closest('.nav-dropdown')) {
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active', 'hover');
                    });
                }
            }
        });
        
        // Close dropdowns when touching outside (mobile)
        document.addEventListener('touchend', function(e) {
            if (isMobile()) {
                if (!e.target.closest('.nav-dropdown')) {
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active', 'hover');
                    });
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            // Reset dropdown states when switching between mobile and desktop
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active', 'hover');
            });
        });
        
        // Helper function for mobile detection
        function isMobile() {
            return window.innerWidth <= 768 || 'ontouchstart' in window;
        }
    }
    
    // Performance optimized scroll handler
    let ticking = false;
    function updateScrollEffects() {
        // Update any scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Add loading completion class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Utility Functions (Global scope)
function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(255, 107, 26, 0.5);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    setTimeout(() => {
        ripple.remove();
        rippleStyle.remove();
    }, 600);
}

// Add ripple effect to buttons and links
document.addEventListener('click', function(e) {
    if (e.target.matches('a, button, .social-link')) {
        createRippleEffect(e.target, e);
    }
});

// Console Easter Egg
console.log(`
╔══════════════════════════════════════════╗
║     🐉 DRAGON BALL Z: FIGHTER'S EDITION 🐉     ║
║                                          ║
║     Power Level: OVER 9000!              ║
║     Status: Website Enhanced ✨          ║
║                                          ║
║     Kamehameha your way to victory!      ║
╚══════════════════════════════════════════╝
`);

// Export functions for external use if needed
window.DBZEffects = {
    createRippleEffect
}; 