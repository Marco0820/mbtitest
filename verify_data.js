import { PrismaClient } from './src/generated/prisma/index.js';
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.personalityDetails.count();
    console.log(`Found ${count} records in the personality_details table.`);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 