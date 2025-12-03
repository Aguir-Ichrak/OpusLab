export default {
  async bootstrap({ strapi }) {
    // Check if posts already exist
    const existingPosts = await strapi.db.query('api::post.post').findMany();
    if (existingPosts.length > 0) return;

    // Create Categories
    const categories = await Promise.all([
      strapi.db.query('api::category.category').create({ data: { name: 'Tech', slug: 'tech' } }),
      strapi.db.query('api::category.category').create({ data: { name: 'Lifestyle', slug: 'lifestyle' } }),
      strapi.db.query('api::category.category').create({ data: { name: 'Business', slug: 'business' } }),
    ]);

    // Create Tags
    const tags = await Promise.all([
      strapi.db.query('api::tag.tag').create({ data: { name: 'JavaScript', slug: 'javascript' } }),
      strapi.db.query('api::tag.tag').create({ data: { name: 'TypeScript', slug: 'typescript' } }),
      strapi.db.query('api::tag.tag').create({ data: { name: 'SEO', slug: 'seo' } }),
      strapi.db.query('api::tag.tag').create({ data: { name: 'UX', slug: 'ux' } }),
      strapi.db.query('api::tag.tag').create({ data: { name: 'Performance', slug: 'performance' } }),
    ]);

    // Create Authors
    const authors = await Promise.all([
      strapi.db.query('api::author.author').create({ data: { name: 'Ichrak Aguir', slug: 'ichrak-a' } }),
      strapi.db.query('api::author.author').create({ data: { name: 'Fedi Abdouli', slug: 'fedi-a' } }),
    ]);

    // Functions
    const getCategory = (slug: string) => categories.find(c => c.slug === slug)?.id;
    const getAuthor = (slug: string) => authors.find(a => a.slug === slug)?.id;
    const getTags = (slugs: string[]) => tags.filter(t => slugs.includes(t.slug)).map(t => t.id);

    // Seed Posts
    await Promise.all([
  strapi.db.query('api::post.post').create({
    data: {
      title: 'Getting Started with TypeScript in Next.js',
      slug: 'typescript-nextjs',
      content: 'A professional guide to using TypeScript in Next.js projects for scalable web applications.',
      status: 'published',
      category: getCategory('tech'),
      author: getAuthor('ichrak-a'),
      tags: getTags(['typescript', 'performance']),
    },
  }),
  strapi.db.query('api::post.post').create({
    data: {
      title: 'Business Strategies for Developers',
      slug: 'business-strategies',
      content: 'Practical strategies for developers to succeed in the business and tech industry.',
      status: 'published',
      category: getCategory('business'), 
      author: getAuthor('ichrak-a'),
      tags: getTags(['seo', 'ux']),
    },
  }),
  strapi.db.query('api::post.post').create({
    data: {
      title: 'Optimizing JavaScript for High Performance',
      slug: 'optimizing-js',
      content: 'Performance best practices for JavaScript applications to improve speed and efficiency.',
      status: 'published',
      category: getCategory('tech'),
      author: getAuthor('fedi-a'),
      tags: getTags(['javascript', 'performance']),
    },
  }),
  strapi.db.query('api::post.post').create({
    data: {
      title: 'Enhancing User Experience with Dark Mode',
      slug: 'dark-mode-ux',
      content: 'How implementing dark mode can improve user experience and engagement in apps.',
      status: 'published',
      category: getCategory('lifestyle'),
      author: getAuthor('ichrak-a'),
      tags: getTags(['ux', 'performance']),
    },
  }),
  strapi.db.query('api::post.post').create({
    data: {
      title: 'Building a Professional Blog with Strapi and Next.js',
      slug: 'strapi-nextjs-blog',
      content: 'Step-by-step guide to building a scalable and professional blog using Strapi and Next.js.',
      status: 'published',
      category: getCategory('tech'),
      author: getAuthor('fedi-a'),
      tags: getTags(['typescript', 'seo']),
    },
  }),
  strapi.db.query('api::post.post').create({
    data: {
      title: 'Top 5 Productivity Apps for Professionals in 2025',
      slug: 'productivity-apps-2025',
      content: 'Recommended productivity apps for professionals and developers to improve workflow in 2025.',
      status: 'published',
      category: getCategory('business'), 
      author: getAuthor('ichrak-a'),
      tags: getTags(['ux', 'performance']),
    },
  }),
  strapi.db.query('api::post.post').create({
    data: {
      title: 'SEO Best Practices for Developers',
      slug: 'seo-best-practices',
      content: 'How developers can apply SEO best practices to increase visibility of their projects.',
      status: 'published',
      category: getCategory('tech'),
      author: getAuthor('fedi-a'),
      tags: getTags(['seo', 'javascript']),
    },
  }),
]);

  },
};



