import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Get database connection
async function getDb() {
  return open({
    filename: './data/blog.db',
    driver: sqlite3.Database
  });
}

// Get all posts with pagination
export async function getPosts(page = 1, limit = 10) {
  const db = await getDb();
  const offset = (page - 1) * limit;
  
  try {
    return await db.all(
      `SELECT * FROM posts ORDER BY date DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Get a single post by ID
export async function getPost(id) {
  const db = await getDb();
  
  try {
    return await db.get(`SELECT * FROM posts WHERE id = ?`, [id]);
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return null;
  }
}

// Create a new post
export async function createPost({ title, content, date }) {
  const db = await getDb();
  
  try {
    const result = await db.run(
      `INSERT INTO posts (title, content, date) VALUES (?, ?, ?)`,
      [title, content, date]
    );
    
    return { id: result.lastID, title, content, date };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Delete a post by ID
export async function deletePost(id) {
  const db = await getDb();
  
  try {
    const result = await db.run('DELETE FROM posts WHERE id = ?', [id]);
    return result.changes > 0; // Return true if a post was deleted
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }
} 