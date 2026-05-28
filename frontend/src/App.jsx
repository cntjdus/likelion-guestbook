import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import ContributionGraph from "./components/ContributionGraph";
import CommitHistory from "./components/CommitHistory";
import StatsCard from "./components/StatsCard";
import Achievements from "./components/Achievements";
import RecentReviews from "./components/RecentReviews";

const BASE_URL = "http://43.200.76.144:8000";

function App() {
  const [commits, setCommits] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 커밋 목록 조회
  const getCommits = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/commits/`);

      if (!res.ok) {
        throw new Error(`GET 실패: ${res.status}`);
      }

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

  // 처음 로딩 시 목록 불러오기
  useEffect(() => {
    getCommits();
  }, []);

  // 커밋 작성
  const addCommit = async (commit) => {
    try {
      console.log("프론트에서 받은 commit:", commit);

      const payload = {
        message: commit.message,
        author: commit.author,
        description: commit.description,
        password: commit.password,
      };

      console.log("백엔드로 보낼 payload:", payload);

      const res = await fetch(`${BASE_URL}/api/commits/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("POST status:", res.status);

      const result = await res.text();
      console.log("POST response:", result);

      if (!res.ok) {
        throw new Error(`POST 실패: ${res.status}`);
      }

      // 작성 후 다시 목록 조회
      await getCommits();
    } catch (error) {
      console.error("커밋 작성 실패:", error);
    }
  };

  // 리뷰 추가
  const addReview = async (commitId, review) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/commits/${commitId}/reviews/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        }
      );

      if (!res.ok) {
        throw new Error(`리뷰 작성 실패: ${res.status}`);
      }

      await getCommits();
    } catch (error) {
      console.error("리뷰 작성 실패:", error);
    }
  };

  // 커밋 삭제
  const deleteCommit = async (commitId) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/commits/${commitId}/`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(`DELETE 실패: ${res.status}`);
      }

      await getCommits();
    } catch (error) {
      console.error("커밋 삭제 실패:", error);
    }
  };

  // 최근 리뷰
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