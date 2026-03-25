import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://koreainfos.com';
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
  ];

  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    
    for (const fileName of fileNames) {
      if (!fileName.endsWith('.md')) continue;
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      let lastModified = new Date();
      if (matterResult.data.date) {
        lastModified = new Date(matterResult.data.date);
      }
      
      routes.push({
        url: `${baseUrl}/blog/${slug}`,
        lastModified,
      });
    }
  }

  return routes;
}
