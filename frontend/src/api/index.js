// 백엔드 API 통신 모듈
// 서버 주소는 환경변수(VITE_API_BASE_URL)로 주입하고, 없으면 로컬 개발 서버를 사용
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let detail = null;
    try {
      detail = await res.json();
    } catch {
      detail = null;
    }
    const error = new Error(`API 요청 실패 (${res.status})`);
    error.status = res.status;
    error.detail = detail;
    throw error;
  }

  // 204 No Content(삭제 등)는 본문이 없으므로 파싱하지 않음
  if (res.status === 204) return null;
  return res.json();
}

// 커밋 목록 조회
export const fetchCommits = () => request("/commits/");

// 커밋 작성
export const createCommit = (data) =>
  request("/commits/", {
    method: "POST",
    body: JSON.stringify(data),
  });

// 커밋 삭제 (비밀번호는 서버에서 검증)
export const deleteCommit = (commitId, password) =>
  request(`/commits/${commitId}/`, {
    method: "DELETE",
    body: JSON.stringify({ password }),
  });

// 리뷰 작성
export const createReview = (commitId, data) =>
  request(`/commits/${commitId}/reviews/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
