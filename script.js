// DOM Elements
const datetimeElement = document.getElementById('datetime');
const ageElement = document.getElementById('age');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Update datetime
function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    datetimeElement.textContent = now.toLocaleDateString('en-US', options);
}

// Calculate and display age
function calculateAge() {
    // Use birth date from config
    const birthDate = CONFIG.personal.birthDate;
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    // Calculate decimal part for more precise age
    const timeDiff = today.getTime() - birthDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    const preciseAge = daysDiff / 365.25;
    
    ageElement.textContent = preciseAge.toFixed(7) + ' years old';
}

// Navigation functionality
function handleNavigation(targetId) {
    // Remove active class from all sections and nav links
    sections.forEach(section => section.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    // Add active class to target section and nav link
    const targetSection = document.getElementById(targetId);
    const targetNavLink = document.querySelector(`[href="#${targetId}"]`);

    if (targetSection) {
        targetSection.classList.add('active');
    }

    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
}

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        handleNavigation(targetId);
        
        // Update URL hash without scrolling
        history.pushState(null, null, `#${targetId}`);
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1) || 'home';
    handleNavigation(hash);
});

// Skill item hover effects
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for the domain name
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Populate content from config
function populateContent() {
    // Update personal information
    const nameElement = document.querySelector('.profile-name');
    if (nameElement) {
        nameElement.textContent = CONFIG.personal.name;
    }
    
    // Update domain name
    const domainElement = document.querySelector('.domain');
    if (domainElement) {
        domainElement.textContent = CONFIG.personal.domain;
    }
    
    // Update quick links
    const githubLink = document.querySelector('a[href*="github.com"]');
    if (githubLink) {
        githubLink.href = CONFIG.contact.github;
        githubLink.querySelector('.link-value').textContent = CONFIG.contact.github.replace('https://', '');
    }
    
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.href = `mailto:${CONFIG.contact.email}`;
        emailLink.querySelector('.link-value').textContent = CONFIG.contact.email;
    }
    
    // Update footer message
    const footerMessage = document.querySelector('.footer-message p');
    if (footerMessage) {
        footerMessage.textContent = CONFIG.footerMessage;
    }
    
    // Update about section
    const aboutIntro = document.querySelector('#about .about-content p');
    if (aboutIntro) {
        aboutIntro.textContent = CONFIG.about.intro;
    }
    
    const aboutDescription = document.querySelectorAll('#about .about-content p')[1];
    if (aboutDescription) {
        aboutDescription.textContent = CONFIG.about.description;
    }
    
    // Populate experience section
    populateExperience();
    
    // Populate education section
    populateEducation();
    
    // Populate awards section
    populateAwards();
    
    // Populate projects section
    populateProjects();
    
    // Populate skills section
    populateSkills();
}

// Populate projects from config
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
    
    // Add projects from config
    CONFIG.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.name}">
            </div>
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-links">
                    ${project.liveDemo !== '#' ? `<a href="${project.liveDemo}" class="project-link">Live Demo</a>` : ''}
                    <a href="${project.github}" class="project-link">GitHub</a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Fetch and cache the graphics manifest
let graphicsManifest = null;
async function fetchGraphicsManifest() {
    if (graphicsManifest) return graphicsManifest;
    const res = await fetch('static/graphics/graphics-manifest.json');
    graphicsManifest = await res.json();
    return graphicsManifest;
}

// Populate graphics galleries as cards (one per folder)
async function populateGraphicsGalleries() {
    console.log('populateGraphicsGalleries called');
    const galleriesContainer = document.querySelector('.graphics-galleries');
    if (!galleriesContainer || !CONFIG.graphics) return;
    galleriesContainer.innerHTML = '';
    // Load manifest once
    const res = await fetch('static/graphics/graphics-manifest.json');
    const manifest = await res.json();
    for (const gallery of CONFIG.graphics) {
        const card = document.createElement('a');
        card.className = 'gallery gallery-card';
        card.href = `gallery.html?name=${encodeURIComponent(gallery.folder)}`;
        // Get up to 4 images for collage
        const images = manifest[gallery.folder] ? manifest[gallery.folder].slice(0, 4) : [];
        let collageHTML = '';
        if (images.length > 0) {
            collageHTML = `<div class="gallery-collage">${images.map(img => `<img src="${img}" class="collage-img">`).join('')}</div>`;
        }
        card.innerHTML = `<div class=\"gallery-title\">${gallery.title}</div>${collageHTML}`;
        galleriesContainer.appendChild(card);
    }
}

// Show a single gallery view
async function showGalleryView(folder, title) {
    const manifest = await fetchGraphicsManifest();
    const images = manifest[folder] || [];
    console.log('Images for', folder, images); // Debug log
    document.getElementById('gallery-title').textContent = title;
    const imagesContainer = document.querySelector('#gallery-view .gallery-images');
    imagesContainer.innerHTML = '';
    images.forEach(imgPath => {
        const img = document.createElement('img');
        img.src = imgPath;
        img.className = 'gallery-image';
        imagesContainer.appendChild(img);
    });
    // Hide main graphics, show gallery view
    showOnlySection('gallery-view');
}

// Back to galleries
function setupGalleryBackButton() {
    const btn = document.getElementById('back-to-galleries');
    if (btn) {
        btn.addEventListener('click', () => {
            showOnlySection('graphics');
        });
    }
}

