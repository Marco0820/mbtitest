import 'dotenv/config';
import { prisma } from '../src/lib/db';

// mbti16personalities.online 文章列表（手动收集的主要文章）
const articlesData = [
  {
    title: "The 16 Personality Types",
    content: "Discover the 16 personality types based on the Myers-Briggs Type Indicator (MBTI). Each type has unique characteristics, strengths, and preferences that shape how we interact with the world.",
    sourceUrl: "https://www.mbti16personalities.online/personality-types",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/overview.png",
    category: "Personality Types"
  },
  {
    title: "INTJ - The Architect",
    content: "INTJs are strategic thinkers who are always looking for ways to improve systems and processes. They are independent, decisive, and have a strong sense of personal integrity.",
    sourceUrl: "https://www.mbti16personalities.online/intj-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/intj.png",
    category: "Analysts"
  },
  {
    title: "INFP - The Mediator",
    content: "INFPs are idealistic and creative individuals who are guided by their values and beliefs. They are empathetic, flexible, and always looking for ways to help others.",
    sourceUrl: "https://www.mbti16personalities.online/infp-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/infp.png",
    category: "Diplomats"
  },
  {
    title: "ENFJ - The Protagonist",
    content: "ENFJs are natural-born leaders who are passionate about helping others reach their potential. They are charismatic, inspiring, and have a strong sense of social responsibility.",
    sourceUrl: "https://www.mbti16personalities.online/enfj-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/enfj.png",
    category: "Diplomats"
  },
  {
    title: "ESTP - The Entrepreneur",
    content: "ESTPs are energetic and action-oriented individuals who thrive in dynamic environments. They are practical, spontaneous, and have a natural ability to think on their feet.",
    sourceUrl: "https://www.mbti16personalities.online/estp-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/estp.png",
    category: "Explorers"
  },
  {
    title: "ISFJ - The Protector",
    content: "ISFJs are warm and caring individuals who are always looking out for others. They are reliable, practical, and have a strong sense of duty and responsibility.",
    sourceUrl: "https://www.mbti16personalities.online/isfj-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/isfj.png",
    category: "Sentinels"
  },
  {
    title: "ENTP - The Debater",
    content: "ENTPs are innovative and intellectually curious individuals who love to explore new ideas and possibilities. They are quick-witted, adaptable, and have a natural ability to see connections others miss.",
    sourceUrl: "https://www.mbti16personalities.online/entp-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/entp.png",
    category: "Analysts"
  },
  {
    title: "ISTJ - The Logistician",
    content: "ISTJs are practical and responsible individuals who value tradition and order. They are reliable, hardworking, and have a strong sense of duty and commitment.",
    sourceUrl: "https://www.mbti16personalities.online/istj-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/istj.png",
    category: "Sentinels"
  },
  {
    title: "ENFP - The Campaigner",
    content: "ENFPs are enthusiastic and creative individuals who are always looking for new possibilities and experiences. They are warm, empathetic, and have a natural ability to inspire others.",
    sourceUrl: "https://www.mbti16personalities.online/enfp-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/enfp.png",
    category: "Diplomats"
  },
  {
    title: "ISTP - The Virtuoso",
    content: "ISTPs are practical and hands-on individuals who love to understand how things work. They are independent, adaptable, and have a natural ability to solve problems with their hands.",
    sourceUrl: "https://www.mbti16personalities.online/istp-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/istp.png",
    category: "Explorers"
  },
  {
    title: "ESFJ - The Consul",
    content: "ESFJs are warm and caring individuals who are always looking out for others. They are organized, responsible, and have a strong sense of duty and commitment to their communities.",
    sourceUrl: "https://www.mbti16personalities.online/esfj-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/esfj.png",
    category: "Sentinels"
  },
  {
    title: "INTP - The Thinker",
    content: "INTPs are innovative and intellectually curious individuals who love to explore complex ideas and theories. They are independent, logical, and have a natural ability to see patterns and connections.",
    sourceUrl: "https://www.mbti16personalities.online/intp-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/intp.png",
    category: "Analysts"
  },
  {
    title: "ESTJ - The Executive",
    content: "ESTJs are practical and organized individuals who excel at managing people and projects. They are reliable, decisive, and have a strong sense of duty and responsibility.",
    sourceUrl: "https://www.mbti16personalities.online/estj-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/estj.png",
    category: "Sentinels"
  },
  {
    title: "ISFP - The Adventurer",
    content: "ISFPs are flexible and charming individuals who are always ready to explore new possibilities. They are artistic, sensitive, and have a strong sense of personal values.",
    sourceUrl: "https://www.mbti16personalities.online/isfp-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/isfp.png",
    category: "Explorers"
  },
  {
    title: "ENTJ - The Commander",
    content: "ENTJs are natural-born leaders who are always looking for ways to improve and optimize. They are decisive, strategic, and have a strong sense of vision and purpose.",
    sourceUrl: "https://www.mbti16personalities.online/entj-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/entj.png",
    category: "Analysts"
  },
  {
    title: "ESFP - The Entertainer",
    content: "ESFPs are spontaneous and enthusiastic individuals who love to be the center of attention. They are warm, generous, and have a natural ability to make others feel comfortable and happy.",
    sourceUrl: "https://www.mbti16personalities.online/esfp-personality",
    imageUrl: "https://www.mbti16personalities.online/static/images/personality-types/esfp.png",
    category: "Explorers"
  }
];

