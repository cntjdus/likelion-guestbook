import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import ContributionGraph from "./components/ContributionGraph";
import CommitHistory from "./components/CommitHistory";
import StatsCard from "./components/StatsCard";
import Achievements from "./components/Achievements";
import RecentReviews from "./components/RecentReviews";

function App() {
  const [commits, setCommits] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const addCommit = (commit) => {
    setCommits([{ ...commit, reviews: [] }, ...commits]);
  };

  const addReview = (commitId, review) => {
    setCommits(
      commits.map((commit) =>
        commit.id === commitId
          ? { ...commit, reviews: [review, ...commit.reviews] }
          : commit
      )
    );
  };

  const recentReviews = commits
    .flatMap((commit) =>
      commit.reviews.map((review) => ({
        ...review,
        commitMessage: commit.message,
      }))
    )
    .slice(0, 5);

  return (
    <div className="app">
      <Header />
      <ContributionGraph commits={commits} />

      <main className={`main-layout ${isDetailOpen ? "detail-mode" : ""}`}>
        <CommitHistory
          commits={commits}
          onAddCommit={addCommit}
          onAddReview={addReview}
          onDetailChange={setIsDetailOpen}
        />

        <aside className="side-area">
         <StatsCard commits={commits} />
         <Achievements count={commits.length} />
        </aside>

        <aside className="recent-area">
         <RecentReviews reviews={recentReviews} />
        </aside>
      </main>
    </div>
  );
}

export default App;