import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export const dynamic = 'force-static';

export default function BlogListPage() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen transition-colors duration-500 pb-20">
      {/* 네비게이션 (메인과 동일한 스타일) */}
      <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg rotate-3">L</div>
            <span className="text-xl font-black tracking-tighter uppercase">Premium Blog</span>
          </Link>
        </div>
        <Link href="/" className="px-6 py-2 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-all font-bold text-sm">
          홈으로 돌아가기
        </Link>
      </nav>

      <main className="pt-28 px-4 max-w-4xl mx-auto space-y-12">
        {/* 헤더 섹션 */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Lotto Insights
          </h1>
          <p className="text-secondary font-medium text-lg">
            로또 분석과 행운의 팁을 나누는 공간입니다.
          </p>
        </header>

        {/* 게시글 리스트 */}
        <section className="grid gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <article className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all border border-white/5 hover:border-primary/30 group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                          {post.category}
                        </span>
                        <span className="text-xs text-secondary font-bold font-mono">
                          {post.date}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-secondary leading-relaxed line-clamp-2">
                        {post.summary}
                      </p>
                    </div>
                    <div className="text-3xl opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                      →
                    </div>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="glass-card p-20 rounded-[3rem] text-center space-y-4">
              <div className="text-6xl grayscale opacity-20">📭</div>
              <p className="text-secondary font-bold">아직 등록된 포스트가 없습니다.</p>
              <p className="text-xs opacity-50">src/content/posts 폴더에 첫 글을 작성해 보세요!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
