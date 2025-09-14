import 'dotenv/config';
import { prisma } from '../src/lib/db';

// 基于mbti16personalities.online的personal-growth分类，创建更多文章
const personalGrowthArticles = [
  {
    title: "How to Develop Emotional Intelligence",
    content: `
      <div class="article-header">
        <h1>How to Develop Emotional Intelligence</h1>
        <div class="article-meta">
          <span class="category">Personal Growth</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">1,234 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Emotional intelligence (EQ) is often more important than IQ in determining success in life. It's the ability to understand, use, and manage your emotions in positive ways to relieve stress, communicate effectively, empathize with others, overcome challenges, and defuse conflict.</p>
        
        <h2>Understanding Emotional Intelligence</h2>
        <p>Emotional intelligence consists of four key components:</p>
        <ul>
          <li><strong>Self-awareness:</strong> Recognizing your own emotions and their impact</li>
          <li><strong>Self-management:</strong> Controlling impulsive feelings and behaviors</li>
          <li><strong>Social awareness:</strong> Understanding the emotions, needs, and concerns of others</li>
          <li><strong>Relationship management:</strong> Developing and maintaining good relationships</li>
        </ul>
        
        <h2>Practical Strategies for Development</h2>
        <p>Here are evidence-based strategies to enhance your emotional intelligence:</p>
        
        <h3>1. Practice Mindfulness</h3>
        <p>Mindfulness meditation helps you become more aware of your emotions as they arise. Start with just 10 minutes daily, focusing on your breath and observing your thoughts without judgment.</p>
        
        <h3>2. Keep an Emotion Journal</h3>
        <p>Record your emotional responses to different situations. Note what triggered the emotion, how you felt, and how you responded. This builds self-awareness over time.</p>
        
        <h3>3. Develop Active Listening Skills</h3>
        <p>Truly listen to others without planning your response. Focus on understanding their perspective and emotions, not just their words.</p>
        
        <h3>4. Practice Empathy</h3>
        <p>Try to see situations from others' perspectives. Ask yourself: "How would I feel in their position?" This builds social awareness and strengthens relationships.</p>
        
        <h2>Personality Type Considerations</h2>
        <p>Different personality types may find certain aspects of emotional intelligence more challenging:</p>
        <ul>
          <li><strong>Thinkers (T):</strong> May need to focus more on recognizing and expressing emotions</li>
          <li><strong>Feelers (F):</strong> Often excel at empathy but may need help with emotional boundaries</li>
          <li><strong>Introverts (I):</strong> May be naturally self-aware but need practice with social skills</li>
          <li><strong>Extraverts (E):</strong> May be socially aware but need to develop deeper self-reflection</li>
        </ul>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://mbti16personalities.online/" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for more personal growth resources.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://mbti16personalities.online/",
    category: "Personal Growth"
  },
  {
    title: "Building Resilience: Bouncing Back from Life's Challenges",
    content: `
      <div class="article-header">
        <h1>Building Resilience: Bouncing Back from Life's Challenges</h1>
        <div class="article-meta">
          <span class="category">Personal Growth</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">892 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Resilience is the psychological quality that allows some people to be knocked down by life and come back stronger than ever. Rather than letting failure overcome them and drain their resolve, they find a way to rise from the ashes.</p>
        
        <h2>What is Resilience?</h2>
        <p>Resilience is not a trait that people either have or don't have. It involves behaviors, thoughts, and actions that can be learned and developed by anyone. It's about adapting well in the face of adversity, trauma, tragedy, threats, or significant sources of stress.</p>
        
        <h2>The Science of Resilience</h2>
        <p>Research shows that resilience is ordinary, not extraordinary. People commonly demonstrate resilience. One example is the response of many Americans to the September 11, 2001 terrorist attacks and individuals' efforts to rebuild their lives.</p>
        
        <h2>Building Your Resilience</h2>
        
        <h3>1. Make Connections</h3>
        <p>Good relationships with close family members, friends, or others are important. Accepting help and support from those who care about you and will listen to you strengthens resilience.</p>
        
        <h3>2. Avoid Seeing Crises as Insurmountable Problems</h3>
        <p>You can't change the fact that highly stressful events happen, but you can change how you interpret and respond to these events. Try looking beyond the present to how future circumstances may be a little better.</p>
        
        <h3>3. Accept That Change Is a Part of Living</h3>
        <p>Certain goals may no longer be attainable as a result of adverse situations. Accepting circumstances that cannot be changed can help you focus on circumstances that you can alter.</p>
        
        <h3>4. Move Toward Your Goals</h3>
        <p>Develop some realistic goals. Do something regularly — even if it seems like a small accomplishment — that enables you to move toward your goals. Instead of focusing on tasks that seem unachievable, ask yourself, "What's one thing I know I can accomplish today that helps me move in the direction I want to go?"</p>
        
        <h2>Personality-Based Resilience Strategies</h2>
        <p>Different personality types can leverage their natural strengths to build resilience:</p>
        <ul>
          <li><strong>Analysts:</strong> Use logical problem-solving and strategic thinking</li>
          <li><strong>Diplomats:</strong> Draw on their values and relationships for strength</li>
          <li><strong>Sentinels:</strong> Rely on their planning and organizational skills</li>
          <li><strong>Explorers:</strong> Use their adaptability and practical problem-solving</li>
        </ul>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://mbti16personalities.online/" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for more resilience-building resources.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://mbti16personalities.online/",
    category: "Personal Growth"
  },
  {
    title: "The Art of Self-Reflection: Understanding Your Inner World",
    content: `
      <div class="article-header">
        <h1>The Art of Self-Reflection: Understanding Your Inner World</h1>
        <div class="article-meta">
          <span class="category">Personal Growth</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">756 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Self-reflection is the ability to examine and understand your own thoughts, feelings, and behaviors. It's a crucial skill for personal growth, emotional intelligence, and making better decisions in life.</p>
        
        <h2>Why Self-Reflection Matters</h2>
        <p>Regular self-reflection helps you:</p>
        <ul>
          <li>Understand your motivations and behaviors</li>
          <li>Learn from your experiences</li>
          <li>Make better decisions</li>
          <li>Improve your relationships</li>
          <li>Develop greater self-awareness</li>
        </ul>
        
        <h2>Methods of Self-Reflection</h2>
        
        <h3>1. Journaling</h3>
        <p>Writing down your thoughts and experiences is one of the most effective ways to reflect. Try these prompts:</p>
        <ul>
          <li>What went well today?</li>
          <li>What could I have done differently?</li>
          <li>What am I grateful for?</li>
          <li>What patterns do I notice in my behavior?</li>
        </ul>
        
        <h3>2. Meditation and Mindfulness</h3>
        <p>Mindfulness practices help you observe your thoughts and feelings without judgment. This creates space for reflection and self-understanding.</p>
        
        <h3>3. Seeking Feedback</h3>
        <p>Ask trusted friends, family, or colleagues for honest feedback about your behavior and impact on others. This provides external perspective on your patterns.</p>
        
        <h3>4. Regular Check-ins</h3>
        <p>Set aside time weekly or monthly to reflect on your goals, relationships, and personal development. Ask yourself:</p>
        <ul>
          <li>Am I living according to my values?</li>
          <li>Are my actions aligned with my goals?</li>
          <li>How are my relationships?</li>
          <li>What do I need to change?</li>
        </ul>
        
        <h2>Personality Type Considerations</h2>
        <p>Different personality types may prefer different reflection methods:</p>
        <ul>
          <li><strong>Introverts:</strong> Naturally inclined toward internal reflection</li>
          <li><strong>Extraverts:</strong> May benefit from discussing thoughts with others</li>
          <li><strong>Thinkers:</strong> Prefer analytical approaches to reflection</li>
          <li><strong>Feelers:</strong> Focus on emotional and relational aspects</li>
        </ul>
        
        <h2>Common Reflection Pitfalls</h2>
        <p>Avoid these common mistakes in self-reflection:</p>
        <ul>
          <li><strong>Rumination:</strong> Getting stuck in negative thought loops</li>
          <li><strong>Self-criticism:</strong> Being overly harsh on yourself</li>
          <li><strong>Surface-level thinking:</strong> Not digging deep enough</li>
          <li><strong>Inaction:</strong> Reflecting without making changes</li>
        </ul>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://mbti16personalities.online/" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for more self-reflection resources.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://mbti16personalities.online/",
    category: "Personal Growth"
  },
  {
    title: "Overcoming Perfectionism: Embracing Progress Over Perfection",
    content: `
      <div class="article-header">
        <h1>Overcoming Perfectionism: Embracing Progress Over Perfection</h1>
        <div class="article-meta">
          <span class="category">Personal Growth</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">1,156 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Perfectionism can be both a strength and a weakness. While it drives us to achieve high standards, it can also lead to procrastination, anxiety, and burnout. Learning to embrace progress over perfection is essential for sustainable growth and well-being.</p>
        
        <h2>Understanding Perfectionism</h2>
        <p>Perfectionism is the tendency to set extremely high standards for yourself and others, often accompanied by harsh self-criticism when these standards aren't met. It's different from healthy striving for excellence.</p>
        
        <h2>Signs of Unhealthy Perfectionism</h2>
        <ul>
          <li>Setting unrealistic standards</li>
          <li>Fear of making mistakes</li>
          <li>Procrastination due to fear of imperfection</li>
          <li>All-or-nothing thinking</li>
          <li>Difficulty delegating tasks</li>
          <li>Chronic stress and anxiety</li>
        </ul>
        
        <h2>Strategies for Overcoming Perfectionism</h2>
        
        <h3>1. Set Realistic Standards</h3>
        <p>Instead of aiming for perfection, set "good enough" standards. Ask yourself: "What would be a reasonable expectation for this task?"</p>
        
        <h3>2. Embrace the Learning Process</h3>
        <p>View mistakes as opportunities to learn rather than failures. Each mistake provides valuable information for improvement.</p>
        
        <h3>3. Practice Self-Compassion</h3>
        <p>Treat yourself with the same kindness you would show a friend. Acknowledge your efforts and progress, not just the outcomes.</p>
        
        <h3>4. Break Tasks into Smaller Steps</h3>
        <p>Large projects can feel overwhelming. Break them into manageable pieces and celebrate small wins along the way.</p>
        
        <h3>5. Challenge All-or-Nothing Thinking</h3>
        <p>Recognize that most things exist on a spectrum. Instead of "perfect" or "terrible," consider the many possibilities in between.</p>
        
        <h2>Personality Type Insights</h2>
        <p>Certain personality types may be more prone to perfectionism:</p>
        <ul>
          <li><strong>Analysts (NT):</strong> May struggle with perfectionism in intellectual pursuits</li>
          <li><strong>Diplomats (NF):</strong> May be perfectionistic about relationships and values</li>
          <li><strong>Sentinels (SJ):</strong> May have high standards for organization and responsibility</li>
          <li><strong>Judging types (J):</strong> May struggle with flexibility and "good enough" standards</li>
        </ul>
        
        <h2>The Benefits of Embracing Progress</h2>
        <p>When you focus on progress rather than perfection, you:</p>
        <ul>
          <li>Reduce stress and anxiety</li>
          <li>Increase productivity</li>
          <li>Improve relationships</li>
          <li>Enhance creativity</li>
          <li>Build resilience</li>
        </ul>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://mbti16personalities.online/" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for more personal growth resources.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://mbti16personalities.online/",
    category: "Personal Growth"
  },
  {
    title: "Building Healthy Boundaries: Protecting Your Energy and Well-being",
    content: `
      <div class="article-header">
        <h1>Building Healthy Boundaries: Protecting Your Energy and Well-being</h1>
        <div class="article-meta">
          <span class="category">Personal Growth</span>
          <span class="source">Source: mbti16personalities.online</span>
          <span class="comments">943 comments</span>
        </div>
      </div>
      
      <div class="article-content">
        <p>Healthy boundaries are essential for maintaining your mental health, energy, and relationships. They define what behavior is acceptable and unacceptable from others, and help you protect your time, energy, and emotional well-being.</p>
        
        <h2>What Are Healthy Boundaries?</h2>
        <p>Boundaries are the limits and rules we set for ourselves in relationships. They can be physical, emotional, intellectual, or spiritual. Healthy boundaries help you:</p>
        <ul>
          <li>Protect your energy and time</li>
          <li>Maintain your identity and values</li>
          <li>Prevent burnout and resentment</li>
          <li>Build healthier relationships</li>
        </ul>
        
        <h2>Types of Boundaries</h2>
        
        <h3>1. Physical Boundaries</h3>
        <p>These involve your personal space and physical needs. Examples include:</p>
        <ul>
          <li>Personal space preferences</li>
          <li>Physical touch comfort levels</li>
          <li>Privacy needs</li>
        </ul>
        
        <h3>2. Emotional Boundaries</h3>
        <p>These protect your emotional well-being:</p>
        <ul>
          <li>Not taking responsibility for others' emotions</li>
          <li>Protecting yourself from emotional manipulation</li>
          <li>Maintaining emotional distance when needed</li>
        </ul>
        
        <h3>3. Time Boundaries</h3>
        <p>These protect your time and energy:</p>
        <ul>
          <li>Work-life balance</li>
          <li>Availability for others</li>
          <li>Personal time and rest</li>
        </ul>
        
        <h2>How to Set Healthy Boundaries</h2>
        
        <h3>1. Identify Your Limits</h3>
        <p>Pay attention to your feelings and physical sensations. Discomfort often indicates a boundary has been crossed.</p>
        
        <h3>2. Communicate Clearly</h3>
        <p>Be direct and specific about your boundaries. Use "I" statements to express your needs without blaming others.</p>
        
        <h3>3. Be Consistent</h3>
        <p>Consistently enforce your boundaries. Inconsistency sends mixed messages and undermines your efforts.</p>
        
        <h3>4. Start Small</h3>
        <p>Begin with low-stakes situations to practice setting boundaries before tackling more challenging relationships.</p>
        
        <h2>Personality Type Considerations</h2>
        <p>Different personality types may struggle with different aspects of boundary-setting:</p>
        <ul>
          <li><strong>Feelers (F):</strong> May struggle with saying no to avoid disappointing others</li>
          <li><strong>Extraverts (E):</strong> May have difficulty setting time boundaries</li>
          <li><strong>Introverts (I):</strong> May need stronger physical and time boundaries</li>
          <li><strong>Thinkers (T):</strong> May be better at setting logical boundaries but struggle with emotional ones</li>
        </ul>
        
        <h2>Common Boundary Challenges</h2>
        <p>Setting boundaries can be difficult because:</p>
        <ul>
          <li>Fear of conflict or rejection</li>
          <li>Guilt about disappointing others</li>
          <li>Lack of role models for healthy boundaries</li>
          <li>Cultural or family expectations</li>
        </ul>
        
        <div class="article-footer">
          <p><strong>Want to learn more?</strong> Visit <a href="https://mbti16personalities.online/" target="_blank" rel="noopener noreferrer">mbti16personalities.online</a> for more boundary-setting resources.</p>
        </div>
      </div>
    `,
    sourceUrl: "https://mbti16personalities.online/",
    category: "Personal Growth"
  }
];

async function addPersonalGrowthArticles() {
  try {
    console.log('正在添加个人成长类文章...');
    
    for (const article of personalGrowthArticles) {
      // 创建唯一的sourceUrl
      const uniqueUrl = `https://mbti16personalities.online/personal-growth/${article.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      
      await prisma.blog.create({
        data: {
          title: article.title,
          content: article.content,
          sourceUrl: uniqueUrl,
          imageUrl: null,
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

addPersonalGrowthArticles();
