#!/usr/bin/env node

// This script initializes the database and seeds it with sample data

import { getDb } from './lib/db.js';
import seed from './lib/seed.js';

async function initDb() {
  console.log('\n🔧 Initializing database...');
  
  try {
    // Initialize the database schema
    const db = await getDb();
    console.log('✅ Database schema created successfully');
    
    // Check if the database is empty and seed it
    await seed();
    
    console.log('\n🚀 Database initialization completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error initializing database:', error);
    process.exit(1);
  }
}

// Run the initialization function
initDb(); 