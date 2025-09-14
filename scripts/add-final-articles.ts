import 'dotenv/config';
import { prisma } from '../src/lib/db';

// 添加最后3篇文章，达到20篇
const finalArticles = [
  {
    title: "MBTI in the Workplace: Team Dynamics",
    content: `
      <div class="article-header">
        <h1>MBTI in the Workplace: Team Dynamics</h1>
        <div class="article-meta">
          <span class="category">Workplace</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Understanding personality types in the workplace can dramatically improve team dynamics, communication, and productivity. Each type brings unique strengths and perspectives to the team.</p>
        
        <h2>Building Effective Teams</h2>
        <p>The most successful teams often have a mix of different personality types:</p>
        <ul>
          <li><strong>Analysts:</strong> Provide strategic thinking and innovation</li>
          <li><strong>Diplomats:</strong> Foster collaboration and empathy</li>
          <li><strong>Sentinels:</strong> Ensure reliability and organization</li>
          <li><strong>Explorers:</strong> Bring energy and adaptability</li>
        </ul>
        
        <h2>Communication Strategies</h2>
        <p>Different types prefer different communication styles:</p>
        <ul>
          <li>Extraverts prefer face-to-face meetings and brainstorming</li>
          <li>Introverts work better with written communication and quiet spaces</li>
          <li>Thinkers focus on facts and data</li>
          <li>Feelers emphasize relationships and values</li>
        </ul>
        
        <h2>Conflict Resolution</h2>
        <p>Understanding personality differences can help resolve workplace conflicts more effectively by addressing the root causes of misunderstandings.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for workplace insights.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/workplace",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Workplace"
  },
  {
    title: "Parenting with MBTI: Understanding Your Child",
    content: `
      <div class="article-header">
        <h1>Parenting with MBTI: Understanding Your Child</h1>
        <div class="article-meta">
          <span class="category">Parenting</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Understanding your child's personality type can help you parent more effectively and support their natural development. Each type has unique needs and learning styles.</p>
        
        <h2>Learning Styles by Type</h2>
        <p>Different personality types learn best in different ways:</p>
        <ul>
          <li><strong>Analysts:</strong> Prefer independent study and complex challenges</li>
          <li><strong>Diplomats:</strong> Learn best through discussion and creative projects</li>
          <li><strong>Sentinels:</strong> Thrive with structured lessons and clear expectations</li>
          <li><strong>Explorers:</strong> Learn through hands-on activities and real-world applications</li>
        </ul>
        
        <h2>Motivation Strategies</h2>
        <p>Understanding what motivates your child can help you encourage them more effectively:</p>
        <ul>
          <li>Analysts are motivated by intellectual challenges</li>
          <li>Diplomats are motivated by helping others and creative expression</li>
          <li>Sentinels are motivated by achievement and recognition</li>
          <li>Explorers are motivated by fun and variety</li>
        </ul>
        
        <h2>Discipline Approaches</h2>
        <p>Different types respond better to different discipline approaches, from logical consequences to emotional support.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for parenting resources.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/parenting",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Parenting"
  },
  {
    title: "Stress Management for Each Personality Type",
    content: `
      <div class="article-header">
        <h1>Stress Management for Each Personality Type</h1>
        <div class="article-meta">
          <span class="category">Wellness</span>
          <span class="source">Source: mbti16personalities.online</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Different personality types experience and cope with stress differently. Understanding your type can help you develop effective stress management strategies.</p>
        
        <h2>Common Stress Triggers by Type</h2>
        <p>Each type has unique stress triggers:</p>
        <ul>
          <li><strong>Analysts:</strong> Inefficiency, illogical situations, micromanagement</li>
          <li><strong>Diplomats:</strong> Conflict, criticism, inauthenticity</li>
          <li><strong>Sentinels:</strong> Change, uncertainty, disorganization</li>
          <li><strong>Explorers:</strong> Routine, restrictions, boredom</li>
        </ul>
        
        <h2>Effective Coping Strategies</h2>
        <p>Different types benefit from different stress management techniques:</p>
        <ul>
          <li>Analysts: Problem-solving, research, alone time</li>
          <li>Diplomats: Creative expression, talking with friends, helping others</li>
          <li>Sentinels: Planning, organizing, maintaining routines</li>
          <li>Explorers: Physical activity, new experiences, socializing</li>
        </ul>
        
        <h2>Prevention Strategies</h2>
        <p>Understanding your stress patterns can help you prevent burnout and maintain better mental health.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for wellness resources.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/wellness",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Wellness"
  }
];

async function addFinalArticles() {
  try {
    console.log('正在添加最后3篇文章...');
    
    for (const article of finalArticles) {
      await prisma.blog.upsert({
        where: { sourceUrl: article.sourceUrl },
        update: {
          title: article.title,
          content: article.content,
          imageUrl: article.imageUrl,
          trendingKeyword: `16personalities-${article.category.toLowerCase()}`,
          locale: 'en'
        },
        create: {
          title: article.title,
          content: article.content,
          sourceUrl: article.sourceUrl,
          imageUrl: article.imageUrl,
          trendingKeyword: `16personalities-${article.category.toLowerCase()}`,
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

addFinalArticles();
