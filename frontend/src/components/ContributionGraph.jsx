function ContributionGraph({ commits }) {
  const cells = Array.from({ length: 52 * 7 });

  return (
    <section className="contribution-card">
      <div className="contribution-header">
        <h3>{commits.length} contributions in the last year</h3>
        <span>Contribution settings⌄</span>
      </div>

      <div className="contribution-body">
        <div className="graph-left">
          <div className="months">
            {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"].map(
              (month) => (
                <span key={month}>{month}</span>
              )
            )}
          </div>

          <div className="graph-row">
            <div className="weekdays">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div className="graph-grid">
              {cells.map((_, index) => (
                <div
                  key={index}
                  className={`grass-cell ${index < commits.length ? "filled" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="year-tabs">
          <button className="active">2026</button>
          <span>2025</span>
          <span>2024</span>
        </div>
      </div>

      <div className="graph-footer">
        <span>Learn how we count contributions</span>

        <div className="legend">
          <span>Less</span>
          <i></i>
          <i className="lv1"></i>
          <i className="lv2"></i>
          <i className="lv3"></i>
          <i className="lv4"></i>
          <span>More</span>
        </div>
      </div>
    </section>
  );
}

export default ContributionGraph;