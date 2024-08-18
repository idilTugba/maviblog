import { promises as fs } from 'fs';
import { cache } from 'react';
import path from 'path';

const getBlogData = cache(async () => {
  const filePath = path.join(process.cwd(), '/public/blogData.json');
  const file = await fs.readFile(filePath, 'utf8');
  const latestBlogData = JSON.parse(file);

  return latestBlogData;
});

export default getBlogData;
