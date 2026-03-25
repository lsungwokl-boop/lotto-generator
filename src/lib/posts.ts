import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  tags: string[];
  content: string;
}

export function getSortedPostsData(): PostData[] {
  // 폴더가 없으면 빈 리스트 반환
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // 마크다운 파일만 필터링
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data, content } = matter(fileContents);

      // 날짜를 YYYY-MM-DD 문자열로 변환 처리
      let formattedDate = data.date;
      if (data.date instanceof Date) {
        formattedDate = data.date.toISOString().split('T')[0];
      }

      return {
        slug,
        title: data.title || slug,
        date: formattedDate || '',
        summary: data.summary || '',
        category: data.category || '전체',
        tags: data.tags || [],
        content: content,
      } as PostData;
    });

  // 날짜순으로 정렬
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(slug: string): PostData | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  let formattedDate = data.date;
  if (data.date instanceof Date) {
    formattedDate = data.date.toISOString().split('T')[0];
  }

  return {
    slug,
    title: data.title || slug,
    date: formattedDate || '',
    summary: data.summary || '',
    category: data.category || '전체',
    tags: data.tags || [],
    content: content,
  } as PostData;
}
