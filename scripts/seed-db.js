const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'blog.db');
const db = new Database(dbPath);

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT NOT NULL,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  INSERT OR IGNORE INTO categories (name, slug) VALUES 
    ('Business', 'business'),
    ('Technology', 'technology'),
    ('Philosophy', 'philosophy'),
    ('Science', 'science'),
    ('Life', 'life');
`);

// Sample blog posts
const samplePosts = [{
    slug: 'how-i-built-my-portfolio',
    title: 'How I Built My Portfolio',
    category: 'technology',
    content: `# How I Built My Portfolio

## The Beginning

Building a portfolio website is more than just showcasing your work—it's about telling your story and demonstrating your skills. When I started this project, I wanted to create something that would stand out while remaining professional and functional.

## Technology Stack

I chose Next.js for its powerful features like server-side rendering, static site generation, and excellent developer experience. Combined with TypeScript for type safety and Tailwind CSS for styling, this stack provided the perfect foundation for a modern, performant website.

## Design Process

The design process involved creating wireframes, choosing a color palette, and ensuring the site was responsive across all devices. I focused on clean typography, intuitive navigation, and creating visual hierarchy that guides visitors through my work.

## Key Features

Key features include a dynamic blog system, contact form with email integration, responsive design, and smooth animations. Each component was built with reusability and maintainability in mind.

## Lessons Learned

This project taught me the importance of planning, the value of clean code, and the satisfaction of creating something from scratch. It's a continuous work in progress, always evolving with new ideas and improvements.`
  },
  {
    slug: 'design-tips-for-developers',
    title: 'Design Tips for Developers',
    category: 'technology',
    content: `# Design Tips for Developers

## Start with Typography

Good typography is the foundation of great design. Choose readable fonts, establish a clear hierarchy with different sizes and weights, and ensure proper line spacing. Remember: if users can't read your content easily, nothing else matters.

## Use White Space

White space (or negative space) is crucial for readability and visual appeal. Don't be afraid to leave areas empty—it helps users focus on what's important and creates a more professional look.

## Consistent Color Palette

Limit your color palette to 2-3 main colors plus neutrals. Use color to create hierarchy and guide user attention. Tools like Coolors.co can help you find harmonious color combinations.

## Mobile-First Approach

Always design for mobile first, then scale up. This ensures your design works on the smallest screens and naturally adapts to larger ones. Most users will see your site on mobile devices.

## Keep It Simple

Less is often more. Avoid cluttering your interface with unnecessary elements. Focus on the core functionality and make it as intuitive as possible. Users should be able to navigate your site without thinking.`
  },
  {
    slug: 'andrei-karpathy-insights-2025',
    title: 'Andrei Karpathy Insights 2025',
    category: 'science',
    content: `# Andrei Karpathy Insights 2025

## The Future of AI

Andrei Karpathy, former Director of AI at Tesla and OpenAI researcher, continues to shape our understanding of artificial intelligence. His insights into the future of AI development, particularly in the areas of large language models and autonomous systems, provide valuable perspectives for developers and researchers.

## Large Language Models

Karpathy's work on large language models has been instrumental in advancing the field. His research focuses on improving model efficiency, reducing computational requirements, and enhancing the reasoning capabilities of these systems. The key is not just scaling up, but scaling smart.

## Autonomous Systems

From his time at Tesla, Karpathy brings unique insights into autonomous vehicle development. The challenges of real-world AI deployment, safety considerations, and the integration of multiple AI systems working together are areas where his expertise shines.

## Open Source Philosophy

Karpathy is a strong advocate for open-source AI development. He believes that democratizing access to AI tools and knowledge is crucial for the field's advancement. His educational content and open-source contributions have helped countless developers enter the AI space.

## Looking Forward

As we move into 2025, Karpathy's insights suggest we'll see continued progress in AI capabilities, but with a greater focus on efficiency, safety, and real-world applicability. The future of AI is not just about bigger models, but smarter, more efficient, and more reliable systems.`
  }
];

// Insert sample posts
const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO posts (slug, title, content, excerpt, category)
  VALUES (?, ?, ?, ?, ?)
`);

samplePosts.forEach(post => {
  // Extract excerpt from content (first 150 characters)
  const excerpt = post.content.replace(/[#*`]/g, '').replace(/\n/g, ' ').substring(0, 150) + '...';
  
  insertStmt.run(post.slug, post.title, post.content, excerpt, post.category);
  console.log(`Inserted post: ${post.title}`);
});

console.log('Database seeded successfully!');
db.close();
