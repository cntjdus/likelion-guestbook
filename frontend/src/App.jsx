import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import ContributionGraph from "./components/ContributionGraph";
import CommitHistory from "./components/CommitHistory";
import StatsCard from "./components/StatsCard";
import Achievements from "./components/Achievements";
import RecentReviews from "./components/RecentReviews";

const BASE_URL = "http://43.200.76.144:8000/api/commits/";

function App() {
  const [commits, setCommits] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getCommits = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/commits/`);
      const data = await res.json();

      setCommits(
        data.map((commit) => ({
          ...commit,
          reviews: commit.reviews || [],
        }))
      );
    } catch (error) {
      console.error("커밋 목록 조회 실패:", error);
    }
  };

  useEffect(() => {
    getCommits();
  }, []);

  const addCommit = async (commit) => {
  try {
    console.log("보낼 commit:", commit);

    const res = await fetch(`${BASE_URL}/api/commits/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: commit.message,
        author: commit.author,
        description: commit.description,
        password: commit.password,
      }),
    });

    const result = await res.json();
    console.log("POST 응답:", result);

    if (!res.ok) {
      throw new Error(`POST 실패: ${res.status}`);
    }

    getCommits();
  } catch (error) {
    console.error("커밋 작성 실패:", error);
  }
};

  const addReview = async (commitId, review) => {
    try {
      await fetch(`${BASE_URL}/api/commits/${commitId}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      getCommits();
    } catch (error) {
      console.error("리뷰 작성 실패:", error);
    }
  };

  const deleteCommit = async (commitId) => {
    try {
      await fetch(`${BASE_URL}/api/commits/${commitId}/`, {
        method: "DELETE",
      });

      getCommits();
    } catch (error) {
      console.error("커밋 삭제 실패:", error);
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
        <p>Designed by Seoyeon Chu / Developed by Seoyeon Chu, Yeeun Cha</p>
        <p>Likelion CAU 14th. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;