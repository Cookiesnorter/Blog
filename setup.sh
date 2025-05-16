#!/bin/bash

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🏗️ Building the application..."
npm run build

# Seed the database
echo "🌱 Seeding the database..."
npm run seed || echo "Note: Seeding might fail on first run, which is okay"

# Start the application
echo "🚀 Starting the application..."
npm start 