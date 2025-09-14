import 'dotenv/config';
import { prisma } from '../src/lib/db';

async function checkBlogs() {
  try {
    const blogs = await prisma.blog.findMany();
    console.log(`找到 ${blogs.length} 篇文章:`);
    blogs.forEach(blog => {
      console.log(`- ${blog.title} (locale: ${blog.locale})`);
    });
  } catch (error) {
    console.error('检查博客时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBlogs();
