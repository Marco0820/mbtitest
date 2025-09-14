import 'dotenv/config';
import { prisma } from '../src/lib/db';

async function removeArticleImages() {
  try {
    console.log('正在移除所有文章的图片...');
    
    // 更新所有文章，将imageUrl设置为null
    const result = await prisma.blog.updateMany({
      data: {
        imageUrl: null
      }
    });
    
    console.log(`✅ 成功移除 ${result.count} 篇文章的图片`);
    
    // 检查结果
    const blogs = await prisma.blog.findMany({
      select: {
        title: true,
        imageUrl: true
      }
    });
    
    console.log('文章列表:');
    blogs.forEach(blog => {
      console.log(`- ${blog.title}: ${blog.imageUrl ? '有图片' : '无图片'}`);
    });
    
  } catch (error) {
    console.error('❌ 移除图片时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeArticleImages();
