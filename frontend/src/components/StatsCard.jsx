import {
  GitBranch,
  Users,
  Flame,
  TrendingUp,
  Award,
} from "lucide-react";

function StatsCard({ commits = [] }) {
  const count = commits.length;

  return (
    <section className="side-card">
      <h3>Repository Statistics</h3>

      <div className="stat-row">
        <span>
          <GitBranch size={14} />
          Total Commits
        </span>
        <strong>{count}</strong>
      </div>

      <div className="stat-row">
        <span>
          <Users size={14} />
          Contributors
        </span>
        <strong>{count === 0 ? 0 : 1}</strong>
      </div>

      <div className="stat-row">
        <span>
          <Flame size={14} />
          Current Streak
        </span>
        <strong>{count > 0 ? "1 days" : "0 days"}</strong>
      </div>

      <div className="stat-row">
        <span>
          <TrendingUp size={14} />
          Longest Streak
        </span>
        <strong>{count > 0 ? "1 days" : "0 days"}</strong>
      </div>

      <div className="stat-row">
        <span>
          <Award size={14} />
          Contribution Score
        </span>
        <strong>{count}</strong>
      </div>
    </section>
  );
}

export default StatsCard;