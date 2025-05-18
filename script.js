import { gsap } from 'gsap';
import { ScrollTrigger } from 'ScrollTrigger';
import { ScrollToPlugin } from 'ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const nav = document.querySelector('nav');
const backToTop = document.querySelector('.back-to-top');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initScrollEvents();
    initMobileNav();
    initMenuTabs();
    initForms();
});

// Initialize Animations
function initAnimations() {
    // Hero Animation
    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2
    });
    
    gsap.from('.hero-content h2', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.4
    });
    
    gsap.from('.hero-content p', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.6
    });
    
    gsap.from('.hero-content .btn', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.8
    });
    
    // Section Animations
    const sections = document.querySelectorAll('.section:not(.hero)');
    
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        const content = section.querySelector('.container > div:not(.section-title)');
        
        gsap.from(title, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.8
        });
        
        gsap.from(content, {
            scrollTrigger: {
                trigger: section,
                start: 'top 70%'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: 0.2
        });
    });
}

// Initialize Scroll Events
function initScrollEvents() {
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile nav if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
            }
            
            const targetId = link.getAttribute('href');
            
            gsap.to(window, {
                duration: 1,
                scrollTo: targetId,
                ease: 'power2.inOut'
            });
        });
    });
    
    // Back to top click event
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: 'power2.inOut'
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize Mobile Nav
function initMobileNav() {
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileNavToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileNavToggle.classList.remove('active');
        }
    });
}

// Initialize Menu Tabs
function initMenuTabs() {
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all categories
            menuCategories.forEach(cat => cat.classList.remove('active'));
            
            // Show the selected category
            const category = tab.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
        });
    });
}

// Initialize Forms
function initForms() {
    // Contact Form
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Form validation and submission logic would go here
        alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
    
    // Newsletter Form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get email value
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Subscription logic would go here
        alert(`Thank you for subscribing to our newsletter with ${email}!`);
        
        // Reset form
        newsletterForm.reset();
    });
}

