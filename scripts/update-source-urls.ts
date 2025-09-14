import 'dotenv/config';
import { prisma } from '../src/lib/db';

async function updateSourceUrls() {
  try {
    console.log('正在更新所有文章的源链接地址...');
    
    // 更新所有文章的sourceUrl
    const result = await prisma.blog.updateMany({
      data: {
        sourceUrl: 'https://mbti16personalities.online/'
      }
    });
    
    console.log(`✅ 成功更新 ${result.count} 篇文章的源链接地址`);
    
    // 检查结果
    const blogs = await prisma.blog.findMany({
      select: {
        title: true,
        sourceUrl: true
      }
    });
    
    console.log('文章列表:');
    blogs.forEach(blog => {
      console.log(`- ${blog.title}: ${blog.sourceUrl}`);
    });
    
  } catch (error) {
    console.error('❌ 更新源链接时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSourceUrls();
