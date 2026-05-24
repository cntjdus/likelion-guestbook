import {BookOpen} from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="repo-title">
        <BookOpen size={24} />
        <span className="owner">visitor-log</span>
        <span className="slash"> / </span>
        <span className="repo-name">guestbook-repository</span>
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