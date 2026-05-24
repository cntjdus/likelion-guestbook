const achievementList = [
  {
    title: "First Commit",
    description: "Made your first contribution",
    goal: 1,
    icon: "⌁",
  },
  {
    title: "Contributor",
    description: "Made 5 contributions",
    goal: 5,
    icon: "♧",
  },
  {
    title: "Open Source Member",
    description: "Made 10 contributions",
    goal: 10,
    icon: "☆",
  },
  {
    title: "Git Master",
    description: "Made 30 contributions",
    goal: 30,
    icon: "♕",
  },
  {
    title: "Legendary Maintainer",
    description: "Made 100 contributions",
    goal: 100,
    icon: "♛",
  },
];

function Achievements({ count }) {
  return (
    <section className="side-card achievement-card">
      <h2>
        <span>♙</span> Achievements
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