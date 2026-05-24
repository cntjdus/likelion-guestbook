import { useState } from "react";
import CommitForm from "./CommitForm";
import CommitDetail from "./CommitDetail";

function CommitHistory({ commits, onAddCommit, onAddReview }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCommit, setSelectedCommit] = useState(null);

  if (selectedCommit) {
    const currentCommit = commits.find((commit) => commit.id === selectedCommit.id);

    return (
      <CommitDetail
        commit={currentCommit}
        onClose={() => setSelectedCommit(null)}
        onAddReview={onAddReview}
      />
    );
  }

  return (
    <section className={`commit-card ${isOpen ? "expanded" : ""}`}>
      <div className="commit-header">
        <h2>Commit History</h2>

        <button className="new-commit-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Cancel" : "New Commit"}
        </button>
      </div>

      {isOpen && (
        <CommitForm
          onSubmitCommit={(commit) => {
            onAddCommit(commit);
            setIsOpen(false);
          }}
        />
      )}

      {commits.length === 0 ? (
        <div className="empty-commit">
          <p>No commits yet.</p>
          <span>Be the first contributor.</span>
        </div>
      ) : (
        <div className="commit-list">
          {commits.map((commit) => (
            <article
              className="commit-item clickable"
              key={commit.id}
              onClick={() => setSelectedCommit(commit)}
            >
              <div>
                <strong>{commit.message}</strong>
                <p>{commit.description}</p>
                <span>
                  {commit.author} committed less than a minute ago
                </span>
              </div>

              <div className="review-count">
                💬 {commit.reviews.length}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default CommitHistory;