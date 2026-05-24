import { useState } from "react";

function CommitDetail({ commit, onClose, onAddReview }) {
  const [reviewer, setReviewer] = useState("");
  const [type, setType] = useState("Comment");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reviewer.trim() || !comment.trim()) {
      alert("Reviewer Name과 Review Comment를 입력해주세요.");
      return;
    }

    onAddReview(commit.id, {
      id: Date.now(),
      reviewer,
      type,
      comment,
      createdAt: "less than a minute ago",
    });

    setReviewer("");
    setType("Comment");
    setComment("");
  };

  return (
    <section className="commit-detail">
      <div className="detail-top">
        <div className="detail-title">
          <span className="commit-branch-icon">⌁</span>
          <h2>{commit.message}</h2>
        </div>

        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="detail-commit-box">
        <div className="avatar">{commit.author[0]?.toUpperCase()}</div>

        <div>
          <p>
            <strong>{commit.author}</strong>
            <span> committed on May 24, 2026</span>
          </p>
          <p>{commit.description}</p>
        </div>
      </div>

      <h3 className="reviews-title">▢ Reviews ({commit.reviews.length})</h3>

      {commit.reviews.length === 0 ? (
        <p className="no-review">
          No reviews yet. Be the first to review this commit!
        </p>
      ) : (
        <div className="review-list">
          {commit.reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="avatar small">
                {review.reviewer[0]?.toUpperCase()}
              </div>

              <div className="review-content">
                <div className="review-header">
                  <strong>{review.reviewer}</strong>
                  <span className={`review-badge ${review.type}`}>
                    {getReviewIcon(review.type)} {getReviewLabel(review.type)}
                  </span>
                  <span className="review-date">May 24, 5:01 PM</span>
                </div>

                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <form className="review-form" onSubmit={handleSubmit}>
        <h3>Add your review</h3>

        <label>
          Reviewer Name
          <input
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            placeholder="Your name"
          />
        </label>

        <label>
          Review Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Approve">✓ Approve</option>
            <option value="Comment">💬 Comment</option>
            <option value="RequestChanges">✕ Request Changes</option>
          </select>
        </label>

        <label>
          Review Comment
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave your feedback..."
          />
        </label>

        <button className="submit-review-btn">Submit Review</button>
      </form>
    </section>
  );
}

function getReviewIcon(type) {
  if (type === "Approve") return "✓";
  if (type === "RequestChanges") return "✕";
  return "▢";
}

function getReviewLabel(type) {
  if (type === "Approve") return "Approved";
  if (type === "RequestChanges") return "Requested changes";
  return "Commented";
}

export default CommitDetail;