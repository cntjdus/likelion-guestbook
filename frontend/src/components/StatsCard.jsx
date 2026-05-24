function StatsCard({ commits }) {
  const count = commits.length;

  return (
    <section className="side-card">
      <h3>Repository Statistics</h3>

      <div className="stat-row">
        <span>⌁ Total Commits</span>
        <strong>{count}</strong>
      </div>

      <div className="stat-row">
        <span>♧ Contributors</span>
        <strong>{count === 0 ? 0 : 1}</strong>
      </div>

      <div className="stat-row">
        <span>♨ Current Streak</span>
        <strong>{count > 0 ? "1 days" : "0 days"}</strong>
      </div>

      <div className="stat-row">
        <span>⌁ Longest Streak</span>
        <strong>{count > 0 ? "1 days" : "0 days"}</strong>
      </div>

      <div className="stat-row">
        <span>♙ Contribution Score</span>
        <strong>{count}</strong>
      </div>
    </section>
  );
}

export default StatsCard;