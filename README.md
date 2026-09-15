# 모아 SNS 스튜디오 · koreainfos.com

홈은 모아 SNS 소개로 개편했습니다. 기존 홈과 도구는 `/lotto/`, 기존 `/blog/`, `/stores/`, `/about/`, `/privacy/`는 유지됩니다.

- `/guide/`: 사용법
- `/reward/`: 이용권 준비 안내. 광고 완료 확인·실제 이용권 발급은 비활성입니다.
- `/moa-privacy/`: 신규 페이지 개인정보 안내

실제 보상형 광고는 업체의 확장 이용권 보상 허용 확인과 공식 완료 검증, 서버의 일회성 발급·만료 관리, 확장 연동 후 활성화해야 합니다. 현재 확장 사용을 제한하지 않습니다.

기존 로또 콘텐츠와 기능의 정확성은 이번 개편 범위에서 재검증하지 않았습니다.

---

# 🎰 로또 번호 생성기

> **koreainfos.com** 에서 운영 중인 프리미엄 로또 번호 자동 생성기입니다.

## ✨ 주요 기능

- **6+1 번호 추첨**: 실제 로또와 동일하게 6개 당첨 번호 + 1개 보너스 번호 추출
- **최대 10세트 동시 생성**: 한 번에 1~10세트까지 원하는 만큼 뽑기
- **번호 저장 기능**: 마음에 드는 번호는 ⭐ 버튼으로 저장 (브라우저 보관)
- **클립보드 복사**: 📋 버튼으로 친구에게 바로 공유
- **다크 모드 지원**: 🌙 눈이 편안한 다크 테마 제공
- **로또 공 색상 구분**: 번호대별 실제 색상 적용 (노랑/파랑/빨강/회색/초록/보라)

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (Static Export)
- **Styling**: TailwindCSS
- **Hosting**: Cloudflare Pages
- **Domain**: koreainfos.com

## 🚀 로컬 실행 방법

```bash
npm install
npm run dev
```

## 📦 배포 방법

```bash
npm run build
npx wrangler pages deploy out --project-name my-local-info
```

## 📄 라이선스

© 2026 로또 번호 생성기. All rights reserved.
