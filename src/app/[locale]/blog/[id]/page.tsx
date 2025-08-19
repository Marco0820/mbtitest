
export const dynamic = 'error';
export const dynamicParams = false;

import { routing } from '@/routing';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { getMessages } from 'next-intl/server';
import { createTranslator } from 'next-intl';
import type { Metadata } from 'next';

interface Blog {
  id: string;
  trendingKeyword: string;
  title: string;
  content: string;
  sourceUrl: string;
  imageUrl: string | null;
}

const blogDatabase: { [key: string]: Omit<Blog, 'id'> } = {
  'intj-careers': {
    trendingKeyword: 'INTJ Careers',
    title: 'INTJ Careers: 7 Perfect Paths for the Strategic Architect',
    content: `
      <h4>Unlocking the Potential of the INTJ Mind</h4>
      <p>INTJ, known as "The Architect" or "The Mastermind," is one of the rarest and most strategically capable personality types. Driven by logic, a thirst for knowledge, and a desire to improve complex systems, INTJs thrive in environments that challenge their intellect and allow them to work autonomously. But which careers truly harness their unique strengths?</p>
      <p>If you're an INTJ, you're likely not looking for just a job; you're looking for a mission. You want to solve complex problems and build a legacy. Here are 7 career paths that are perfectly suited for the INTJ personality type.</p>
      <h5>1. Software Developer / Architect</h5>
      <p>It's no surprise that technology is a natural home for INTJs. The world of software development is a giant puzzle box. It requires logic, systems thinking, and the ability to build intricate structures from the ground up—all activities that energize the INTJ.</p>
      <h5>2. Management Consultant</h5>
      <p>Consulting firms are hired to solve a company's most challenging problems. INTJs excel at dissecting a complex business issue, identifying inefficiencies, and designing a new, improved strategy. The project-based nature of the work also provides the variety and intellectual stimulation they crave.</p>
      <h5>3. Scientist / Researcher</h5>
      <p>The relentless pursuit of knowledge is at the core of the INTJ personality. A career in scientific research allows them to dive deep into a chosen field, from physics to biology, formulating theories and running experiments to uncover objective truths.</p>
      <h5>4. Lawyer / Judge</h5>
      <p>The legal field is a complex system of rules and logic. INTJs are adept at navigating this system, building logical arguments, and applying principles impartially. Roles like corporate law, intellectual property, or even becoming a judge align well with their objective and strategic nature.</p>
      <h5>5. Engineer (Civil, Mechanical, Aerospace)</h5>
      <p>Like software, physical engineering is about designing and building efficient systems. Whether it's a bridge, a new engine, or a spacecraft, INTJs can use their foresight and planning skills to manage complex projects from concept to completion.</p>
      <h5>6. University Professor</h5>
      <p>For the INTJ who loves their subject matter, academia can be a perfect fit. It provides a platform to become a master in their field, conduct research, and mentor the next generation of thinkers—all on their own terms.</p>
      <h5>7. Financial Strategist / Analyst</h5>
      <p>The stock market and financial world are complex, data-driven systems. INTJs can use their analytical skills to spot trends, build investment models, and make calculated decisions, removing emotion from the equation.</p>
    `,
    sourceUrl: 'https://mbti16personalities.online/blog/intj-careers',
    imageUrl: 'https://images.unsplash.com/photo-1505526543118-2469491CFde1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  },
  'infp-infj-compatibility': {
    trendingKeyword: 'INFP INFJ Compatibility',
    title: 'INFP and INFJ Compatibility: A Deep and Complex Connection',
    content: `
      <h4>A Meeting of Idealistic Minds</h4>
      <p>When an INFP (The Mediator) and an INFJ (The Advocate) cross paths, it can feel like a meeting of kindred spirits. Both are introverted, intuitive, feeling types who share a deep inner world and a powerful desire to live a life aligned with their values. This shared foundation can lead to a relationship of incredible depth and understanding.</p>
      <p>But what makes this pairing work so well, and what are the potential challenges to watch out for? Let's dive into the dynamics of INFP and INFJ compatibility.</p>
      <h5>What They Share: A Common Ground</h5>
      <ul>
        <li><strong>Shared Values:</strong> Both types are idealists who care deeply about authenticity, personal growth, and making the world a better place. They can spend hours discussing their dreams, philosophies, and the meaning of life.</li>
        <li><strong>Intuitive Communication:</strong> As "N" types, they communicate in a similar abstract and metaphorical way. They can often understand each other's complex thoughts and feelings without needing to spell everything out.</li>
        <li><strong>Emotional Depth:</strong> Both are "F" types, prioritizing harmony and emotional connection. They are sensitive to each other's needs and can provide a safe space for vulnerability.</li>
      </ul>
      <h5>The Key Difference: P vs. J</h5>
      <p>The biggest difference lies in their last letter: Perceiving (P) vs. Judging (J). This is the source of both synergy and potential friction.</p>
      <ul>
        <li><strong>INFP (Perceiving):</strong> Flexible, spontaneous, and resistant to being boxed in. They like to keep their options open and can be indecisive, preferring to go with the flow.</li>
        <li><strong>INFJ (Judging):</strong> Organized, decisive, and likes to have a plan. They feel more secure when decisions are made and they have a clear path forward.</li>
      </ul>
      <h5>Tips for a Thriving INFP-INFJ Relationship</h5>
      <ol>
        <li><strong>Appreciate the Differences:</strong> Recognize that the J/P difference is a source of balance.</li>
        <li><strong>Communicate About Needs:</strong> The INFJ needs to express their desire for a plan without making demands. The INFP needs to communicate their need for freedom.</li>
        <li><strong>Give Each Other Space:</strong> Both are introverts and need significant alone time to recharge.</li>
        <li><strong>Work Together on Goals:</strong> Combine the INFJ's planning skills with the INFP's creative brainstorming.</li>
      </ol>
      <h5>Conclusion: A Rare and Rewarding Bond</h5>
      <p>The INFP and INFJ pairing is one of the most profound and intellectually stimulating in the MBTI world. While navigating the P vs. J difference requires patience and communication, the shared values and deep emotional connection make it a bond well worth nurturing.</p>
    `,
    sourceUrl: 'https://mbti16personalities.online/blog/infp-infj-compatibility',
    imageUrl: 'https://images.unsplash.com/photo-1505526543118-2469491CFde1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  },
};

export function generateStaticParams() {
  const params: { id: string; locale: string }[] = [];
  const blogIds = Object.keys(blogDatabase);
  
  routing.locales.forEach((locale) => {
    blogIds.forEach((id) => {
      params.push({ locale, id });
    });
  });

  return params;
}

export async function generateMetadata({ params }: { params: { id: string; locale: string } }): Promise<Metadata> {
  const { id, locale } = params;
  const messages = await getMessages({ locale });
  const t = createTranslator({ locale, messages });
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti16personalities.online';
  const canonicalUrl = `${siteUrl}/${locale}/blog/${id}`;
  
  const blogData = blogDatabase[id];
  const title = blogData ? blogData.title : t('Layout.title');
  const description = blogData ? 
    `${blogData.title} - ${t('Layout.description')}` : 
    t('Layout.description');

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'MBTI TEST - 16型人格专业测评',
      images: blogData?.imageUrl ? [
        {
          url: blogData.imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : [
        {
          url: `${siteUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'MBTI性格测试 - 16型人格测评',
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: blogData?.imageUrl ? [blogData.imageUrl] : [`${siteUrl}/logo.png`],
    },
  };
}

// This is now a Server Component
export default function BlogPostPage({ params }: { params: { id: string } }) {
  const id = params?.id;
  const blogData = blogDatabase[id];

  if (!blogData) {
    return <BlogPostClient blog={null} />;
  }

  const blogWithId: Blog = { ...blogData, id };

  return <BlogPostClient blog={blogWithId} />;
} 