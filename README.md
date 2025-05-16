# Dustin Vali's Blog

A minimalist blog for sharing personal thoughts and musings. Built with Next.js and SQLite.

## Features

- Clean, minimalist design with Times New Roman font
- Home page with infinite scroll for reading posts
- Grid view of all post titles in the "All Posts" section
- Individual blog post pages with date and time
- Password-protected admin panel
- Post creation and deletion functionality
- SQLite database for lightweight storage

## Getting Started

### Quick Start

```bash
# Install dependencies
npm install

# Setup database and add sample posts
npm run setup

# Start development server
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Access

To create or delete blog posts:
- Visit [http://localhost:3000/admin](http://localhost:3000/admin) 
- Use the password: `Dustin525`

## Project Structure

```
├── app/             # Next.js app directory
│   ├── admin/       # Admin page for post management
│   ├── api/         # API routes for posts (create, read, delete)
│   ├── posts/       # Individual post pages and all posts grid
│   ├── layout.js    # Main layout with Times New Roman styling
│   └── page.js      # Home page with infinite scroll
├── data/            # Database directory
├── lib/             # Utility functions
│   └── db.js        # Database interface
└── setup.js         # Database setup script
```

## Deployment

This project is optimized for deployment on Vercel. Just push to your GitHub repository and connect it to Vercel for automatic deployment.

Make sure to run the setup script in the Vercel deployment to initialize the database.

## License

MIT 