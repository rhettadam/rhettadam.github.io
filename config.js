// Personal Website Configuration
// Update these values to customize your website

const CONFIG = {
    // Personal Information
    personal: {
        name: "Rhett Adam",
        profession: "Undergraduate Student and FRC Mentor",
        pronouns: "He/Him",
        birthDate: new Date(2006, 1, 23), // Year, Month-1, Day
        domain: "rhettadam.github.io"
    },
    
    // Contact Information
    contact: {
        email: "rhettadambusiness@gmail.com",
        github: "https://github.com/rhettadam",
        linkedin: "https://linkedin.com/in/rhettadam",
        instagram: "https://www.instagram.com/rhett.adam/",
        discord: "radam."
    },
    
    // Skills & Technologies
    skills: [
        { name: "PYTHON", icon: "static/logos/python.png", color: "#3776ab" },
        { name: "JAVASCRIPT", icon: "static/logos/js.png", color: "#f7df1e" },
        { name: "HTML5", icon: "static/logos/html.png", color: "#e34f26" },
        { name: "CSS3", icon: "static/logos/css.png", color: "#1572b6" },
        { name: "GIT", icon: "static/logos/git.png", color: "#f05032" },
        { name: "BASH", icon: "static/logos/bash.png", color: "#4eaa25" },
        { name: "POSTGRES", icon: "static/logos/postgres.png", color: "#336791" },
    ],
    
    // Projects
    projects: [
        {
            name: "Peekorobo",
            description: "A comprehensive web application for analyzing FIRST Robotics Competition team performance, leveraging data from The Blue Alliance (TBA) and a custom contribution estimation model called the ACE algorithm.",
            image: "static/projects/peekorobo.png",
            liveDemo: "#",
            github: "https://github.com/rhettadam/peekorobo"
        },
        {
            name: "CSVUE",
            description: "A Tkinter app for loading, browsing, analyzing, and visualizing tabular data from various file formats.",
            image: "static/projects/csvue.png",
            liveDemo: "#",
            github: "https://github.com/rhettadam/csvue"
        },
        {
            name: "NC²",
            description: "A versatile NetCDF viewer for quickly plotting geospatial data, leveraging Matplotlib and Cartopy to produce publication-quality plots.",
            image: "static/projects/nc2.gif",
            liveDemo: "#",
            github: "https://github.com/rhettadam/nc2"
        },
        {
            name: "7525 When2Meet",
            description: "A When2Meet-like web app specifically for students and mentors on FRC Team 7525 The Pioneers",
            image: "static/projects/when2meet.png",
            liveDemo: "#",
            github: "https://github.com/rhettadam/When2Meet7525"
        }
    ],
    
    // Experience
    experience: [
        {
            title: "Marketing, Operations, and Outreach/Strategy/Scouting Mentor",
            company: "ADROIT / FIRST Robotics Competition Team 7525 The Pioneers",
            period: "August 2024 - Present",
            description: "Support community outreach initiatives, focusing on engagement in the Nashville Metro area, fundraising, and award submissions. Mentor students in engineering principles, problem-solving, and project management, fostering technical and leadership skills."
        },
        {
            title: "Science and Engineering Apprenticeship (SEAP) Intern",
            company: "U.S. Naval Research Laboratory NASA John C. Stennis Space Center",
            period: "June 2024 - July 2024",
            description: "Investigated the impact of NFLUX bias corrections on the performance of NCOM/NCODA over the Gulf of Mexico. Utilized Python and Bash to streamline plotting and data processing tasks."
        },
        {
            title: "Science and Engineering Apprenticeship (SEAP) Intern",
            company: "U.S. Naval Research Laboratory NASA John C. Stennis Space Center",
            period: "June 2023 - July 2023",
            description: "Conducted a six-month twin experiment forecast to assess the effects of direct altimetry data assimilation and SSHA scaling on NCOM/NCODA performance in the Gulf of Mexico. Employed RELO for forecast scripting and Python/Bash for data manipulation and visualization."
        },
        {
            title: "Impact and Design Lead",
            company: "FIRST Robotics Competition Team 1912 Combustion",
            period: "March 2022 - May 2024",
            description: "Supported the fabrication and design of successful, award-winning robots. Presented an initiative for STEM education in Title 1 Schools, leading to a $10k grant. Served in many roles during competitions including coach, technician, and operator. Hosted & volunteered at numerous camps, competitions, and demos to promote FIRST Robotics and Team 1912."
        }
    ],
    
    // Education
    education: [
        {
            degree: "Bachelor of Science in Earth and Environmental Sciences, Minor in Data Science",
            school: "Vanderbilt University",
            period: "Expected: May 2028",
            description: "GPA: 3.52/4.0 • Clubs & Memberships: Vanderbilt Questbridge Chapter, Vanderbilt Energy Transition Society"
        },
        {
            degree: "High School Diploma",
            school: "Salmen High School",
            period: "August 2020 - May 2024",
            description: "GPA: 4.0/4.0 • Clubs & Memberships: FIRST Robotics Competition Team Lead, Yearbook Staff Officer, Swim Team, Tennis Team"
        }
    ],
    
    // Honors and Awards
    awards: [
        "2024 Naval Horizons Essay Award",
        "Vanderbilt Crescere Aude Scholar",
        "Vanderbilt QuestBridge Scholar",
        "Salmen High School First in Class",
        "2023 Naval Horizons Essay Award"
    ],
    
    // About Section
    about: {
        intro: "Hello! I'm Rhett, a Vanderbilt University student passionate about robotics, environmental science/sustainability, and software development.",
        description: "I'm currently pursuing a Bachelor of Science in Earth and Environmental Sciences with a Minor in Data Science. I also mentor for 7525 The Pioneers, a high school FIRST Robotics Competition team."
    },
    
    // Theme Colors (optional - advanced customization)
    theme: {
        primary: "#0c1821",
        background: "#00111c",
        secondary: "#1a1a1a",
        text: "#ffffff",
        muted: "#888888"
    },

    // Graphics & Art Galleries
    graphics: [
        { folder: '1912', title: '1912 Gallery' },
        { folder: 'nc2', title: 'NC² Gallery' },
        { folder: 'peekorobo', title: 'Peekorobo Gallery' },
        { folder: 'csvue', title: 'CSVUE Gallery' }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 