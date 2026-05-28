# Backend README

## 프로젝트 개요

likelion-guestbook의 백엔드 서버입니다.  
Django와 Django REST Framework를 사용하여 방명록 Commit과 Review 데이터를 관리합니다.

프론트엔드에서 작성한 방명록은 Commit으로 저장되고, 각 Commit에는 여러 개의 Review가 달릴 수 있습니다.

---

## 기술 스택

- Python 3.12
- Django 6.0.5
- Django REST Framework
- SQLite
- Poetry

---

## 주요 기능

- Commit 전체 조회
- Commit 생성
- Commit 단일 조회
- 비밀번호 확인 후 Commit 삭제
- Review 목록 조회
- Review 생성
- Review 삭제

---

## 모델 구조

### BaseModel

공통 시간 필드를 관리하는 추상 클래스입니다.

- created_at
- updated_at

### Commit

방명록 게시글 역할을 합니다.

- message
- author
- description
- password
- created_at
- updated_at

### Review

Commit에 달리는 댓글 역할을 합니다.

- commit
- reviewer
- type
- comment
- created_at
- updated_at

Commit과 Review는 1:N 관계입니다.


