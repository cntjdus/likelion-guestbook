import { useState } from "react";
import { GitBranch, X, MessageSquare, Check, FileWarning, ChevronDown, } from "lucide-react";

function CommitDetail({ commit, onClose, onAddReview }) {
  const [reviewer, setReviewer] = useState("");
  const [type, setType] = useState("Comment");
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reviewer.trim() || !comment.trim()) {
      alert("Reviewer Name과 Review Comment를 입력해주세요.");
      return;
    }

    onAddReview(commit.id, {
      reviewer,
      type,
      comment,
    });

    setReviewer("");
    setType("Comment");
    setComment("");
  };

  return (
    <section className="commit-detail">
      <div className="detail-top">
        <div className="detail-title">
          <GitBranch size={16} className="detail-branch-icon" />
          <h2>{commit.message}</h2>
        </div>

        <button className="close-btn" onClick={onClose}>
          <X size={26} />
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

      <h3 className="reviews-title">
        <MessageSquare size={20} />
        Reviews ({commit.reviews.length})
      </h3>

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
                    {getReviewIcon(review.type)}
                    {getReviewLabel(review.type)}
                  </span>

                  <span className="review-date">May 24, 7:18 PM</span>
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

          <div className="review-type-dropdown">
            <button
              type="button"
              className="review-type-selected"
              onClick={() => setIsTypeOpen(!isTypeOpen)}
            >
              <span>
                {getReviewIcon(type)}
                {getReviewLabel(type)}
              </span>
              <ChevronDown size={18} />
            </button>

            {isTypeOpen && (
              <div className="review-type-menu">
                {["Approve", "Comment", "RequestChanges"].map((item) => (
                  <button
                    type="button"
                    className="review-type-option"
                    key={item}
                    onClick={() => {
                      setType(item);
                      setIsTypeOpen(false);
                    }}
                  >
                    {getReviewIcon(item)}
                    {getReviewLabel(item)}
                  </button>
                ))}
              </div>
            )}
          </div>
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
  if (type === "Approve") return <Check size={16} />;
  if (type === "RequestChanges") return <FileWarning size={16} />;
  return <MessageSquare size={16} />;
}

function getReviewLabel(type) {
  if (type === "Approve") return "Approved";
  if (type === "RequestChanges") return "Requested changes";
  return "Commented";
}

export default CommitDetail;