// Initialize the website
function init() {
    // Populate content from config
    populateContent();
    populateGraphicsGalleries();
    setupGalleryBackButton();
    
    // Update datetime immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Calculate age
    calculateAge();
    
    // Handle initial page load
    const hash = window.location.hash.substring(1) || 'home';
    handleNavigation(hash);
    
    // Add typing effect to domain name (optional)
    const domainElement = document.querySelector('.domain');
    if (domainElement) {
        const originalText = domainElement.textContent;
        setTimeout(() => {
            typeWriter(domainElement, originalText, 150);
        }, 500);
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Populate skills from config
function populateSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;
    
    // Clear existing skills
    skillsGrid.innerHTML = '';
    
    // Add skills from config as bar images only
    CONFIG.skills.forEach((skill) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `<img src="${skill.icon}" alt="${skill.name}" class="skill-bar-img">`;
        skillsGrid.appendChild(skillItem);
    });
}

// Populate experience from config
function populateExperience() {
    const aboutContent = document.querySelector('#about .about-content');
    if (!aboutContent) return;
    
    // Find the experience section
    const experienceSections = aboutContent.querySelectorAll('h3');
    let experienceSection = null;
    for (let section of experienceSections) {
        if (section.textContent.includes('Experience')) {
            experienceSection = section;
            break;
        }
    }
    if (!experienceSection) return;
    
    // Clear existing experience items
    const existingItems = aboutContent.querySelectorAll('.experience-item');
    existingItems.forEach(item => item.remove());
    
    // Add experience from config (most recent first)
    CONFIG.experience.slice().reverse().forEach(exp => {
        const expItem = document.createElement('div');
        expItem.className = 'experience-item';
        expItem.innerHTML = `
            <div class="exp-title">${exp.title}</div>
            <div class="exp-company">${exp.company}</div>
            <div class="exp-period">${exp.period}</div>
            <div class="exp-description">${exp.description}</div>
        `;
        experienceSection.parentNode.insertBefore(expItem, experienceSection.nextSibling);
    });
}

// Populate education from config
function populateEducation() {
    const aboutContent = document.querySelector('#about .about-content');
    if (!aboutContent) return;
    
    // Find the education section
    const educationSections = aboutContent.querySelectorAll('h3');
    let educationSection = null;
    for (let section of educationSections) {
        if (section.textContent.includes('Education')) {
            educationSection = section;
            break;
        }
    }
    if (!educationSection) return;
    
    // Clear existing education items
    const existingItems = aboutContent.querySelectorAll('.education-item');
    existingItems.forEach(item => item.remove());
    
    // Add education from config (most recent first)
    CONFIG.education.slice().reverse().forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.className = 'education-item';
        eduItem.innerHTML = `
            <div class="edu-degree">${edu.degree}</div>
            <div class="edu-school">${edu.school}</div>
            <div class="edu-period">${edu.period}</div>
            <div class="edu-description">${edu.description}</div>
        `;
        educationSection.parentNode.insertBefore(eduItem, educationSection.nextSibling);
    });
}

// Populate awards from config
function populateAwards() {
    const awardsList = document.getElementById('awards-list');
    if (!awardsList) return;
    
    // Clear existing awards
    awardsList.innerHTML = '';
    
    // Add awards from config
    CONFIG.awards.forEach(award => {
        const awardItem = document.createElement('div');
        awardItem.className = 'award-item';
        awardItem.innerHTML = `
            <span class="award-text">${award}</span>
        `;
        awardsList.appendChild(awardItem);
    });
}

// Add some interactive features
function addInteractiveFeatures() {
    // Profile image click effect
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) {
        profilePic.addEventListener('click', () => {
            profilePic.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                profilePic.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });
    }
    
    // Add hover sound effect (optional - just visual feedback)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 10px 30px rgba(74, 158, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 8px 25px rgba(74, 158, 255, 0.15)';
        });
    });
}

// Add keyboard navigation
function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Navigate with arrow keys
        if (e.altKey) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    navigateToPreviousSection();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    navigateToNextSection();
                    break;
                case 'h':
                    e.preventDefault();
                    handleNavigation('home');
                    break;
                case 'a':
                    e.preventDefault();
                    handleNavigation('about');
                    break;
                case 'p':
                    e.preventDefault();
                    handleNavigation('projects');
                    break;
                case 'c':
                    e.preventDefault();
                    handleNavigation('contact');
                    break;
            }
        }
    });
}

function navigateToNextSection() {
    const currentSection = document.querySelector('.section.active');
    const currentIndex = Array.from(sections).indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    const nextSection = sections[nextIndex];
    const nextId = nextSection.id;
    handleNavigation(nextId);
}

function navigateToPreviousSection() {
    const currentSection = document.querySelector('.section.active');
    const currentIndex = Array.from(sections).indexOf(currentSection);
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
    const prevSection = sections[prevIndex];
    const prevId = prevSection.id;
    handleNavigation(prevId);
}

// Add some Easter eggs
function addEasterEggs() {
    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Trigger easter egg
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    });
    
    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Utility to show only one section by id
function showOnlySection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    addInteractiveFeatures();
    addKeyboardNavigation();
    addEasterEggs();
    
    // Add a welcome message in console
    console.log(`
    🚀 Welcome to your personal website!
    
    Navigation shortcuts:
    - Alt + Arrow Keys: Navigate between sections
    - Alt + H: Home
    - Alt + A: About
    - Alt + P: Projects
    - Alt + C: Contact
    
    Easter egg: Try the Konami code! (↑↑↓↓←→←→BA)
    
    Made with ❤️ and JavaScript
    `);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate any layout-dependent elements if needed
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        // Reset any transform that might have been affected by resize
        item.style.transform = '';
    });
}); 