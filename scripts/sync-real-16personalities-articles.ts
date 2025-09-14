import 'dotenv/config';
import { prisma } from '../src/lib/db';

// mbti16personalities.online 真实文章数据
const realArticles = [
  {
    title: "Our Framework",
    content: `
      <div class="article-header">
        <h1>Our Framework</h1>
        <div class="article-meta">
          <span class="category">Framework</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">657 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Introduction</p>
        <p>The Historical Detour</p>
        <p>Types vs. Traits</p>
        <p>Our Approach</p>
        <p>Reliability and Validity</p>
        <p>Five Personality Aspects</p>
        
        <h2>Introduction</h2>
        <p>Our framework is based on decades of research and development. We've refined the traditional Myers-Briggs Type Indicator to create a more accurate and practical personality assessment.</p>
        
        <h2>The Historical Detour</h2>
        <p>Understanding the evolution of personality psychology helps us appreciate the foundation upon which our framework is built. From ancient Greek temperaments to modern neuroscience, we've incorporated the best insights from each era.</p>
        
        <h2>Types vs. Traits</h2>
        <p>Our approach combines the clarity of type theory with the nuance of trait theory, providing both categorical insights and dimensional understanding of personality differences.</p>
        
        <h2>Our Approach</h2>
        <p>We focus on practical applications, ensuring that our personality insights can be used effectively in real-world situations, from career planning to relationship building.</p>
        
        <h2>Reliability and Validity</h2>
        <p>Our assessments undergo rigorous testing to ensure they provide consistent, accurate results that users can trust and act upon.</p>
        
        <h2>Five Personality Aspects</h2>
        <p>We measure five key aspects of personality: Mind, Energy, Nature, Tactics, and Identity, providing a comprehensive view of individual differences.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles/our-theory" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for the complete framework.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/our-theory",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Framework"
  },
  {
    title: "Assertive Mediator (INFP-A) vs. Turbulent Mediator (INFP-T)",
    content: `
      <div class="article-header">
        <h1>Assertive Mediator (INFP-A) vs. Turbulent Mediator (INFP-T)</h1>
        <div class="article-meta">
          <span class="category">Personality Types</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">392 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Mediators are quiet, private, free spirits who view life as an endless series of idealistic possibilities waiting to be realized. They typically try to get along with others and promote harmony.</p>
        
        <h2>Understanding the Differences</h2>
        <p>While both Assertive and Turbulent Mediators share the same core personality traits, their Identity aspect creates subtle but important differences in how they approach life and challenges.</p>
        
        <h2>Assertive Mediators (INFP-A)</h2>
        <p>Assertive Mediators tend to be more confident in their abilities and less affected by stress. They're more likely to trust their instincts and make decisions without second-guessing themselves.</p>
        
        <h2>Turbulent Mediators (INFP-T)</h2>
        <p>Turbulent Mediators are more sensitive to criticism and may struggle with self-doubt. However, this sensitivity often drives them to work harder and achieve more than they might otherwise.</p>
        
        <h2>Key Differences</h2>
        <ul>
          <li>Stress management approaches</li>
          <li>Decision-making confidence</li>
          <li>Response to criticism</li>
          <li>Goal-setting strategies</li>
        </ul>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles/assertive-mediator-infp-a-vs-turbulent-mediator-infp-t" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/assertive-mediator-infp-a-vs-turbulent-mediator-infp-t",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Personality Types"
  },
  {
    title: "Assertive Advocate (INFJ-A) vs. Turbulent Advocate (INFJ-T)",
    content: `
      <div class="article-header">
        <h1>Assertive Advocate (INFJ-A) vs. Turbulent Advocate (INFJ-T)</h1>
        <div class="article-meta">
          <span class="category">Personality Types</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">173 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>While Assertive (INFJ-A) and Turbulent (INFJ-T) Advocates are likely to be more alike than different, their Identity personality trait provides some nuanced dissimilarities between the two.</p>
        
        <h2>Shared Characteristics</h2>
        <p>Both types share the core Advocate traits: intuitive, feeling, judging, and introverted. They both seek to help others and make a positive impact on the world.</p>
        
        <h2>Assertive Advocates (INFJ-A)</h2>
        <p>Assertive Advocates are more confident in their abilities and less likely to be overwhelmed by stress. They trust their insights and are more decisive in their actions.</p>
        
        <h2>Turbulent Advocates (INFJ-T)</h2>
        <p>Turbulent Advocates are more sensitive to criticism and may experience more self-doubt. However, this sensitivity often makes them more empathetic and understanding.</p>
        
        <h2>Practical Implications</h2>
        <p>Understanding these differences can help Advocates better manage their strengths and challenges, whether in personal relationships or professional settings.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles/assertive-advocate-infj-a-vs-turbulent-advocate-infj-t" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/assertive-advocate-infj-a-vs-turbulent-advocate-infj-t",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Personality Types"
  },
  {
    title: "Identity: Assertive (-A) vs. Turbulent (-T)",
    content: `
      <div class="article-header">
        <h1>Identity: Assertive (-A) vs. Turbulent (-T)</h1>
        <div class="article-meta">
          <span class="category">Personality Theory</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">745 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Confidence, Achievement, and You</p>
        <p>The Identity scale, made up of the Assertive and Turbulent personality traits, affects all other scales and indicates how confident we are in our abilities and decisions.</p>
        
        <h2>Understanding Identity</h2>
        <p>The Identity aspect is unique in that it influences how all other personality traits are expressed. It's about how confident and self-assured we are in our abilities and decisions.</p>
        
        <h2>Assertive Identity (-A)</h2>
        <p>People with Assertive identity are generally confident in their abilities and less affected by stress. They trust their instincts and are comfortable with their decisions.</p>
        
        <h2>Turbulent Identity (-T)</h2>
        <p>People with Turbulent identity are more sensitive to criticism and may experience more self-doubt. However, this sensitivity often drives them to work harder and achieve more.</p>
        
        <h2>Impact on Other Traits</h2>
        <p>The Identity aspect affects how all other personality traits are expressed, making it a crucial component of our overall personality profile.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles/identity-assertive-vs-turbulent" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/identity-assertive-vs-turbulent",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Personality Theory"
  },
  {
    title: "Tactics: Judging (J) vs. Prospecting (P)",
    content: `
      <div class="article-header">
        <h1>Tactics: Judging (J) vs. Prospecting (P)</h1>
        <div class="article-meta">
          <span class="category">Personality Theory</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">455 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Crossing the Finish Line (By Whatever Means)</p>
        <p>The Tactics scale, which includes the Judging and Prospecting personality traits, reflects how people plan and deal with the options they have.</p>
        
        <h2>Understanding Tactics</h2>
        <p>The Tactics aspect describes how we approach planning and decision-making. It's about our preference for structure versus flexibility in our daily lives.</p>
        
        <h2>Judging (J)</h2>
        <p>People with Judging traits prefer structure, planning, and closure. They like to have things decided and organized, and they work well with deadlines and schedules.</p>
        
        <h2>Prospecting (P)</h2>
        <p>People with Prospecting traits prefer flexibility, spontaneity, and keeping options open. They adapt well to changing circumstances and prefer to go with the flow.</p>
        
        <h2>Practical Applications</h2>
        <p>Understanding your Tactics preference can help you choose careers, relationships, and lifestyles that align with your natural tendencies.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles/tactics-judging-vs-prospecting" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/tactics-judging-vs-prospecting",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Personality Theory"
  },
  {
    title: "Mind: Intuitive (N) vs. Observant (S)",
    content: `
      <div class="article-header">
        <h1>Mind: Intuitive (N) vs. Observant (S)</h1>
        <div class="article-meta">
          <span class="category">Personality Theory</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">324 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Thought at Every Scale</p>
        <p>Our second personality scale includes the Intuitive (N) and Observant (S) styles. These traits describe what people are more likely to do with the information gathered.</p>
        
        <h2>Understanding Mind</h2>
        <p>The Mind aspect describes how we process information and what we focus on when making decisions. It's about our preference for abstract thinking versus concrete details.</p>
        
        <h2>Intuitive (N)</h2>
        <p>People with Intuitive traits focus on possibilities, patterns, and abstract concepts. They're interested in theories, ideas, and future possibilities rather than current realities.</p>
        
        <h2>Observant (S)</h2>
        <p>People with Observant traits focus on facts, details, and present realities. They're practical, grounded, and prefer concrete information over abstract theories.</p>
        
        <h2>Complementary Strengths</h2>
        <p>Both approaches have their strengths, and the most effective teams often include both Intuitive and Observant types to balance big-picture thinking with attention to detail.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles/mind-intuitive-vs-observant" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/mind-intuitive-vs-observant",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Personality Theory"
  },
  {
    title: "Roles: Diplomats",
    content: `
      <div class="article-header">
        <h1>Roles: Diplomats</h1>
        <div class="article-meta">
          <span class="category">Personality Roles</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">395 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Shared personality traits: Intuitive (N) and Feeling (F)</p>
        <p>Longing for Connection</p>
        <p>Diplomat personality types – Advocates (INFJ), Mediators (INFP), Protagonists (ENFJ), and Campaigners (ENFP) – can be idealistic and ethical, seeking to make the world a better place.</p>
        
        <h2>Understanding Diplomats</h2>
        <p>Diplomats are characterized by their intuitive and feeling nature. They're driven by values, relationships, and the desire to help others reach their potential.</p>
        
        <h2>Common Traits</h2>
        <ul>
          <li>Intuitive (N) - Focus on possibilities and patterns</li>
          <li>Feeling (F) - Make decisions based on values and relationships</li>
          <li>Idealistic - Seek to make the world better</li>
          <li>Empathetic - Understand others' emotions and needs</li>
        </ul>
        
        <h2>The Four Diplomat Types</h2>
        <p>Each Diplomat type brings unique strengths to their role as advocates for positive change and meaningful relationships.</p>
        
        <h2>Strengths and Challenges</h2>
        <p>Diplomats excel at understanding people and building relationships, but may struggle with practical details and making tough decisions.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles/roles-diplomats" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/roles-diplomats",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Personality Roles"
  },
  {
    title: "Energy: Introverted (I) vs. Extraverted (E)",
    content: `
      <div class="article-header">
        <h1>Energy: Introverted (I) vs. Extraverted (E)</h1>
        <div class="article-meta">
          <span class="category">Personality Theory</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">744 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>More Than People Power</p>
        <p>When considering people who are Introverts (I) and Extraverts (E), it's natural to go straight to the more social aspects of these personality traits. However, they affect much more than just how we interact with others.</p>
        
        <h2>Understanding Energy</h2>
        <p>The Energy aspect describes how we direct and receive energy. It's about where we focus our attention and how we recharge our batteries.</p>
        
        <h2>Introverted (I)</h2>
        <p>Introverts focus their energy inward, preferring quiet reflection and deep thinking. They recharge by spending time alone and may feel drained by too much social interaction.</p>
        
        <h2>Extraverted (E)</h2>
        <p>Extraverts focus their energy outward, preferring active engagement with the world around them. They recharge through social interaction and may feel restless when alone too long.</p>
        
        <h2>Beyond Social Interaction</h2>
        <p>These traits affect everything from how we process information to how we make decisions, not just our social preferences.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles/energy-introverted-vs-extraverted" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/energy-introverted-vs-extraverted",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Personality Theory"
  },
  {
    title: "Assertive Campaigner (ENFP-A) vs. Turbulent Campaigner (ENFP-T)",
    content: `
      <div class="article-header">
        <h1>Assertive Campaigner (ENFP-A) vs. Turbulent Campaigner (ENFP-T)</h1>
        <div class="article-meta">
          <span class="category">Personality Types</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">77 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Regardless of their Identities, Campaigners are always free spirits with a deep desire to connect with others. That's a given for this personality type. Whether Assertive or Turbulent, these qualities remain constant.</p>
        
        <h2>Understanding Campaigners</h2>
        <p>Campaigners are characterized by their enthusiasm, creativity, and desire to help others. They're natural motivators who inspire those around them to pursue their dreams.</p>
        
        <h2>Assertive Campaigners (ENFP-A)</h2>
        <p>Assertive Campaigners are more confident in their abilities and less affected by stress. They trust their instincts and are more decisive in their actions.</p>
        
        <h2>Turbulent Campaigners (ENFP-T)</h2>
        <p>Turbulent Campaigners are more sensitive to criticism and may experience more self-doubt. However, this sensitivity often makes them more empathetic and understanding.</p>
        
        <h2>Shared Strengths</h2>
        <p>Both types share the core Campaigner traits: enthusiasm, creativity, empathy, and the ability to inspire others to reach their potential.</p>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://www.mbti16personalities.online/articles/assertive-campaigner-enfp-a-vs-turbulent-campaigner-enfp-t" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for detailed analysis.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://www.mbti16personalities.online/articles/assertive-campaigner-enfp-a-vs-turbulent-campaigner-enfp-t",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Personality Types"
  }
];

async function syncRealArticles() {
  try {
    console.log('正在清空现有文章...');
    
    // 清空现有文章
    await prisma.blog.deleteMany({});
    
    console.log('正在添加真实的16personalities文章...');
    
    for (const article of realArticles) {
      await prisma.blog.create({
        data: {
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
    console.log(`🎉 现在数据库中共有 ${totalCount} 篇真实文章！`);
    
  } catch (error) {
    console.error('❌ 同步文章时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncRealArticles();
