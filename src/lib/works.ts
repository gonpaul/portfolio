// Define the work data structure
export interface Work {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  liveUrl?: string;
  category: string;
  date: string;
  detailedDescription?: string;
  features?: string[];
  challenges?: string[];
  gallery?: string[];
}

// Work data - in a real app, this would come from a CMS or database
export const works: Work[] = [
  {
    id: 1,
    title: 'SmartFace App',
    date: 'September 2023',
    description: 'Full-stack application built with React and Node.js + Express.js on the backend. Features user authentication, database integration with PostgreSQL, and modern UI components.',
    image: '/images/work001-011.png',
    link: '/works/1',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Knex'],
    liveUrl: 'https://smartface-uedw.onrender.com/',
    category: 'Full-Stack',
    detailedDescription: 'The frontend app was built with React and Vite, using npm packages like tsparticles and parallax-tilt to make the visuals more appealing. RBAC for users and guests. For the backend app, Node, Express, bcrypt, and Knex are the main tools. Knex enables to connect to a database and build queries. Here I first found out how to use transactions in db. PostgreSQL with two tables also came in handy.',
    features: [
      'User authentication and authorization',
      'Database integration with PostgreSQL',
      'Simple UI with particle effects',
      'Responsive design',
      'Secure password hashing with bcrypt'
    ],
    challenges: [
      'Implementing secure user authentication',
      'Database transaction management',
      'Creating an appealing user interface',
      'Handling user registration and login flows'
    ],
    gallery: ['/images/work001-01.jpg', '/images/work001-02.jpg', '/images/work001-03.jpg']
  },
  {
    id: 2,
    title: 'Robofriends',
    date: 'August 2023',
    description: 'React application that demonstrates fundamental React concepts including hooks, components, and one-way data flow. Features API integration and search functionality.',
    image: '/images/work002-01.png',
    link: '/works/2',
    technologies: ['React', 'JavaScript', 'API Integration'],
    liveUrl: 'https://gonpaul.github.io/robofriends_vite/',
    category: 'Frontend',
    detailedDescription: 'This project challenged me to understand the fundamentals of React, its hooks, reactivity, components and one way data flow. An api was connected through url, I understood how fetch api works, the idea of a callback function and chaining thenables. The searching algorithm included Javascript DOM accessing methods and passing arguments as properties.',
    features: [
      'Real-time search functionality',
      'API integration with external services',
      'Component-based architecture',
      'Responsive design',
      'Interactive user interface'
    ],
    challenges: [
      'Understanding React hooks and state management',
      'Implementing efficient search algorithms',
      'API integration and data fetching',
      'Component reusability and props passing'
    ],
    gallery: ['/images/work02-hover.jpg', '/images/work002-011.png', '/images/texture2.jpg']
  },
  {
    id: 3,
    title: 'Unidesign Layout',
    date: 'March 2024',
    description: 'Custom layout built completely from scratch as an exercise. Focuses on responsive design principles and modern CSS techniques.',
    image: '/images/work003-01.png',
    link: '/works/3',
    technologies: ['HTML', 'CSS', 'Responsive Design'],
    category: 'Design',
    detailedDescription: 'This layout was build completely from scratch as an exercise. Not mobile-friendly initially, but later improved with responsive design principles.',
    features: [
      'Custom CSS styling',
      'Responsive design principles',
      'Modern layout techniques',
      'Cross-browser compatibility'
    ],
    challenges: [
      'Creating responsive layouts from scratch',
      'CSS positioning and flexbox',
      'Cross-browser compatibility',
      'Mobile-first design approach'
    ]
  },
  {
    id: 4,
    title: 'Portfolio Website',
    date: 'June 2025',
    description: 'Modern portfolio website built with Next.js, featuring responsive design, blog functionality, and contact form integration.',
    image: '/images/space.jpg',
    link: '/works/4',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    category: 'Full-Stack',
    detailedDescription: 'A modern portfolio website showcasing my work and skills. Built with Next.js for optimal performance and SEO.',
    features: [
      'Server-side rendering with Next.js',
      'Responsive design with Tailwind CSS',
      'Blog functionality',
      'Contact form integration',
      'SEO optimization'
    ],
    challenges: [
      'Implementing SSR for better performance',
      'Creating a responsive design system',
      'Integrating blog functionality',
      'Optimizing for SEO'
    ],
    gallery: ['/images/work004-03.png', '/images/texture2.jpg', '/images/work004-02.png']
  },
  {
    id: 5,
    title: 'Onmars Real Estate Platform',
    date: 'November 2025',
    description: 'Comprehensive business platform with custom UI/UX design, full-stack development, and automated CRM integration for seamless workflow management.',
    image: '/images/work005-02.png',
    link: '/works/5',
    technologies: ['Next.js', 'Nest.js', 'Figma', 'Playwright', 'Python'],
    category: 'Full-Stack',
    detailedDescription: 'A complete business system built from scratch including UI/UX design, backend development, frontend application, admin panel, and automated synchronization for properties data update',
    liveUrl: '',
    features: [
      'Complete UI/UX system designed in Figma',
      'Comprehensive backend built with Nest.js',
      'Responsive frontend application using Next.js',
      'Admin panel for content management',
      'Automated synchronization scripts',
      'Seamless CRM integration workflow',
      'Database modeling and architecture',
      'End-to-end form processing system'
    ],
    challenges: [
      'Designing intuitive UI/UX based on client requirements',
      'Building scalable backend architecture with Nest.js',
      'Creating seamless CRM integration workflow',
      'Implementing automated synchronization scripts',
      'Developing role-based admin panel',
      'Ensuring data consistency across systems'
    ],
    gallery: ['/images/work005-01.png', '/images/work001-04.jpg', '/images/work005-03.png']
  },
  {
    id: 6,
    title: 'Osbias - Cognitive journal',
    date: 'May 2026',
    description: 'Text editor that combines structured thinking frameworks with AI-powered assistance to help users become better thinkers and more intentional humans.',
    image: '/images/work006-15.png',
    link: '/works/6',
    technologies: ['Next.js', 'Redux', 'React Hooks', 'Docker', 'SQLite'],
    category: 'Full-Stack',
    detailedDescription: "A service that bridges personal knowledge management and reasoning templates. Features sophisticated journal editing, AI-powered assistance, thinking frameworks, goal management, and basic publishing capabilities. Built with 15+ API endpoints, clear documentation, and advanced features.",
    liveUrl: "https://os.gonpaul.com",
    features: [
      'Sophisticated CodeMirror-based journal editor with framework-guided writing',
      'Real-time AI chat integration for cognitive assistance and bias checking',
      'Idea validation and paraphrasing capabilities powered by AI',
      'Create and apply thinking frameworks (First Principles, OODA Loop, etc.)',
      'Goal management with actionable items and progress tracking',
      'Publish entries to public feed for collaborative reasoning',
      'Export work in multiple formats for external use',
      'Template systems for consistent thinking patterns',
      'Complete user authentication and admin panels',
      'Rate limiting and security features',
      'Keyboard shortcuts and modern dark-themed UI',
      '15+ API endpoints with complete Swagger documentation',
      'SQLite database with proper migrations and production-ready infrastructure'
    ],
    challenges: [
      'Defining product features and creating effective roadmap',
      'Organizing development workflow using Scrum methodology',
      'Building scalable full-stack architecture with Next.js',
      'Designing comprehensive database architecture',
      'Implementing role-based access control system',
      'Optimizing performance with advanced React hooks',
      'Managing complex state with Redux across the application',
      'Setting up reliable deployment pipeline with Docker and VPS'
    ],
    gallery: ['/images/work006-11.png', '/images/work006-12.png', '/images/work006-14.png']
  },
  {
    id: 7,
    title: 'GuildGrad - Edtech',
    date: 'June 2026',
    description: 'A service that brings the power of technology to english learners. It combines courses, community clubs and language practice in one place',
    image: '/images/work007-01.jpg',
    link: '/works/7',
    technologies: ['Next.js', 'React Hooks', 'Tailwind', 'CVA + Tailwind merge', 'ReactMarkdown', 'Docker', 'SQLite', 'Paddle', 'Clerk'],
    category: 'Full-Stack',
    detailedDescription: "A service that bridges personal knowledge management and reasoning templates. Features sophisticated journal editing, AI-powered assistance, thinking frameworks, goal management, and basic publishing capabilities. Built with 15+ API endpoints, clear documentation, and advanced features.",
    liveUrl: "https://guildgrad.com",
    features: [
      'Sophisticated CodeMirror-based journal editor with framework-guided writing',
      'Real-time AI chat integration for cognitive assistance and bias checking',
      'Idea validation and paraphrasing capabilities powered by AI',
      'Create and apply thinking frameworks (First Principles, OODA Loop, etc.)',
      'Goal management with actionable items and progress tracking',
      'Publish entries to public feed for collaborative reasoning',
      'Export work in multiple formats for external use',
      'Template systems for consistent thinking patterns',
      'Complete user authentication and admin panels',
      'Rate limiting and security features',
      'Keyboard shortcuts and modern dark-themed UI',
      '15+ API endpoints with complete Swagger documentation',
      'SQLite database with proper migrations and production-ready infrastructure'
    ],
    challenges: [
      'Defining product features and creating effective roadmap',
      'Organizing development workflow using Scrum methodology',
      'Building scalable full-stack architecture with Next.js',
      'Designing comprehensive database architecture',
      'Implementing role-based access control system',
      'Optimizing performance with advanced React hooks',
      'Managing complex state with Redux across the application',
      'Setting up reliable deployment pipeline with Docker and VPS'
    ],
    gallery: ['/images/work007-02.png', '/images/work007-03.png', '/images/work007-04.png', '/images/work007-05.png', '/images/work007-06.png', '/images/work007-07.png']
  }
];

// Helper function to get work by ID
export function getWorkById(id: number): Work | undefined {
  return works.find(work => work.id === id);
}

// Helper function to get all works
export function getAllWorks(): Work[] {
  return works;
}
