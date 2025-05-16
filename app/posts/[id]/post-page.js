import { getPost } from '../../../lib/db';

export default async function PostPage({ params }) {
  const { id } = params;
  const post = await getPost(id);
  
  if (!post) {
    return (
      <div>
        <h2>Post not found</h2>
        <p>
          <a href="/">&larr; Back to home</a>
        </p>
      </div>
    );
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      
      <div>
        {new Date(post.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
      
      <div>
        {post.content.split('\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      
      <div>
        <a href="/">&larr; Back to home</a> | 
        <a href="/posts/all">View all posts</a>
      </div>
    </article>
  );
} 