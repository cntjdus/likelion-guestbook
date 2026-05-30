import { useState } from "react";
import CommitForm from "./CommitForm";
import CommitDetail from "./CommitDetail";
import { MessageSquare, GitBranch, RotateCcw } from "lucide-react";

function CommitHistory({
  commits,
  onAddCommit,
  onAddReview,
  onDeleteCommit,
  onDetailChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCommitId, setSelectedCommitId] = useState(null);

  const selectedCommit = commits.find(
    (commit) => commit.id === selectedCommitId
  );

  const handleRevert = async (commit) => {
    const inputPassword = prompt("비밀번호를 입력해주세요.");

    if (inputPassword === null) return;

    const confirmDelete = confirm("정말 이 commit을 삭제하시겠습니까?");

    if (confirmDelete) {
      await onDeleteCommit(commit.id, inputPassword);
    }
  };

  if (selectedCommit) {
    return (
      <CommitDetail
        commit={selectedCommit}
        onClose={() => {
          setSelectedCommitId(null);
          onDetailChange(false);
        }}
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
          onSubmitCommit={async (commit) => {
            await onAddCommit(commit);
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
          {commits.map((commit) => {
            const reviews = commit.reviews || [];

            return (
              <article
                className="commit-item github-commit-card"
                key={commit.id}
              >
                <div className="commit-left">
                  <span className="commit-branch-icon">
                    <GitBranch size={16} />
                  </span>

                  <div>
                    <strong className="commit-message">
                      {commit.message}
                    </strong>
                    <p className="commit-description">
                      {commit.description}
                    </p>

                    <div className="commit-meta">
                      <strong>{commit.author}</strong>
                      <span>
                        {" "}
                        committed {commit.createdAt || "less than a minute ago"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="revert-btn"
                  type="button"
                  onClick={() => handleRevert(commit)}
                >
                  <RotateCcw size={14} />
                  Revert
                </button>

                <button
                  className="comment-count-btn"
                  type="button"
                  onClick={() => {
                    setSelectedCommitId(commit.id);
                    onDetailChange(true);
                  }}
                >
                  <MessageSquare size={16} />
                  {reviews.length}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default CommitHistory;