'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  async function loadPosts(pageNum) {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`/api/posts?page=${pageNum}&limit=5`);
      if (!res.ok) throw new Error('Failed to fetch posts');
      
      const data = await res.json();
      
      if (!data.posts || data.posts.length === 0) {
        setHasMore(false);
      } else {
        // If loading page 1, replace posts; otherwise append
        if (pageNum === 1) {
          setPosts(data.posts);
        } else {
          // Create a Set of existing post IDs to avoid duplicates
          const existingIds = new Set(posts.map(post => post.id));
          // Filter out posts that already exist
          const newPosts = data.posts.filter(post => !existingIds.has(post.id));
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
        }
        setPage(pageNum + 1);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Load initial posts
  useEffect(() => {
    loadPosts(1);
  }, []);

  // Handle infinite scroll
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        loadPosts(page);
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, page]);

  return (
    <div>
      {error && (
        <div style={{ border: '1px solid black', padding: '10px', marginBottom: '15px' }}>
          <p>{error}</p>
          <button onClick={() => loadPosts(1)}>
            Try Again
          </button>
        </div>
      )}
      
      {posts.length > 0 ? (
        <div>
          {posts.map(post => (
            <article key={post.id} style={{ marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
              <h2>
                <a href={`/posts/${post.id}`}>{post.title}</a>
              </h2>
              
              <div style={{ fontSize: '14px', marginBottom: '10px' }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              
              <div>
                {post.content.length > 200 
                  ? `${post.content.substring(0, 200)}...` 
                  : post.content}
                  
                {post.content.length > 200 && (
                  <a href={`/posts/${post.id}`}>
                    Read more →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : !loading && !error ? (
        <div>
          <p>No posts yet.</p>
          <p>Visit the <a href="/admin">admin page</a> to create your first post.</p>
          <p>Password: Dustin525</p>
        </div>
      ) : null}
      
      {loading && (
        <p>Loading more posts...</p>
      )}
      
      {!hasMore && posts.length > 0 && (
        <p>You've reached the end</p>
      )}
    </div>
  );
} 