import { NextResponse } from 'next/server';
import { createPost } from '../../../../lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content } = body;
    
    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Create the post with current date
    const post = await createPost({
      title,
      content,
      date: new Date().toISOString()
    });
    
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 