async function saveArticlesToDatabase() {
  console.log(`开始保存 ${articlesData.length} 篇文章到数据库...`);

  for (const article of articlesData) {
    try {
      // 创建更丰富的内容
      const fullContent = `
        <div class="article-header">
          <h1>${article.title}</h1>
          <div class="article-meta">
            <span class="category">${article.category}</span>
            <span class="source">来源: mbti16personalities.online</span>
          </div>
        </div>
        
        <div class="article-content">
          <p>${article.content}</p>
          
          <h2>关于这个性格类型</h2>
          <p>这个性格类型是16种MBTI类型之一，每种类型都有其独特的特征、优势和偏好。了解自己的性格类型可以帮助我们更好地理解自己，改善人际关系，并在职业发展中做出更好的选择。</p>
          
          <h2>主要特征</h2>
          <ul>
            <li>独特的思维方式和行为模式</li>
            <li>特定的优势和挑战</li>
            <li>在工作和生活中的表现</li>
            <li>与他人的互动方式</li>
          </ul>
          
          <h2>职业建议</h2>
          <p>不同的性格类型适合不同的职业道路。了解自己的性格类型可以帮助你找到最适合的职业方向，发挥自己的优势，实现职业目标。</p>
          
          <h2>人际关系</h2>
          <p>性格类型也影响我们与他人的关系。了解不同性格类型的特点可以帮助我们更好地与他人沟通，建立更健康的人际关系。</p>
          
          <div class="article-footer">
            <p><strong>想要了解更多？</strong> 访问 <a href="${article.sourceUrl}" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> 获取更详细的性格分析。</p>
          </div>
        </div>
      `;

      await prisma.blog.upsert({
        where: { sourceUrl: article.sourceUrl },
        update: {
          title: article.title,
          content: fullContent,
          imageUrl: article.imageUrl,
          trendingKeyword: `16personalities-${article.category.toLowerCase()}`,
          locale: 'en'
        },
        create: {
          title: article.title,
          content: fullContent,
          sourceUrl: article.sourceUrl,
          imageUrl: article.imageUrl,
          trendingKeyword: `16personalities-${article.category.toLowerCase()}`,
          locale: 'en'
        }
      });
      console.log(`✅ 保存成功: ${article.title}`);
    } catch (error) {
      console.error(`❌ 保存失败 ${article.title}:`, error);
    }
  }
}

async function main() {
  try {
    console.log('🚀 开始添加 mbti16personalities.online 文章...');
    await saveArticlesToDatabase();
    console.log(`🎉 成功添加了 ${articlesData.length} 篇文章！`);
  } catch (error) {
    console.error('❌ 添加文章过程中出现错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
