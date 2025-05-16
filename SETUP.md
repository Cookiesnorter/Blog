# Setup Guide for Minimal Blog

## If you're encountering issues

If you're seeing an internal server error when running the application, follow these troubleshooting steps:

### 1. Create the database file manually

```bash
# Create an empty database file (run this in the project root)
touch blog.db
```

### 2. Initialize the database

Visit the following URL in your browser after starting the development server:

```
http://localhost:3000/api/init-db
```

And then:

```
http://localhost:3000/api/seed-db
```

### 3. Restart the application

Stop the current server (Ctrl+C) and restart it:

```bash
npm run dev
```

## Complete Setup Process

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create an empty database file:
   ```bash
   touch blog.db
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Initialize the database via API:
   - Visit: http://localhost:3000/api/init-db
   - Then visit: http://localhost:3000/api/seed-db

5. Access the blog:
   - Home: http://localhost:3000
   - Admin: http://localhost:3000/admin (Password: Dustin525)

## Common Issues

### Database File Permissions

Make sure the directory and the blog.db file have appropriate write permissions:

```bash
chmod 666 blog.db
```

### Node.js Version

This application requires Node.js version 18 or higher. Check your version with:

```bash
node --version
```

### SQLite Issues

If you're having problems with SQLite, you might need to install it on your system:

- **Ubuntu/Debian**: `sudo apt-get install sqlite3`
- **macOS**: `brew install sqlite3`
- **Windows**: Download from the [SQLite website](https://www.sqlite.org/download.html)

## Production Deployment

To deploy to Vercel:

1. Push your code to a Git repository
2. Connect the repository to Vercel
3. Set the Environment Variables in Vercel project settings:
   - `DATABASE_FILE=./blog.db`
   - `ADMIN_PASSWORD=Dustin525` (or a different secure password) 