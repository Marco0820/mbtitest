import 'dotenv/config';
import { prisma } from '../src/lib/db';

async function checkBlogCount() {
  try {
    const blogs = await prisma.blog.findMany();
    console.log(`数据库中共有 ${blogs.length} 篇文章:`);
    blogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title} (${blog.trendingKeyword})`);
    });
  } catch (error) {
    console.error('检查博客数量时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBlogCount();
