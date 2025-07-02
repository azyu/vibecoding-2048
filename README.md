# 2048 Game Clone

이 프로젝트는 인기 있는 2048 게임의 클론입니다. Next.js, TypeScript, Tailwind CSS를 사용하여 개발되었으며, Playwright를 통해 E2E 테스트를 수행합니다.

## ✨ 기능

-   **기본 2048 게임 규칙**: 방향키를 사용하여 타일을 이동하고 병합하며 점수를 획득합니다.
-   **새 게임 시작**: 언제든지 새로운 게임을 시작할 수 있습니다.
-   **타일 생성 애니메이션**: 새로운 타일이 생성될 때 부드러운 애니메이션 효과를 제공합니다.
-   **확장된 UI**: 더 큰 타일과 조정된 UI 레이아웃으로 개선된 시각적 경험을 제공합니다.

## 🚀 기술 스택

-   [Next.js](https://nextjs.org/): React 프레임워크
-   [TypeScript](https://www.typescriptlang.org/): 타입스크립트
-   [Tailwind CSS](https://tailwindcss.com/): 유틸리티 우선 CSS 프레임워크
-   [Playwright](https://playwright.dev/): E2E 테스트 프레임워크

## 📦 설치 및 실행

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

1.  **저장소 클론**: (이미 클론되어 있다면 생략)

    ```bash
    git clone [저장소 URL]
    cd ai-2048
    ```

2.  **의존성 설치**:

    ```bash
    npm install
    ```

3.  **개발 서버 실행**:

    ```bash
    npm run dev
    ```

    브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 게임을 플레이할 수 있습니다.

4.  **테스트 실행**:

    ```bash
    npx playwright test
    ```

## 💡 향후 개선 사항

-   **블록 슬라이딩 애니메이션**: 타일 이동 시 부드러운 슬라이딩 애니메이션 추가
-   **게임 오버/승리 화면**: 게임 종료 시 더 명확한 피드백 제공
-   **점수 저장**: 최고 점수 저장 및 표시 기능