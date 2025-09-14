import 'dotenv/config';
import { prisma } from '../src/lib/db';

// 添加更多16personalities文章，总共达到20篇
const additionalArticles = [
  {
    title: "Understanding MBTI: A Complete Guide",
    content: `
      <div class="article-header">
        <h1>Understanding MBTI: A Complete Guide</h1>
        <div class="article-meta">
          <span class="category">MBTI Basics</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>The Myers-Briggs Type Indicator (MBTI) is one of the most popular personality assessment tools in the world. Based on Carl Jung's theory of psychological types, it helps people understand their personality preferences and how they interact with others.</p>
        
        <h2>What is MBTI?</h2>
        <p>MBTI categorizes people into 16 different personality types based on four key dimensions:</p>
        <ul>
          <li><strong>Extraversion (E) vs Introversion (I):</strong> How you gain energy and focus your attention</li>
          <li><strong>Sensing (S) vs Intuition (N):</strong> How you process information</li>
          <li><strong>Thinking (T) vs Feeling (F):</strong> How you make decisions</li>
          <li><strong>Judging (J) vs Perceiving (P):</strong> How you approach the outside world</li>
        </ul>
        
        <h2>The Four Temperaments</h2>
        <p>These 16 types are grouped into four main temperaments, each with distinct characteristics:</p>
        <ul>
          <li><strong>Analysts (NT):</strong> Strategic, logical, and innovative</li>
          <li><strong>Diplomats (NF):</strong> Idealistic, creative, and empathetic</li>
          <li><strong>Sentinels (SJ):</strong> Practical, reliable, and organized</li>
          <li><strong>Explorers (SP):</strong> Spontaneous, flexible, and action-oriented</li>
        </ul>
        
        <h2>Why MBTI Matters</h2>
        <p>Understanding your MBTI type can help you in many areas of life, from career choices to relationship building. It provides insights into your natural strengths, potential challenges, and how you can work more effectively with others.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for comprehensive MBTI resources.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "MBTI Basics"
  },
  {
    title: "Career Success for Each Personality Type",
    content: `
      <div class="article-header">
        <h1>Career Success for Each Personality Type</h1>
        <div class="article-meta">
          <span class="category">Career Guidance</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Your personality type can significantly influence your career success and job satisfaction. Understanding your natural preferences can help you choose the right career path and work environment.</p>
        
        <h2>Analysts (NT Types)</h2>
        <p>Analysts excel in careers that require strategic thinking and problem-solving. They thrive in roles such as:</p>
        <ul>
          <li>Software development and engineering</li>
          <li>Management consulting</li>
          <li>Scientific research</li>
          <li>Financial analysis</li>
          <li>University teaching</li>
        </ul>
        
        <h2>Diplomats (NF Types)</h2>
        <p>Diplomats are drawn to careers that allow them to help others and make a positive impact:</p>
        <ul>
          <li>Counseling and therapy</li>
          <li>Teaching and education</li>
          <li>Social work</li>
          <li>Human resources</li>
          <li>Non-profit leadership</li>
        </ul>
        
        <h2>Sentinels (SJ Types)</h2>
        <p>Sentinels prefer structured, reliable work environments where they can use their organizational skills:</p>
        <ul>
          <li>Project management</li>
          <li>Accounting and finance</li>
          <li>Healthcare administration</li>
          <li>Legal professions</li>
          <li>Government and public service</li>
        </ul>
        
        <h2>Explorers (SP Types)</h2>
        <p>Explorers seek dynamic, hands-on careers that offer variety and immediate results:</p>
        <ul>
          <li>Sales and marketing</li>
          <li>Emergency services</li>
          <li>Entertainment and media</li>
          <li>Skilled trades</li>
          <li>Entrepreneurship</li>
        </ul>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed career guidance.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Career Guidance"
  },
  {
    title: "Building Strong Relationships with Different Types",
    content: `
      <div class="article-header">
        <h1>Building Strong Relationships with Different Types</h1>
        <div class="article-meta">
          <span class="category">Relationships</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Understanding personality differences is crucial for building strong, lasting relationships. Each type has unique communication styles, needs, and ways of showing affection.</p>
        
        <h2>Communication Styles</h2>
        <p>Different personality types prefer different communication approaches:</p>
        <ul>
          <li><strong>Extraverts:</strong> Prefer verbal, energetic communication</li>
          <li><strong>Introverts:</strong> Value thoughtful, written communication</li>
          <li><strong>Thinkers:</strong> Focus on facts and logic</li>
          <li><strong>Feelers:</strong> Emphasize emotions and values</li>
        </ul>
        
        <h2>Love Languages by Type</h2>
        <p>Each personality type tends to express and receive love differently:</p>
        <ul>
          <li><strong>Analysts:</strong> Quality time and acts of service</li>
          <li><strong>Diplomats:</strong> Words of affirmation and quality time</li>
          <li><strong>Sentinels:</strong> Acts of service and physical touch</li>
          <li><strong>Explorers:</strong> Physical touch and quality time</li>
        </ul>
        
        <h2>Conflict Resolution</h2>
        <p>Understanding your partner's type can help resolve conflicts more effectively:</p>
        <ul>
          <li>Give Thinkers time to process before discussing</li>
          <li>Validate Feelers' emotions before problem-solving</li>
          <li>Allow Introverts space to recharge</li>
          <li>Provide Extraverts with opportunities to talk through issues</li>
        </ul>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for relationship insights.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Relationships"
  },
  {
    title: "Personal Growth Strategies for Each Type",
    content: `
      <div class="article-header">
        <h1>Personal Growth Strategies for Each Type</h1>
        <div class="article-meta">
          <span class="category">Personal Development</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Personal growth looks different for each personality type. Understanding your natural tendencies can help you develop strategies that work with your personality rather than against it.</p>
        
        <h2>For Analysts (NT Types)</h2>
        <p>Analysts can grow by:</p>
        <ul>
          <li>Developing emotional intelligence</li>
          <li>Practicing active listening</li>
          <li>Learning to appreciate others' perspectives</li>
          <li>Building patience with less efficient processes</li>
        </ul>
        
        <h2>For Diplomats (NF Types)</h2>
        <p>Diplomats can grow by:</p>
        <ul>
          <li>Setting healthy boundaries</li>
          <li>Learning to say no when necessary</li>
          <li>Developing practical skills</li>
          <li>Building resilience to criticism</li>
        </ul>
        
        <h2>For Sentinels (SJ Types)</h2>
        <p>Sentinels can grow by:</p>
        <ul>
          <li>Embracing change and uncertainty</li>
          <li>Developing flexibility</li>
          <li>Learning to delegate</li>
          <li>Exploring new possibilities</li>
        </ul>
        
        <h2>For Explorers (SP Types)</h2>
        <p>Explorers can grow by:</p>
        <ul>
          <li>Developing long-term planning skills</li>
          <li>Building consistency in habits</li>
          <li>Learning to follow through on commitments</li>
          <li>Developing strategic thinking</li>
        </ul>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for personal development resources.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Personal Development"
  }
];

async function addMoreArticles() {
  try {
    console.log('正在添加更多文章...');
    
    for (const article of additionalArticles) {
      await prisma.blog.upsert({
        where: { sourceUrl: article.sourceUrl },
        update: {
          title: article.title,
          content: article.content,
          imageUrl: article.imageUrl,
          trendingKeyword: `16personalities-${article.category.toLowerCase().replace(/\s+/g, '-')}`,
          locale: 'en'
        },
        create: {
          title: article.title,
          content: article.content,
          sourceUrl: article.sourceUrl,
          imageUrl: article.imageUrl,
          trendingKeyword: `16personalities-${article.category.toLowerCase().replace(/\s+/g, '-')}`,
          locale: 'en'
        }
      });
      console.log(`✅ 添加成功: ${article.title}`);
    }
    
    // 检查总数
    const totalCount = await prisma.blog.count();
    console.log(`🎉 现在数据库中共有 ${totalCount} 篇文章！`);
    
  } catch (error) {
    console.error('❌ 添加文章时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addMoreArticles();
