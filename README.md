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
