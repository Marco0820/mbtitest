import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteScrapedArticles() {
  console.log('Starting deletion of scraped articles...');

  try {
    const result = await prisma.blog.deleteMany({
      where: {
        sourceUrl: {
          contains: 'mbti16personalities.online',
        },
      },
    });

    console.log(`Deletion successful: ${result.count} articles were deleted.`);
    
  } catch (error) {
    console.error('An error occurred during deletion:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Database connection closed.');
  }
}

async function main() {
    // This is a dangerous operation, so we will not run it automatically.
    // To run this script, you must uncomment the following line:
    // await deleteScrapedArticles();
    console.log("This script is designed to delete all scraped articles from the database.");
    console.log("To execute the deletion, you must uncomment the function call in the `main` function of this script.");
}

main();
