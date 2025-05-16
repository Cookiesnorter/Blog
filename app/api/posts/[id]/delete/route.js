import { NextResponse } from 'next/server';
import { deletePost } from '../../../../../lib/db';

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    const wasDeleted = await deletePost(id);
    
    if (!wasDeleted) {
      return NextResponse.json(
        { error: 'Post not found or could not be deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
} 