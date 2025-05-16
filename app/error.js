'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'Garamond, serif', marginBottom: '1rem', color: '#d32f2f' }}>
        Something went wrong
      </h2>
      
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        There was a problem loading this page. Please try again.
      </p>
      
      <div>
        <button
          onClick={reset}
          style={{
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            fontFamily: 'Garamond, serif'
          }}
        >
          Try again
        </button>
        
        <a 
          href="/"
          style={{
            display: 'inline-block',
            marginLeft: '1rem',
            color: '#555',
            textDecoration: 'underline'
          }}
        >
          Go back home
        </a>
      </div>
    </div>
  );
} 