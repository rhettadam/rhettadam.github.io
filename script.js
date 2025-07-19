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

// GitHub Activity Feed Functionality
async function fetchGitHubActivity() {
    const githubFeed = document.getElementById('github-feed');
    if (!githubFeed) return;

    try {
        // Extract username from GitHub URL in config
        const githubUrl = CONFIG.contact.github;
        const username = githubUrl.split('/').pop();
        
        // Fetch recent activity using GitHub API
        const response = await fetch(`https://api.github.com/users/${username}/events?per_page=10`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const events = await response.json();
        
        // Filter and format events
        const activityItems = events
            .filter(event => ['PushEvent', 'CreateEvent', 'ForkEvent', 'WatchEvent'].includes(event.type))
            .slice(0, 8)
            .map(event => formatGitHubEvent(event, username));
        
        if (activityItems.length === 0) {
            githubFeed.innerHTML = '<div class="github-activity-empty">No recent activity found</div>';
            return;
        }
        
        githubFeed.innerHTML = activityItems.join('');
        
    } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        githubFeed.innerHTML = `
            <div class="github-activity-error">
                Unable to load recent activity<br>
                <small>Check out my <a href="${CONFIG.contact.github}" target="_blank" style="color: #4a9eff;">GitHub profile</a> instead</small>
            </div>
        `;
    }
}

function formatGitHubEvent(event, username) {
    const eventTime = new Date(event.created_at);
    const timeAgo = getTimeAgo(eventTime);
    
    let icon, message;
    
    switch (event.type) {
        case 'PushEvent':
            icon = '📝';
            const commits = event.payload.commits || [];
            const commitCount = commits.length;
            const repoName = event.repo.name;
            const commitMessage = commits.length > 0 ? commits[0].message : 'Updated repository';
            message = `Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''} to <a href="https://github.com/${repoName}" class="github-activity-repo" target="_blank">${repoName.split('/')[1]}</a>`;
            if (commitMessage.length > 50) {
                message += `<br><small>${commitMessage.substring(0, 50)}...</small>`;
            } else {
                message += `<br><small>${commitMessage}</small>`;
            }
            break;
            
        case 'CreateEvent':
            icon = '🆕';
            const refType = event.payload.ref_type;
            const refName = event.payload.ref;
            const repoName2 = event.repo.name;
            message = `Created ${refType} <strong>${refName}</strong> in <a href="https://github.com/${repoName2}" class="github-activity-repo" target="_blank">${repoName2.split('/')[1]}</a>`;
            break;
            
        case 'ForkEvent':
            icon = '🍴';
            const forkedRepo = event.payload.forkee.full_name;
            const originalRepo = event.repo.name;
            message = `Forked <a href="https://github.com/${originalRepo}" class="github-activity-repo" target="_blank">${originalRepo.split('/')[1]}</a> to <a href="https://github.com/${forkedRepo}" class="github-activity-repo" target="_blank">${forkedRepo.split('/')[1]}</a>`;
            break;
            
        case 'WatchEvent':
            icon = '⭐';
            const watchedRepo = event.repo.name;
            message = `Starred <a href="https://github.com/${watchedRepo}" class="github-activity-repo" target="_blank">${watchedRepo.split('/')[1]}</a>`;
            break;
            
        default:
            icon = '📋';
            message = `Activity in <a href="https://github.com/${event.repo.name}" class="github-activity-repo" target="_blank">${event.repo.name.split('/')[1]}</a>`;
    }
    
    return `
        <div class="github-activity-item">
            <div class="github-activity-icon">${icon}</div>
            <div class="github-activity-content">
                <div class="github-activity-message">${message}</div>
                <div class="github-activity-time">${timeAgo}</div>
            </div>
        </div>
    `;
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
        return 'just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    }
}

// Initialize the website
function init() {
    // Populate content from config
    populateContent();
    populateGraphicsGalleries();
    setupGalleryBackButton();
    fetchGitHubActivity(); // Fetch GitHub activity on page load
    
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
    
    // Discord clipboard functionality
    const discordLink = document.getElementById('discord-link');
    if (discordLink) {
        discordLink.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(CONFIG.contact.discord);
                
                // Visual feedback
                discordLink.classList.add('copied');
                
                // Add text indicator
                const textIndicator = document.createElement('span');
                textIndicator.className = 'copy-indicator';
                textIndicator.textContent = 'Copied to clipboard';
                discordLink.appendChild(textIndicator);
                
                // Reset after 2 seconds
                setTimeout(() => {
                    discordLink.classList.remove('copied');
                    if (textIndicator.parentNode) {
                        textIndicator.parentNode.removeChild(textIndicator);
                    }
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy to clipboard:', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = CONFIG.contact.discord;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Visual feedback
                discordLink.classList.add('copied');
                
                // Add text indicator
                const textIndicator = document.createElement('span');
                textIndicator.className = 'copy-indicator';
                textIndicator.textContent = 'Copied to clipboard';
                discordLink.appendChild(textIndicator);
                
                setTimeout(() => {
                    discordLink.classList.remove('copied');
                    if (textIndicator.parentNode) {
                        textIndicator.parentNode.removeChild(textIndicator);
                    }
                }, 2000);
            }
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