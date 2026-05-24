function Header() {
  return (
    <header className="header">
      <div className="repo-title">
        <span className="repo-icon">▥</span>
        <span className="repo-owner">visitor-log</span>
        <span className="repo-slash">/</span>
        <strong>guestbook-repository</strong>
        <span className="public-badge">Public</span>
      </div>

      <div className="repo-actions">
        <button>☆ Star</button>
        <button>⑂ Fork</button>
        <button>◉ Watch</button>
      </div>
    </header>
  );
}

export default Header;