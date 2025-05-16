#!/bin/bash

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Create an empty database file if it doesn't exist
if [ ! -f "blog.db" ]; then
  echo "🔧 Creating database file..."
  touch blog.db
  # Initialize database through API
  echo "🌱 Will initialize database on first run"
fi

# Start the development server
echo "🚀 Starting development server..."
npm run dev 