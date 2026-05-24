import { MessageSquare } from "lucide-react";

function RecentReviews({ reviews }) {
  return (
    <section className="side-card recent-review-card">
      <h2>
        <MessageSquare size={20} />
        Recent Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="recent-empty">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div className="recent-review-item" key={review.id}>
            <MessageSquare size={16} className="recent-icon" />

            <div>
              <p>
                <strong>{review.reviewer}</strong> commented on{" "}
                <b>"{review.commitMessage}"</b>
              </p>
              <small>{review.createdAt}</small>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default RecentReviews;