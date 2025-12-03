# OpusLab
## About this project
A full-stack blogging platform built with **Next.js 16** and **Strapi CMS**, featuring dynamic content management, SEO optimization, dark mode, and real-time ISR revalidation.

## Backend Setup (Strapi)
### Create Strapi project
npx create-strapi-app@latest backend --typescript

### Navigate to project
cd backend

### Copy environment variables
cp .env.example .env

### Configure database in .env
### DATABASE_HOST=localhost
### DATABASE_PORT=5432
### DATABASE_NAME=strapi_blog

### Start development server
npm run develop

## Frontend Setup (Next.js)

### Install dependencies
npm install

### Copy environment variables
cp .env.example .env.local

### Configure:
### NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
### STRAPI_API_TOKEN=your_api_token
### NEXT_PUBLIC_SITE_URL=http://localhost:3000

### Start development server
npm run dev

---> Visit http://localhost:3000

## Features

### Content Management
- Draft/publish workflow
- Multiple content types (Posts, Categories, Tags, Authors)
- Rich text editor 
- Automatic slug generation
- SEO metadata per post

### Frontend
- Server-side rendering with App Router
- TypeScript for type safety with Zod validation
- Dark mode toggle with localStorage persistence
- Responsive design with Tailwind CSS

### Performance & SEO
- Dynamic sitemap.xml generation
- RSS feed at /feed.xml
- Reading time calculation
- ISR revalidation via webhooks
- Pagination and filtering

### User Interaction
- Newsletter subscription form
- Comment form
- Search functionality
- Category/Tag/Author browsing

## API Endpoints

### REST API (Strapi)
\`\`\`
GET  /api/posts?populate=*
GET  /api/posts?filters[slug][$eq]=slug&populate=*
GET  /api/categories
GET  /api/tags
GET  /api/authors
\`\`\`

### Next.js API Routes
\`\`\`
POST /api/newsletter     - Subscribe to newsletter
POST /api/comments       - Submit a comment
POST /api/webhooks/strapi - Strapi webhook receiver
GET  /sitemap.xml        - Dynamic sitemap
GET  /feed.xml           - RSS feed
GET  /robots.txt         - Robots configuration
\`\`\`

## Webhook Configuration

Set up webhooks in Strapi to enable ISR revalidation:

1. Go to Settings → Webhooks
2. Create new webhook with:
   - URL: `https://yourdomain.com/api/webhooks/strapi`
   - Events: `entry.publish`, `entry.unpublish`, `entry.create`, `entry.update`, `entry.delete`
   - Models: Post, Category, Tag, Author

Example webhook payload:
\`\`\`json
{
  "event": "entry.publish",
  "createdAt": "2025-01-20T10:00:00.000Z",
  "model": "post",
  "uid": "api::post.post",
  "entry": {
    "id": 1,
    "slug": "my-first-post",
    "title": "My First Post"
  }
}
\`\`\`


## Performance Tips

1. **Caching**: ISR revalidates on content changes
2. **Pagination**: Default 10 items per page, adjustable
3. **Code Splitting**: Components are automatically code-split
4. **Dark Mode**: CSS variables for theme switching

## Deployment

### Vercel (Recommended for Next.js)

# Connect your repository
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_STRAPI_URL
vercel env add STRAPI_API_TOKEN
vercel env add NEXT_PUBLIC_SITE_URL

# Deploy
vercel deploy --prod
