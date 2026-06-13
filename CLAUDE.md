# 오늘의 가방

수업 과제용으로 만드는 웹서비스입니다.

## 프로젝트 정보

- 서비스명: 오늘의 가방
- 사용 기술: Vite, React, TypeScript
- 목적: 수업 과제용 웹서비스

## 개발 원칙

- Vite, React, TypeScript를 사용한다.
- 외부 생성 서비스, 외부 서버, 데이터베이스는 사용하지 않는다.
- 모든 데이터는 프론트엔드 상태(state) 또는 로컬 데이터(const 배열)로 관리한다.
- 기능은 한 번에 크게 구현하지 말고 단계별로 구현한다.
- 새로운 기능을 추가할 때는 기존 기능을 유지한다.
- 큰 구조 변경이나 파일 삭제 전에는 먼저 변경 이유를 설명한다.
- 구현 후 반드시 `npm run build`를 실행하여 오류 여부를 확인한다.
- 구현이 완료되면 변경된 파일을 설명한다.

## Git 규칙

### 작업 전

- `git status` 확인

### 작업 후

- `npm run build` 실행
- `git status` 확인

### 커밋 시

- 기능 단위로 커밋
- 커밋 메시지는 간결하게 작성

예시:

- Create landing page
- Add location selection
- Add item selection
- Add bag selection
- Add save feature

## 현재 구현 상태

### 완료

- 랜딩 페이지
- Step 01 장소 선택
- Step 02 소지품 선택
- 사용자 직접 입력 소지품 추가

### 예정

- Step 03 가방 선택
- 가방 내부 배치
- 체크리스트 표시
- 가방 조합 저장
- 저장된 가방 불러오기
