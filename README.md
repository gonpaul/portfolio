# Next.js Portfolio Website

This is the Next.js version of the portfolio website, migrated from Flask.

## Features

- **Modern React/Next.js Architecture**: Built with Next.js 16, React 19, and TypeScript
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Blog System**: MDX-based blog with dynamic routing
- **Contact Form**: API route for form submissions
- **SEO Optimized**: Meta tags and structured data
- **Performance**: Optimized images and code splitting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── works/             # Works pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── thankyou/          # Thank you page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── Navigation.tsx     # Navigation component
└── content/              # MDX content files
```

## Docker Deployment

1. Build the Docker image:
```bash
docker build -t nextjs-portfolio .
```

2. Run the container:
```bash
docker run -p 3000:3000 nextjs-portfolio
```

## Migration from Flask

This Next.js version replaces the original Flask application with:

- **Static HTML → React Components**: All HTML templates converted to React components
- **Flask Routes → Next.js App Router**: Dynamic routing with Next.js App Router
- **Flask Forms → API Routes**: Contact form now uses Next.js API routes
- **Bootstrap CSS → Tailwind CSS**: Modern utility-first CSS framework
- **Python Backend → Node.js**: Full-stack JavaScript application

## Features Comparison

| Feature | Flask Version | Next.js Version |
|---------|---------------|-----------------|
| Framework | Flask (Python) | Next.js (React) |
| Styling | Bootstrap + Custom CSS | Tailwind CSS |
| Blog | Static HTML | MDX + Dynamic Routing |
| Contact Form | Flask Form Handler | Next.js API Route |
| Deployment | Python WSGI | Node.js |
| Performance | Server-side | Static + Server-side |

## Development

### Adding New Blog Posts

1. Create a new MDX file in `content/` directory
2. Add the post to the blog list in `src/app/blog/page.tsx`
3. The post will be automatically available at `/blog/[slug]`

### Adding New Works

1. Add work data to the works array in `src/app/works/page.tsx`
2. Create individual work pages in `src/app/works/[id]/page.tsx`

### Styling

The application uses Tailwind CSS with custom CSS for the original design. Key styling files:

- `src/app/globals.css`: Global styles and custom CSS
- Tailwind classes: Utility-first styling
- Custom CSS: Original design preservation

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on push to main branch
3. Custom domain configuration available

### Docker

1. Build the Docker image
2. Deploy to any container platform (AWS, GCP, Azure, etc.)

### Traditional Hosting

1. Run `npm run build`
2. Upload the `.next` folder and `package.json` to your server
3. Install dependencies and run `npm start`

## Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for Google's ranking factors
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for optimal loading

## SEO

- **Meta Tags**: Dynamic meta tags for each page
- **Structured Data**: JSON-LD structured data
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.