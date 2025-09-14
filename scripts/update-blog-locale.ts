import 'dotenv/config';
import { prisma } from '../src/lib/db';

async function updateBlogLocale() {
  try {
    console.log('正在更新博客文章的locale...');
    
    const result = await prisma.blog.updateMany({
      where: {
        locale: 'en'
      },
      data: {
        locale: 'zh-CN'
      }
    });
    
    console.log(`成功更新了 ${result.count} 篇文章的locale为 zh-CN`);
    
    // 验证更新结果
    const blogs = await prisma.blog.findMany();
    console.log(`现在数据库中有 ${blogs.length} 篇文章，locale分布:`);
    const localeCount = blogs.reduce((acc, blog) => {
      acc[blog.locale] = (acc[blog.locale] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    console.log(localeCount);
    
  } catch (error) {
    console.error('更新locale时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBlogLocale();
