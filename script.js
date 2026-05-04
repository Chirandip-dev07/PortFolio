const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    icon.classList.replace('bx-moon', 'bx-sun');
} else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    icon.classList.replace('bx-sun', 'bx-moon');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'light');
    }
});

const navToggle = document.getElementById('nav-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const toggleIcon = navToggle.querySelector('i');
    if (navbar.classList.contains('active')) {
        toggleIcon.classList.replace('bx-menu', 'bx-x');
    } else {
        toggleIcon.classList.replace('bx-x', 'bx-menu');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        navToggle.querySelector('i').classList.replace('bx-x', 'bx-menu');
    });
});

const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 10%';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 10%';
        header.style.boxShadow = 'none';
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

const typingText = document.querySelector('.typing-text');
const words = ['Data Science Student', 'Software Engineer', 'ML Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; 
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if(typingText) setTimeout(typeEffect, 1000);
});

const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    
    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
        const cards = track.querySelectorAll('.cert-card');
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
}

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            formStatus.textContent = 'Please fill out all fields.';
            formStatus.className = 'form-status error';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.textContent = 'Please enter a valid email address.';
            formStatus.className = 'form-status error';
            return;
        }

        const formData = {
            id: Date.now(),
            name: name,
            email: email,
            message: message,
            date: new Date().toISOString()
        };

        let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

        formStatus.textContent = 'Message sent successfully! (Saved locally)';
        formStatus.className = 'form-status success';
        
        contactForm.reset();

        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 5000);
    });
}
