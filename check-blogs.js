import { PrismaClient } from './src/generated/prisma/index.js';
const prisma = new PrismaClient();

async function checkBlogs() {
  try {
    const blogs = await prisma.blog.findMany({ 
      select: { id: true, title: true } 
    });
    
    console.log('Blog count:', blogs.length);
    console.log('Sample blogs:', blogs.slice(0, 3));
    
    if (blogs.length > 0) {
      console.log('\nFirst blog ID:', blogs[0].id);
      console.log('First blog title:', blogs[0].title);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBlogs();
