import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export const workExperience = [
  {
    company: 'Personal SaaS Project',
    role: 'Full-Stack Developer & Product Manager',
    timeframe: '2025 - Present',
    achievements: [
      'Defined product features and roadmap using agile methodology',
      'Organized development using Scrum sprints for efficient project management',
      'Built full-stack application with Next.js for both frontend and backend',
      'Designed and implemented comprehensive database architecture',
      'Developed role-based UI system with dedicated admin panel',
      'Implemented advanced React hooks for optimal component performance',
      'Integrated Redux for centralized state management across the application',
      'Deployed application using Docker containers on VPS infrastructure'
    ],
    workSlug: '6'
  },
  {
    company: 'Onmars',
    role: 'Freelance Full-Stack Developer',
    timeframe: '2025',
    achievements: [
      'Designed complete UI/UX system using Figma based on client requirements',
      'Built comprehensive backend system with Nest.js including database modeling',
      'Developed responsive frontend application using Next.js',
      'Created admin panel for easy content management and data updates',
      'Implemented automated synchronization scripts for seamless update workflow',
      'Established end-to-end workflow where user forms automatically sync to CRM'
    ],
    workSlug: '5'
  },
  {
    company: 'SmartFace (Pet project)',
    role: 'Full-Stack Developer',
    timeframe: '2022',
    achievements: [
      'Developed full-stack application with React and Node.js',
      'Implemented user authentication and database integration',
      'Created modern UI with particle effects and responsive design'
    ],
    workSlug: '1'
  },
  {
    company: 'Robofriends (Pet project)',
    role: 'Frontend Developer',
    timeframe: '2021 - 2022',
    achievements: [
      'Built React application demonstrating fundamental concepts',
      'Implemented real-time search functionality',
      'Integrated API with external services'
    ],
    workSlug: '2'
  }
];

export const education = [
  {
    institution: 'Hexlet college',
    description: 'Vocational degree in Information Systems and Programming',
    timeframe: '2022 - 2026',
    isFinished: false
  }
];

export const technicalSkills = [
  {
    title: 'Frontend Development',
    description: 'Building modern, responsive web applications with React, Next.js, and TypeScript',
    tags: ['React', 'Redux', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS']
  },
  {
    title: 'Backend Development',
    description: 'Creating robust server-side applications and APIs',
    tags: ['Node.js', 'Python', 'Express', 'Nest', 'Flask', 'PostgreSQL', 'SQLite', 'JWT', 'C++']
  },
  {
    title: 'Tools & Technologies',
    description: 'Version control, deployment, platforms and development tools',
    tags: ['Git', 'Docker', 'AWS', 'GCP', 'n8n', 'Cursor']
  }
];

export const socialLinks = [
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/gonpaul' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/pavel-goncharov-92728129a/' },
  { name: 'Email', icon: FaEnvelope, url: 'mailto:pavelgoncharov56@gmail.com' }
];

export const personalInfo = {
  name: 'Pavel Goncharov',
  title: 'Software Engineer',
  location: 'Europe/Saint-Petersburg',
  languages: ['English', 'Russian'],
  profileImage: '/images/profile2.jpg',
  introduction: `I'm Pavel Goncharov, a passionate software engineer with a focus on modern web technologies.
I enjoy building scalable applications and exploring new technologies in the ever-evolving
world of software development. My journey has led me to work with various technologies
including React, Next.js, Python, and more. I'm always eager to learn and take on new challenges.`,
  calendarUrl: 'https://cal.com/pavel-goncharov-hecooo'
};
