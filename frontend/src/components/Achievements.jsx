import { GitCommitHorizontal, Users, Star, Trophy, Crown, Award, } from "lucide-react";

const achievementList = [
  {
    title: "First Commit",
    description: "Made your first contribution",
    goal: 1,
    icon: <GitCommitHorizontal size={18} />,
  },
  {
    title: "Contributor",
    description: "Made 5 contributions",
    goal: 5,
    icon: <Users size={18} />,
  },
  {
    title: "Open Source Member",
    description: "Made 10 contributions",
    goal: 10,
    icon: <Star size={18} />,
  },
  {
    title: "Git Master",
    description: "Made 30 contributions",
    goal: 30,
    icon: <Trophy size={18} />,
  },
  {
    title: "Legendary Maintainer",
    description: "Made 100 contributions",
    goal: 100,
    icon: <Crown size={18} />,
  },
];

function Achievements({ count }) {
  return (
    <section className="side-card achievement-card">
      <h2>
        <Award size={20} />
        Achievements
      </h2>

      {achievementList.map((item) => {
        const progress = Math.min((count / item.goal) * 100, 100);

        return (
          <div className="achievement-item" key={item.title}>
            <div className="achievement-icon">{item.icon}</div>

            <div className="achievement-info">
              <strong>{item.title}</strong>
              <p>{item.description}</p>

              <div className="progress-bg">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <span className="achievement-count">
              {count}/{item.goal}
            </span>
          </div>
        );
      })}
    </section>
  );
}

export default Achievements;