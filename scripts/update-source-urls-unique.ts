import 'dotenv/config';
import { prisma } from '../src/lib/db';

async function updateSourceUrlsUnique() {
  try {
    console.log('正在更新所有文章的源链接地址...');
    
    // 获取所有文章
    const blogs = await prisma.blog.findMany();
    
    for (const blog of blogs) {
      // 为每篇文章创建唯一的URL
      const uniqueUrl = `https://mbti16personalities.online/blog/${blog.id}`;
      
      await prisma.blog.update({
        where: { id: blog.id },
        data: {
          sourceUrl: uniqueUrl
        }
      });
      
      console.log(`✅ 更新: ${blog.title} -> ${uniqueUrl}`);
    }
    
    console.log(`🎉 成功更新 ${blogs.length} 篇文章的源链接地址`);
    
  } catch (error) {
    console.error('❌ 更新源链接时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSourceUrlsUnique();
