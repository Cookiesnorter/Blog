'use client';

import { useState, useEffect } from 'react';

export default function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        setLoading(true);
        // Fetch all posts by setting a large limit
        const res = await fetch('/api/posts?limit=100');
        if (!res.ok) throw new Error('Failed to fetch posts');
        
        const data = await res.json();
        
        // Deduplicate posts based on ID
        const uniquePostsMap = new Map();
        data.posts.forEach(post => {
          if (!uniquePostsMap.has(post.id)) {
            uniquePostsMap.set(post.id, post);
          }
        });
        
        // Convert Map to array and sort by date (newest first)
        const uniquePosts = Array.from(uniquePostsMap.values()).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        
        setPosts(uniquePosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    fetchAllPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return (
      <div style={{ border: '1px solid black', padding: '10px' }}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>All Posts</h1>

      {posts.length === 0 ? (
        <p>No posts found. <a href="/admin">Create a new post</a>.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <a href={`/posts/${post.id}`}>
                <b>{post.title}</b>
              </a>
              <div>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 