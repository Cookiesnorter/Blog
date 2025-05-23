import { NextResponse } from 'next/server';
import { getPost } from '../../../../lib/db';

export async function GET(request, { params }) {
  try {
    const id = params.id;
    const post = await getPost(id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
} 