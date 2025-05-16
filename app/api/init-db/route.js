import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export async function GET() {
  try {
    // Just try to connect to the database to initialize it
    const db = await getDb();
    await db.get('SELECT 1'); // Simple test query
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully'
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      {
        success: false,
        error: `Failed to initialize database: ${error.message}`
      },
      { status: 500 }
    );
  }
} 