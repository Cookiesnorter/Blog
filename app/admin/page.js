'use client';

import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'Dustin525';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState('create'); // 'create' or 'manage'

  async function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchPosts();
    } else {
      setMessage({ text: 'Incorrect password', type: 'error' });
    }
  }

  async function fetchPosts() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/posts?limit=100');
      if (!res.ok) throw new Error('Failed to fetch posts');
      
      const data = await res.json();
      setPosts(data.posts.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error('Error fetching posts:', error);
      setMessage({ text: 'Failed to load posts', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setMessage({ text: 'Title and content are required', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    
    try {
      const res = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setTitle('');
        setContent('');
        setMessage({ text: 'Post created successfully!', type: 'success' });
        fetchPosts(); // Refresh the posts list
      } else {
        setMessage({ text: data.error || 'Failed to create post', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeletePost(id) {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }
    
    try {
      setMessage({ text: '', type: '' });
      const res = await fetch(`/api/posts/${id}/delete`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        setMessage({ text: 'Post deleted successfully', type: 'success' });
        fetchPosts(); // Refresh the posts list
      } else {
        const data = await res.json();
        setMessage({ text: data.error || 'Failed to delete post', type: 'error' });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage({ text: 'An error occurred while deleting the post', type: 'error' });
    }
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Admin Login</h2>
        
        {message.text && (
          <div style={{ border: '1px solid black', padding: '10px' }}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="password">
              Password
            </label>
            <br />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Admin Panel</h2>
        <div>
          <button onClick={() => setView('create')}>
            Create Post
          </button>
          <button onClick={() => setView('manage')}>
            Manage Posts
          </button>
        </div>
      </div>
      
      {message.text && (
        <div style={{ border: '1px solid black', padding: '10px' }}>
          {message.text}
        </div>
      )}
      
      {view === 'create' ? (
        <form onSubmit={handleCreatePost}>
          <div>
            <label htmlFor="title">
              Post Title
            </label>
            <br />
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="content">
              Post Content
            </label>
            <br />
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: '100%', height: '300px' }}
              placeholder="Write your post content here..."
              required
            />
          </div>
          
          <div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
            
            <a href="/">&larr; Back to site</a>
          </div>
        </form>
      ) : (
        <div>
          <h3>Manage Posts</h3>
          
          {isLoading ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p>No posts yet. Create your first post!</p>
          ) : (
            <table border="1">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id}>
                    <td>
                      <a href={`/posts/${post.id}`} target="_blank" rel="noopener noreferrer">
                        {post.title}
                      </a>
                    </td>
                    <td>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td>
                      <button onClick={() => handleDeletePost(post.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
} 