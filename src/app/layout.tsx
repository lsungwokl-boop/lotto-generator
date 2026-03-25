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
  title: "부산시 생활 정보 | 행사·혜택·지원금 안내",
  description: "부산시 주민을 위한 지역 행사, 축제, 지원금, 혜택 정보를 매일 업데이트합니다.",
  openGraph: {
    title: "부산시 생활 정보 | 행사·혜택·지원금 안내",
    description: "부산시 주민을 위한 지역 행사, 축제, 지원금, 혜택 정보를 매일 업데이트합니다.",
    url: "https://koreainfos.com",
    siteName: "부산시 생활 정보",
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
              "name": "부산시 생활 정보",
              "url": "https://koreainfos.com",
              "description": "부산시 주민을 위한 지역 행사, 축제, 지원금, 혜택 정보"
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
