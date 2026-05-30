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
      const res = await fetch(BASE_URL);

      if (!res.ok) {
        throw new Error("커밋 목록 조회 실패");
      }

      const data = await res.json();

      setCommits(
        data.map((commit) => ({
          ...commit,
          reviews: commit.reviews || [],
        }))
      );
    } catch (error) {
      console.error("getCommits 오류:", error);
      alert("커밋 목록을 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    getCommits();
  }, []);

  const addCommit = async (commit) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commit),
      });

      if (!res.ok) {
        throw new Error("커밋 작성 실패");
      }

      const newCommit = await res.json();

      setCommits((prevCommits) => [
        { ...newCommit, reviews: newCommit.reviews || [] },
        ...prevCommits,
      ]);
    } catch (error) {
      console.error("addCommit 오류:", error);
      alert("커밋 작성에 실패했습니다.");
    }
  };

  const addReview = async (commitId, review) => {
    try {
      const res = await fetch(`${BASE_URL}${commitId}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      if (!res.ok) {
        throw new Error("리뷰 작성 실패");
      }

      const newReview = await res.json();

      setCommits((prevCommits) =>
        prevCommits.map((commit) =>
          commit.id === commitId
            ? {
                ...commit,
                reviews: [newReview, ...(commit.reviews || [])],
              }
            : commit
        )
      );
    } catch (error) {
      console.error("addReview 오류:", error);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  const deleteCommit = async (commitId, password) => {
    try {
      const res = await fetch(`${BASE_URL}${commitId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        throw new Error("커밋 삭제 실패");
      }

      setCommits((prevCommits) =>
        prevCommits.filter((commit) => commit.id !== commitId)
      );
    } catch (error) {
      console.error("deleteCommit 오류:", error);
      alert("삭제에 실패했습니다. 비밀번호를 확인해주세요.");
    }
  };

  const recentReviews = commits
    .flatMap((commit) =>
      (commit.reviews || []).map((review) => ({
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