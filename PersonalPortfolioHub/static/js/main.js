// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for the header
    const typingContainer = document.getElementById('typing-container');
    const roles = [
        "Research Enthusiast",
        "Problem Solver", 
        "Web Developer"
    ];
    
    // Animation timing
    const typingDelay = 100;      // Delay between each character when typing
    const erasingDelay = 50;      // Delay between each character when erasing
    const newTextDelay = 2000;    // Delay before typing the next role
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        // Get the span within the container
        let typingSpan = typingContainer.querySelector('span');
        
        if (isDeleting) {
            // Erasing text
            typingSpan.textContent = typingSpan.textContent.substring(0, typingSpan.textContent.length - 1);
            charIndex--;
            
            // When all characters are erased
            if (typingSpan.textContent === "") {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length; // Move to next role
                charIndex = 0;
                setTimeout(type, newTextDelay / 2); // Wait before typing again
                return;
            }
        } else {
            // Typing text
            if (charIndex === 0) {
                // Reset to empty when starting a new role
                typingSpan.textContent = "";
            }
            
            if (charIndex < currentRole.length) {
                // Add one character from the current role
                typingSpan.textContent += currentRole.charAt(charIndex);
                charIndex++;
            } else {
                // Finished typing the current role
                isDeleting = true;
                setTimeout(type, newTextDelay); // Wait before erasing
                return;
            }
        }
        
        // Schedule the next animation frame
        setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
    
    // Start the typing animation after a short delay
    setTimeout(type, 1000);
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check if a theme preference is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme + '-mode');
        body.classList.remove(savedTheme === 'dark' ? 'light-mode' : 'dark-mode');
        updateThemeIcon(savedTheme === 'dark');
    } else {
        // Default to light mode
        body.classList.add('light-mode');
        updateThemeIcon(false);
    }
    
    // Theme toggle click event
    themeToggle.addEventListener('click', function() {
        const isDarkMode = body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
        
        updateThemeIcon(!isDarkMode);
    });
    
    // Function to update the theme icon
    function updateThemeIcon(isDarkMode) {
        const icon = themeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would normally send the data to a server
            // For demo purposes, we'll just show an alert
            alert('Thanks for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Navbar collapse on click (for mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // Download CV button functionality
    const downloadCVButtons = document.querySelectorAll('.download-cv-btn, .download-cv-link');
    
    downloadCVButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real application, this would be a link to the actual CV file
            alert('CV download functionality would be implemented here with a real file.');
            
            // Alternatively, you could implement this with an actual file:
            // window.location.href = '/static/files/bahauddin-sakib-cv.pdf';
        });
    });
    
    // Scroll-triggered hover effects for cards
    const cards = document.querySelectorAll('.about-card, .skills-container, .project-card, .education-card, .contact-info, .contact-form');
    
    // Function to handle scroll-triggered hover effects
    function handleScrollHoverEffects() {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Check if card is in viewport
            if (cardTop < windowHeight * 0.85 && cardBottom > 0) {
                // Add a class to trigger the hover effect when scrolled into view
                card.classList.add('scroll-active');
            } else {
                card.classList.remove('scroll-active');
            }
        });
    }
    
    // Add initial check and event listener for scroll
    handleScrollHoverEffects();
    window.addEventListener('scroll', handleScrollHoverEffects);
    
    // Scroll animations and interactions are handled by the navigation system
});
