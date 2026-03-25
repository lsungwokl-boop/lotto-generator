import Link from 'next/link';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import AdBanner from '@/components/AdBanner';
import CoupangBanner from '@/components/CoupangBanner';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  const dataPath = path.join(process.cwd(), 'public', 'data', 'local-info.json');
  let localInfo: any[] = [];
  if (fs.existsSync(dataPath)) {
    try {
      localInfo = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    } catch(e) {}
  }
  
  const matchingItem = localInfo.find(item => post.title.includes(item.name) || post.content.includes(item.name)) || localInfo[0];
  const sourceLink = matchingItem?.link || "http://data.go.kr/";

  const postUrl = `https://koreainfos.com/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "부산시 생활 정보"
    },
    "publisher": {
      "@type": "Organization",
      "name": "부산시 생활 정보"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "홈",
        "item": "https://koreainfos.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "블로그",
        "item": "https://koreainfos.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl
      }
    ]
  };

  return (
    <div className="min-h-screen transition-colors duration-500 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* 네비게이션 */}
      <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link href="/blog" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg rotate-3">L</div>
            <span className="text-xl font-black tracking-tighter uppercase group-hover:text-primary transition-colors">Blog Post</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 pr-6">
          <Link href="/about" className="text-sm font-bold text-secondary hover:text-primary transition-colors">소개</Link>
        </div>
        <Link href="/blog" className="px-6 py-2 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-all font-bold text-sm">
          목록으로 돌아가기
        </Link>
      </nav>

      <main className="pt-28 px-4 max-w-4xl mx-auto space-y-12 animate-fade-in">
        <article className="glass-card rounded-[3rem] p-8 md:p-14 shadow-2xl border border-white/5">
          <header className="space-y-6 mb-12 border-b border-secondary/10 pb-12">
            <div className="flex items-center gap-3">
              <span className="bg-primary/10 text-primary text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {post.category}
              </span>
              <span className="text-sm text-secondary font-bold font-mono">
                최종 업데이트: {post.date}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag, i) => (
                <span key={i} className="text-xs font-bold text-secondary opacity-60">#{tag}</span>
              ))}
            </div>
          </header>

          <section className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-a:text-primary prose-img:rounded-[2rem] prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-l-primary prose-blockquote:bg-secondary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </section>

          <div className="mt-12 p-6 bg-secondary/5 rounded-2xl border border-secondary/10 text-sm text-secondary/80">
            <p className="mb-2">⚠️ <strong>[안내]</strong> 이 글은 공공데이터포털(<a href="http://data.go.kr/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">data.go.kr</a>)의 정보를 바탕으로 AI가 작성하였습니다. 정확한 내용은 원문 링크를 통해 확인해주세요.</p>
            <p>🔗 <strong>원문 출처:</strong> <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{sourceLink}</a></p>
          </div>
          
          <AdBanner />
          <CoupangBanner />
        </article>

        {/* 하단 푸터 */}
        <div className="flex justify-center pt-8">
          <Link href="/blog" className="px-12 py-4 rounded-3xl bg-foreground text-background font-black hover:-translate-y-1 transition-all shadow-xl">
            목록으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
