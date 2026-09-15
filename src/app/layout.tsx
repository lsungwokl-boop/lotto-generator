import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
const shouldShowAd = adsenseId && adsenseId !== "나중에_입력" && adsenseId.trim() !== "";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const shouldShowGA = gaId && gaId !== "나중에_입력" && gaId.trim() !== "";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  other: { "google-adsense-account": "ca-pub-5570666195506674" },
  title: "모아 SNS 스튜디오 | 소개와 사용법",
  description: "메모와 사진으로 SNS 초안을 준비하는 모아 SNS 스튜디오. 사용법과 지원 플랫폼을 확인하세요.",
  openGraph: {
    title: "모아 SNS 스튜디오 | 소개와 사용법",
    description: "메모와 사진으로 SNS 초안을 준비하는 모아 SNS 스튜디오. 사용법과 지원 플랫폼을 확인하세요.",
    url: "https://koreainfos.com",
    siteName: "모아 SNS 스튜디오",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        {shouldShowAd && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {shouldShowGA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "모아 SNS 스튜디오",
              "url": "https://koreainfos.com",
              "description": "모아 SNS 사용법과 기존 생활 정보"
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
