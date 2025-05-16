export const metadata = {
  title: 'Dustin Vali\'s Blog',
  description: 'Personal thoughts and musings',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            font-family: 'Times New Roman', Times, serif;
            max-width: 700px;
            margin: 0 auto;
            padding: 10px;
            line-height: 1.4;
          }
          * {
            font-family: 'Times New Roman', Times, serif;
          }
          a {
            color: black;
            text-decoration: none;
          }
        `}} />
      </head>
      <body>
        <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
          <h1 style={{ margin: 0 }}>
            <a href="/">Dustin Vali's Blog</a>
          </h1>
          <nav style={{ marginTop: '10px' }}>
            <a href="/" style={{ marginRight: '15px' }}>Home</a>
            <a href="/posts/all" style={{ marginRight: '15px' }}>All Posts</a>
            <a href="/admin">Admin</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', fontSize: '14px', color: '#666' }}>
          &copy; {new Date().getFullYear()} Dustin Vali
        </footer>
      </body>
    </html>
  );
} 