// Simple database initialization script

import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function init() {
  try {
    console.log('Opening database connection...');
    const db = await open({
      filename: './blog.db',
      driver: sqlite3.Database
    });
    
    console.log('Creating posts table...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        date TEXT NOT NULL
      )
    `);
    
    // Check if we have any posts
    const count = await db.get('SELECT COUNT(*) as count FROM posts');
    
    if (count.count === 0) {
      console.log('Adding sample posts...');
      // Insert each post separately to avoid complex SQL parsing issues
      await db.run(
        'INSERT INTO posts (title, content, date) VALUES (?, ?, ?)',
        ['Welcome to Minimal Blog', 
         'This is the first post of the Minimal Blog. Here you will find a collection of thoughts, ideas, and stories.\n\nThis blog is designed to be ultra-lightweight and minimal, focusing on content rather than fancy styling.', 
         new Date().toISOString()]
      );
      
      await db.run(
        'INSERT INTO posts (title, content, date) VALUES (?, ?, ?)',
        ['The Art of Minimalism', 
         'Minimalism is more than just a design aesthetic; it\'s a mindset. By removing the unnecessary, we make room for what\'s truly important.\n\nIn this blog, we embrace minimalism not just in design, but in approach. Simple, clean, and focused on what matters most: the content.', 
         new Date(Date.now() - 86400000).toISOString()]
      );
      
      await db.run(
        'INSERT INTO posts (title, content, date) VALUES (?, ?, ?)',
        ['Getting Started with Next.js', 
         'Next.js is a powerful React framework that makes building websites and applications easier.\n\nIt offers features like server-side rendering, static site generation, and API routes, which we\'ve used to build this very blog.\n\nStay tuned for more technical posts about modern web development.', 
         new Date(Date.now() - 172800000).toISOString()]
      );
      
      console.log('Sample posts added.');
    } else {
      console.log(`Database already has ${count.count} posts`);
    }
    
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

init(); 