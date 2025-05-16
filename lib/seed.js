import { getDb } from './db';

async function seed() {
  const db = await getDb();
  
  // Check if there are any posts in the database
  const posts = await db.all('SELECT * FROM posts');
  
  if (posts.length === 0) {
    // Create some sample posts
    await db.run(`
      INSERT INTO posts (title, content, date) VALUES 
      ('Welcome to Minimal Blog', 'This is the first post of the Minimal Blog. Here you will find a collection of thoughts, ideas, and stories.\n\nThis blog is designed to be ultra-lightweight and minimal, focusing on content rather than fancy styling.', '${new Date().toISOString()}'),
      ('The Art of Minimalism', 'Minimalism is more than just a design aesthetic; it\'s a mindset. By removing the unnecessary, we make room for what\'s truly important.\n\nIn this blog, we embrace minimalism not just in design, but in approach. Simple, clean, and focused on what matters most: the content.', '${new Date(Date.now() - 86400000).toISOString()}'),
      ('Getting Started with Next.js', 'Next.js is a powerful React framework that makes building websites and applications easier.\n\nIt offers features like server-side rendering, static site generation, and API routes, which we\'ve used to build this very blog.\n\nStay tuned for more technical posts about modern web development.', '${new Date(Date.now() - 172800000).toISOString()}')
    `);
    
    console.log('✅ Seed data inserted successfully');
  } else {
    console.log('ℹ️ Database already has posts, skipping seed');
  }
}

// Run the seed function
seed().catch(console.error);

// Export for direct execution
export default seed; 