import 'dotenv/config';
import { prisma } from '../src/lib/db';

// mbti16personalities.online 文章列表（纯英文内容）
const articlesData = [
  {
    title: "The 16 Personality Types",
    content: `
      <div class="article-header">
        <h1>The 16 Personality Types</h1>
        <div class="article-meta">
          <span class="category">Personality Types</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Discover the 16 personality types based on the Myers-Briggs Type Indicator (MBTI). Each type has unique characteristics, strengths, and preferences that shape how we interact with the world.</p>
        
        <h2>Understanding Personality Types</h2>
        <p>The 16 personality types are based on four key dimensions:</p>
        <ul>
          <li><strong>Extraversion (E) vs Introversion (I):</strong> How you gain energy and focus your attention</li>
          <li><strong>Sensing (S) vs Intuition (N):</strong> How you process information</li>
          <li><strong>Thinking (T) vs Feeling (F):</strong> How you make decisions</li>
          <li><strong>Judging (J) vs Perceiving (P):</strong> How you approach the outside world</li>
        </ul>
        
        <h2>The Four Temperaments</h2>
        <p>These 16 types are grouped into four main temperaments:</p>
        <ul>
          <li><strong>Analysts:</strong> INTJ, INTP, ENTJ, ENTP</li>
          <li><strong>Diplomats:</strong> INFJ, INFP, ENFJ, ENFP</li>
          <li><strong>Sentinels:</strong> ISTJ, ISFJ, ESTJ, ESFJ</li>
          <li><strong>Explorers:</strong> ISTP, ISFP, ESTP, ESFP</li>
        </ul>
        
        <h2>Why Understanding Your Type Matters</h2>
        <p>Knowing your personality type can help you understand your strengths, challenges, and how you interact with others. It can guide career choices, improve relationships, and support personal growth.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/personality-types" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed personality analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/personality-types",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Personality Types"
  },
  {
    title: "INTJ - The Architect",
    content: `
      <div class="article-header">
        <h1>INTJ - The Architect</h1>
        <div class="article-meta">
          <span class="category">Analysts</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>INTJs are strategic thinkers who are always looking for ways to improve systems and processes. They are independent, decisive, and have a strong sense of personal integrity.</p>
        
        <h2>Key Characteristics</h2>
        <ul>
          <li><strong>Strategic:</strong> Always thinking several steps ahead</li>
          <li><strong>Independent:</strong> Prefer to work alone and make their own decisions</li>
          <li><strong>Decisive:</strong> Confident in their judgments and quick to act</li>
          <li><strong>Hard-working:</strong> Willing to put in the effort to achieve their goals</li>
          <li><strong>Determined:</strong> Persistent in pursuing their objectives</li>
        </ul>
        
        <h2>Strengths</h2>
        <ul>
          <li>Quick, imaginative mind</li>
          <li>High self-confidence</li>
          <li>Independent and decisive</li>
          <li>Hard-working and determined</li>
          <li>Open-minded</li>
        </ul>
        
        <h2>Weaknesses</h2>
        <ul>
          <li>Overly analytical</li>
          <li>Loathe highly structured environments</li>
          <li>Clueless in romance</li>
          <li>May be insensitive</li>
        </ul>
        
        <h2>Career Paths</h2>
        <p>INTJs excel in careers that require strategic thinking, such as engineering, research, management consulting, and entrepreneurship.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/intj-personality" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed INTJ analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/intj-personality",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Analysts"
  },
  {
    title: "INFP - The Mediator",
    content: `
      <div class="article-header">
        <h1>INFP - The Mediator</h1>
        <div class="article-meta">
          <span class="category">Diplomats</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>INFPs are idealistic and creative individuals who are guided by their values and beliefs. They are empathetic, flexible, and always looking for ways to help others.</p>
        
        <h2>Key Characteristics</h2>
        <ul>
          <li><strong>Idealistic:</strong> Always looking for the good in people and situations</li>
          <li><strong>Creative:</strong> Have a rich inner world and vivid imagination</li>
          <li><strong>Passionate:</strong> Deeply committed to their values and beliefs</li>
          <li><strong>Curious:</strong> Always eager to learn and explore new ideas</li>
          <li><strong>Dedicated:</strong> Willing to work hard for causes they believe in</li>
        </ul>
        
        <h2>Strengths</h2>
        <ul>
          <li>Idealistic and principled</li>
          <li>Loyal and devoted</li>
          <li>Curious and open-minded</li>
          <li>Creative and artistic</li>
          <li>Passionate and energetic</li>
        </ul>
        
        <h2>Weaknesses</h2>
        <ul>
          <li>Too idealistic</li>
          <li>Too altruistic</li>
          <li>Impractical</li>
          <li>Dislike dealing with data</li>
          <li>Take things personally</li>
        </ul>
        
        <h2>Career Paths</h2>
        <p>INFPs thrive in creative fields such as writing, art, counseling, and social work where they can help others and express their creativity.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/infp-personality" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed INFP analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/infp-personality",
    imageUrl: "https://images.unsplash.com/photo-1505526543118-2469491CFde1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Diplomats"
  },
  {
    title: "ENFJ - The Protagonist",
    content: `
      <div class="article-header">
        <h1>ENFJ - The Protagonist</h1>
        <div class="article-meta">
          <span class="category">Diplomats</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>ENFJs are natural-born leaders who are passionate about helping others reach their potential. They are charismatic, inspiring, and have a strong sense of social responsibility.</p>
        
        <h2>Key Characteristics</h2>
        <ul>
          <li><strong>Charismatic:</strong> Natural ability to inspire and motivate others</li>
          <li><strong>Inspiring:</strong> Help others see their potential and achieve their goals</li>
          <li><strong>Natural-born leaders:</strong> Comfortable taking charge and guiding others</li>
          <li><strong>Passionate:</strong> Deeply committed to their values and causes</li>
          <li><strong>Altruistic:</strong> Genuinely care about the well-being of others</li>
        </ul>
        
        <h2>Strengths</h2>
        <ul>
          <li>Natural-born leaders</li>
          <li>Passionate and charismatic</li>
          <li>Altruistic and principled</li>
          <li>Creative and insightful</li>
          <li>Inspiring and influential</li>
        </ul>
        
        <h2>Weaknesses</h2>
        <ul>
          <li>Overly idealistic</li>
          <li>Too selfless</li>
          <li>Sensitive to criticism</li>
          <li>Fluctuating self-esteem</li>
          <li>Struggle to make tough decisions</li>
        </ul>
        
        <h2>Career Paths</h2>
        <p>ENFJs excel in leadership roles, teaching, counseling, and any field where they can help others grow and develop.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/enfj-personality" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed ENFJ analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/enfj-personality",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Diplomats"
  },
  {
    title: "ESTP - The Entrepreneur",
    content: `
      <div class="article-header">
        <h1>ESTP - The Entrepreneur</h1>
        <div class="article-meta">
          <span class="category">Explorers</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>ESTPs are energetic and action-oriented individuals who thrive in dynamic environments. They are practical, spontaneous, and have a natural ability to think on their feet.</p>
        
        <h2>Key Characteristics</h2>
        <ul>
          <li><strong>Bold:</strong> Not afraid to take risks and try new things</li>
          <li><strong>Practical:</strong> Focus on what works in the real world</li>
          <li><strong>Original:</strong> Creative and innovative in their approach</li>
          <li><strong>Perceptive:</strong> Quick to pick up on what's happening around them</li>
          <li><strong>Direct:</strong> Straightforward and honest in their communication</li>
        </ul>
        
        <h2>Strengths</h2>
        <ul>
          <li>Bold and rational</li>
          <li>Practical and original</li>
          <li>Perceptive and direct</li>
          <li>Sociable and spontaneous</li>
          <li>Know how to prioritize</li>
        </ul>
        
        <h2>Weaknesses</h2>
        <ul>
          <li>Sensitive</li>
          <li>Impatient</li>
          <li>Risk-prone</li>
          <li>Unstructured</li>
          <li>May miss the bigger picture</li>
        </ul>
        
        <h2>Career Paths</h2>
        <p>ESTPs excel in sales, marketing, entrepreneurship, and any field that requires quick thinking and adaptability.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/estp-personality" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed ESTP analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/estp-personality",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Explorers"
  }
];

async function updateArticlesWithEnglishContent() {
  try {
    console.log('正在更新文章为英文内容...');
    
    for (const articleData of articlesData) {
      await prisma.blog.upsert({
        where: { sourceUrl: articleData.sourceUrl },
        update: {
          title: articleData.title,
          content: articleData.content,
          imageUrl: articleData.imageUrl,
          trendingKeyword: `16personalities-${articleData.category.toLowerCase()}`,
          locale: 'en' // 保持为英文
        },
        create: {
          title: articleData.title,
          content: articleData.content,
          sourceUrl: articleData.sourceUrl,
          imageUrl: articleData.imageUrl,
          trendingKeyword: `16personalities-${articleData.category.toLowerCase()}`,
          locale: 'en'
        }
      });
      console.log(`✅ 更新成功: ${articleData.title}`);
    }
    
    console.log('🎉 所有文章已更新为英文内容！');
    
  } catch (error) {
    console.error('❌ 更新文章时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateArticlesWithEnglishContent();
