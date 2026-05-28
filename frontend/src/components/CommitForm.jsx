import { useState } from "react";
import { MessageSquare, User, FileText, Lock } from "lucide-react";

function CommitForm({ onSubmitCommit }) {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim() || !author.trim()) {
      alert("Commit Message와 Author는 필수입니다.");
      return;
    }

    onSubmitCommit({
      id: Date.now(),
      message,
      author,
      description,
      password
    });

    setMessage("");
    setAuthor("");
    setDescription("");
    setPassword("");
  };

  return (
    <form className="commit-form" onSubmit={handleSubmit}>
      <label>
        <span>
            <MessageSquare size={18} />
            Commit Message
        </span>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="feat: your awesome contribution"
        />
        <small>Use conventional commits: feat, fix, docs, style, refactor, etc.</small>
      </label>

      <label>
        <span>
            <User size={18} />
            Author
        </span>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
        />
      </label>

      <label>
        <span>
            <FileText size={18} />
            Description
        </span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your contribution..."
        />
      </label>

      <label>
        <span>
            <Lock size={18} />
            Password (optional)
        </span>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="For reverting your commit later"
          type="password"
        />
        <small>Set a password to revert this commit in the future</small>
      </label>

      <button className="commit-submit-btn">Commit Changes</button>
    </form>
  );
}

export default CommitForm;