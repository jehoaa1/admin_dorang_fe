# 🎓 아트히어로 - 학원 고객 관리 시스템

![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=ArtHero&fontSize=40&fontAlign=70&fontAlignY=40)

## 📌 프로젝트 개요

- **프로젝트명**: 아트히어로 (ArtHero)
- **개발 기간**: 2024년 6월
- **기여도**: 100%
- **목표**: 학원의 매출, 학생, 강의 관리를 위한 디지털 시스템 구축

## 🛠 기술 스택

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

## ✨ 주요 기능

1. **회원가입 및 로그인**
   - JWT 인증을 통한 보안 강화
2. **학생 관리**
   - 학생 정보 등록, 수정, 삭제 기능
3. **강의 관리**
   - 강의 일정 및 내용 관리
4. **매출 관리**
   - 수강료 및 결제 내역 관리

## 🗂 데이터베이스 스키마

![ERD](./images/ERD.png)

- **주요 테이블**:
  - `users`: 회원 정보
  - `students`: 학생 정보
  - `courses`: 강의 정보
  - `payments`: 결제 내역

## 🚀 설치 및 실행 방법

1. **레포지토리 클론**

   ```bash
   git clone https://github.com/jehoaa1/sdbd.git
   cd sdbd
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **환경 변수 설정**

   `.env.local` 파일을 생성하고 다음과 같이 설정합니다:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   브라우저에서 `http://localhost:3000`을 열어 확인합니다.

## 🧪 테스트

- **백엔드 테스트**: Pytest를 사용하여 FastAPI 엔드포인트 테스트
- **프론트엔드 테스트**: Jest 및 React Testing Library를 사용하여 컴포넌트 테스트

## 📦 배포

- **CI/CD 파이프라인**: GitHub Actions를 사용하여 자동화된 테스트 및 배포
- **서버**: AWS EC2 인스턴스에 Docker를 사용하여 배포
- **데이터베이스**: AWS RDS(MySQL)를 사용하여 안정적인 데이터 관리
