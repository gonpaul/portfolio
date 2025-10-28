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
    description: 'Full-stack application built with React and Node.js + Express.js on the backend. Features user authentication, database integration with PostgreSQL, and modern UI components.',
    image: '/images/work001-011.png',
    link: '/works/1',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Knex'],
    liveUrl: 'https://smartface-uedw.onrender.com/',
    category: 'Full-Stack',
    detailedDescription: 'The frontend app was built with React and Vite, using npm packages like tsparticles and parallax-tilt to make the visuals more appealing. Routing regarding authorization. For the backend app, Node, Express, bcrypt, and Knex are the main tools. Knex enables to connect to a database, retrieve and add the data. The register endpoint required me to use a transaction. Here, PostgreSQL with two tables also came in handy.',
    features: [
      'User authentication and authorization',
      'Database integration with PostgreSQL',
      'Modern UI with particle effects',
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
    description: 'React application that demonstrates fundamental React concepts including hooks, components, and one-way data flow. Features API integration and search functionality.',
    image: '/images/work002-011.png',
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
    ]
  },
  {
    id: 3,
    title: 'Unidesign Layout',
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
    description: 'Modern portfolio website built with Next.js, featuring responsive design, blog functionality, and contact form integration.',
    image: '/images/work004-02.png',
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
    ]
  },
  {
    id: 5,
    title: 'Onmars Real Estate Platform',
    description: 'Comprehensive business platform with custom UI/UX design, full-stack development, and automated CRM integration for seamless workflow management.',
    image: '/images/work005-01.png',
    link: '/works/5',
    technologies: ['Next.js', 'Nest.js', 'Figma', 'Playwright', 'Python'],
    category: 'Full-Stack',
    detailedDescription: 'A complete business system built from scratch including UI/UX design, backend development, frontend application, admin panel, and automated synchronization for properties data update',
    liveUrl: 'https://om.protactic.space/',
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
    ]
  },
  // {
  //   id: 6,
  //   title: 'E-commerce Platform',
  //   description: 'Complete e-commerce solution with shopping cart, payment integration, and admin dashboard for product management.',
  //   image: '/images/work004-02.jpg',
  //   link: '/works/6',
  //   technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  //   category: 'Full-Stack',
  //   detailedDescription: 'A comprehensive e-commerce platform with full shopping cart functionality, payment processing, and administrative features.',
  //   features: [
  //     'Shopping cart functionality',
  //     'Payment processing with Stripe',
  //     'User authentication',
  //     'Admin dashboard',
  //     'Product management system'
  //   ],
  //   challenges: [
  //     'Implementing secure payment processing',
  //     'Managing complex state in shopping cart',
  //     'Creating admin interface',
  //     'Database design for e-commerce'
  //   ]
  // },
  {
    id: 6,
    title: 'Osbias - Text Editor for Enhanced Thinking',
    description: 'Comprehensive cognitive enhancement platform that combines structured thinking frameworks with AI-powered assistance to help users become better thinkers and more intentional humans.',
    image: '/images/work006-01.png',
    link: '/works/6',
    technologies: ['Next.js', 'Redux', 'React Hooks', 'Docker', 'SQLite'],
    category: 'Full-Stack',
    detailedDescription: 'A mature cognitive enhancement platform that bridges personal knowledge management and collaborative reasoning. Features sophisticated journal editing, AI-powered assistance, thinking frameworks, goal management, and comprehensive publishing capabilities. Built with production-ready infrastructure including 15+ API endpoints, complete documentation, and advanced features.',
    liveUrl: "https://osbias.protactic.space/",
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
    ]
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
