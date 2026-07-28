export default function Footer() {
  return (
    <footer className="border-t border-border py-10 text-center text-muted/70 space-y-2">
      <p>© 2026 Lawrence Owino. All rights reserved.</p>
      <p className="font-mono text-xs">
        Built with React · Projects synced live from{" "}
        <a
          href="https://github.com/lawrenceowini"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
