# Your personal website-portfolio

**SETUP TASKS**
- run the app
- update content.ts and add translations
- seed db with blog examples
- setup an api-key to protect `/posts` api route
- connect your tg bot and set chat your chat id
- build and run your app

**DEPLOYMENT TASKS**
- deploy it on vps or your own machine, 
- setup your domain, 
- add ssl certificates 
- and add process management worklow

## Features

- **Modern React/Next.js Architecture**: Built with Next.js 16, React 19, and TypeScript
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Blog System**: markdown based blog posts with a secured api route for their management
- **Contact Form**: API route for form submissions
- **SEO Optimized** (TODO): Meta tags and structured data
- **Performance** (TODO): Optimized images and code splitting

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

### Change content
Go to `/src/app/lib/content.ts` and paste your content by changing values in defined objects.

Then, use that information to define `/messages/en.json` and `messages/ru.json` files 

### Seed db
If you want to have post examples on the blog page, then run the following command:
```bash
# from the project's root
node scripts/seed-db
```

### Setup api-key
Copy `.example` into `.env.local`
```bash
cp .example .env.local
```

```bash
# run this command and copy the generated api key into .env.local
node scripts/generate-api-key.js
``` 

### Setup tg bot token and chat id (optional)

1. Message @BotFather on Telegram
2. Create a new bot with /newbot
3. Get your bot token
4. Get your chat ID by messaging your bot and visiting: https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
5. Define `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env.local`



### Production Build

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

3. set up certificates 

4. set up reverse proxy

4. Use pm2 to manage the process
```bash
pm2 start ecosystem.config.js
```

## TODO: Docker Deployment 

1. Build the Docker image:
```bash
docker build -t portfolio .
```

2. Run the container:
```bash
docker run -p 3000:3000 portfolio
```
- Build the Docker image
- Deploy to any container platform (AWS, GCP, Azure, etc.) or vps

## TODO: Performance

- **Lighthouse Score**: X across all metrics
- **Core Web Vitals**: Optimized for Google's ranking factors
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for optimal loading

## TODO: SEO

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