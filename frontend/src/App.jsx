import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import ContributionGraph from "./components/ContributionGraph";
import CommitHistory from "./components/CommitHistory";
import StatsCard from "./components/StatsCard";
import Achievements from "./components/Achievements";
import RecentReviews from "./components/RecentReviews";

const API_BASE_URL = "http://43.200.76.144:8000";

const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "요청에 실패했습니다.");
  }

  return data;
};


function App() {
  const [commits, setCommits] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const data = await apiRequest("/commits/");
        setCommits(data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchCommits();
  }, []);

  const addCommit = async (commit) => {
    try {
      const newCommit = await apiRequest("/commits/", {
        method: "POST",
        body: JSON.stringify(commit),
      });

      setCommits((prevCommits) => [
        { ...newCommit, reviews: [] },
        ...prevCommits,
      ]);
    } catch (error) {
      alert(error.message);
    }
  };

  const addReview = async (commitId, review) => {
    try {
      const newReview = await apiRequest(`/commits/${commitId}/reviews/`, {
        method: "POST",
        body: JSON.stringify(review),
      });

      setCommits((prevCommits) =>
        prevCommits.map((commit) =>
          commit.id === commitId
            ? { ...commit, reviews: [newReview, ...commit.reviews] }
            : commit
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteCommit = async (commitId, password) => {
    try {
      await apiRequest(`/commits/${commitId}/`, {
        method: "DELETE",
        body: JSON.stringify({ password }),
      });

      setCommits((prevCommits) =>
        prevCommits.filter((commit) => commit.id !== commitId)
      );
    } catch (error) {
      alert(error.message);
    }
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
          onDeleteCommit={deleteCommit}
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

      <footer className="footer">
        <p>
          Designed by Seoyeon Chu / Developed by Seoyeon Chu, Yeeun Cha
        </p>
        <p>Likelion CAU 14th. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;
