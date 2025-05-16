// Blog setup script
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import fs from 'fs';

// Initialize and seed the database
async function setup() {
  console.log('\n🔧 Setting up Dustin Vali\'s Blog...\n');
  
  try {
    // Create database directory if it doesn't exist
    const dbDir = './data';
    if (!fs.existsSync(dbDir)) {
      console.log('Creating data directory...');
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    // Connect to database
    console.log('Connecting to database...');
    const db = await open({
      filename: './data/blog.db',
      driver: sqlite3.Database
    });
    
    // Create tables
    console.log('Creating database schema...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        date TEXT NOT NULL
      )
    `);
    
    // Check if we need to seed the database
    const count = await db.get('SELECT COUNT(*) as count FROM posts');
    
    if (count.count === 0) {
      console.log('Adding sample blog posts...');
      
      // Add sample posts one by one with parameterized queries
      await db.run(
        'INSERT INTO posts (title, content, date) VALUES (?, ?, ?)',
        [
          'Welcome to My Blog',
          'This is the first post of Dustin Vali\'s Blog. The design is intentionally simple to focus on content rather than fancy styling.\n\nEdit this post or create new ones by visiting the /admin page (password: Dustin525).',
          new Date().toISOString()
        ]
      );
      
      await db.run(
        'INSERT INTO posts (title, content, date) VALUES (?, ?, ?)',
        [
          'How to Navigate This Blog',
          'This blog features three main pages:\n\n1. Home page with infinite scroll\n2. Individual post pages\n3. All Posts view in a compact grid\n\nThe design uses Times New Roman font with minimal styling for a clean reading experience.',
          new Date(Date.now() - 86400000).toISOString()
        ]
      );
      
      await db.run(
        'INSERT INTO posts (title, content, date) VALUES (?, ?, ?)',
        [
          'Thoughts on Web Development',
          'Building a lightweight blog is a great exercise in minimalism. This blog uses Next.js and SQLite for data storage - making it efficient and easy to deploy.\n\nThe entire codebase avoids external CSS frameworks, focusing on simplicity and performance.',
          new Date(Date.now() - 172800000).toISOString()
        ]
      );
      
      console.log('Sample posts added successfully!');
    } else {
      console.log(`Database already has ${count.count} posts. Skipping seed data.`);
    }
    
    console.log('\n✅ Setup completed successfully!\n');
    console.log('Run "npm run dev" to start the development server');
    console.log('Then visit: http://localhost:3000');
    console.log('\nAdmin page: http://localhost:3000/admin');
    console.log('Admin password: Dustin525');
  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

setup(); 