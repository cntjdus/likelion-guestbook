import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import ContributionGraph from "./components/ContributionGraph";
import CommitHistory from "./components/CommitHistory";
import StatsCard from "./components/StatsCard";
import Achievements from "./components/Achievements";
import RecentReviews from "./components/RecentReviews";
import {
  fetchCommits,
  createCommit,
  createReview,
  deleteCommit as deleteCommitApi,
} from "./api";

// 백엔드의 created_at(ISO 문자열)을 화면 표시용 문자열로 변환
function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString();
}

// 서버 응답을 프론트엔드가 사용하는 형태로 정규화
const normalizeReview = (review) => ({
  ...review,
  createdAt: formatDate(review.created_at),
});

const normalizeCommit = (commit) => ({
  ...commit,
  reviews: (commit.reviews || []).map(normalizeReview),
  createdAt: formatDate(commit.created_at),
});

function App() {
  const [commits, setCommits] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 최초 렌더 시 커밋 목록을 서버에서 불러옴
  useEffect(() => {
    fetchCommits()
      .then((data) => setCommits(data.map(normalizeCommit)))
      .catch((err) => {
        console.error(err);
        alert("커밋 목록을 불러오지 못했습니다.");
      });
  }, []);

  const addCommit = async (commit) => {
    try {
      const created = await createCommit({
        message: commit.message,
        author: commit.author,
        description: commit.description,
        password: commit.password,
      });
      setCommits((prev) => [
        { ...normalizeCommit(created), reviews: [] },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      alert("커밋 작성에 실패했습니다.");
    }
  };

  const addReview = async (commitId, review) => {
    try {
      const created = await createReview(commitId, {
        reviewer: review.reviewer,
        type: review.type,
        comment: review.comment,
      });
      const normalized = normalizeReview(created);
      setCommits((prev) =>
        prev.map((commit) =>
          commit.id === commitId
            ? { ...commit, reviews: [normalized, ...commit.reviews] }
            : commit
        )
      );
    } catch (err) {
      console.error(err);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  const deleteCommit = async (commitId, password) => {
    try {
      await deleteCommitApi(commitId, password);
      setCommits((prev) => prev.filter((commit) => commit.id !== commitId));
    } catch (err) {
      if (err.status === 400) {
        alert(err.detail?.message || "비밀번호가 일치하지 않습니다.");
      } else {
        console.error(err);
        alert("커밋 삭제에 실패했습니다.");
      }
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