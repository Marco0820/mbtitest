import { PrismaClient } from './src/generated/prisma/index.js';

const prisma = new PrismaClient();

const personalityDetails = [
  // Data from mbti_inserts.sql will be converted to this format
  {
    type: 'INTJ',
    locale: 'en',
    details: {
      name: 'Architect',
      introduction: "It can be lonely at the top. As one of the rarest personality types – and one of the most capable – Architects (INTJ) know this all too well. Rational and quick-witted, they pride themselves on their ability to think for themselves, not to mention their uncanny knack for seeing right through phoniness and hypocrisy. But because their minds are never at rest, Architects may struggle to find people who can keep up with their nonstop analysis of everything around them.",
      strengths_weaknesses: {
        title: 'Strengths & Weaknesses',
        introduction: "Architects are independent, self-sufficient, and motivated by their own high standards. They don't need external validation or social approval to feel good about themselves. This gives them a unique sense of freedom and a powerful drive to achieve their goals.",
        strengths: [
          { title: 'Rational', description: "For Architects, rationality is king. They approach every situation with a desire to understand the underlying principles and patterns. This allows them to make sound, logical decisions, unclouded by emotion or bias." },
          { title: 'Informed', description: "Few personality types are as dedicated to learning and accumulating knowledge as Architects. They are voracious readers and tireless researchers, always seeking to expand their understanding of the world. This makes them highly informed and capable individuals." },
          { title: 'Independent', description: "Architects are not ones to follow the crowd. They trust their own judgment and are not afraid to go against the grain. This independence allows them to forge their own path and come up with innovative solutions to complex problems." },
          { title: 'Determined', description: "When Architects set a goal, they are relentless in their pursuit of it. They have a remarkable ability to stay focused and motivated, even in the face of significant obstacles. Their determination is a key factor in their success." },
          { title: 'Curious', description: 'Architects have a deep-seated curiosity about the world. They are always asking "why" and are not satisfied with easy answers. This insatiable curiosity fuels their quest for knowledge and drives them to explore new ideas and possibilities.' },
          { title: 'Versatile', description: "Thanks to their broad knowledge base and their ability to see the big picture, Architects are often able to excel in a wide range of fields. They can quickly grasp complex systems and are adept at applying their knowledge to solve practical problems." }
        ],
        weaknesses: [
          { title: 'Arrogant', description: "Architects' confidence in their own intellectual abilities can sometimes cross the line into arrogance. They may be dismissive of others' opinions, especially if they perceive them to be less rational or informed. This can make them difficult to work with and can alienate them from others." },
          { title: 'Dismissive of Emotions', description: "Architects tend to view emotions as irrational and messy. They may have difficulty understanding and responding to the emotional needs of others, which can make them appear cold or insensitive. This can create challenges in their personal relationships." },
          { title: 'Overly Critical', description: "With their analytical minds, Architects can be overly critical of both themselves and others. They have high standards and can be quick to point out flaws and imperfections. While this can be a strength in some contexts, it can also be a source of stress and conflict." },
          { title: 'Combative', description: "Architects enjoy a good intellectual debate and are not afraid to challenge others' ideas. However, their love of argumentation can sometimes come across as combative or confrontational. They may not realize that their passion for debate can be intimidating to others." },
          { title: 'Socially Clueless', description: "Architects can be so focused on their own thoughts and ideas that they neglect the social niceties that are important for building relationships. They may have difficulty with small talk and may not always pick up on social cues. This can make it hard for them to connect with others on a personal level." }
        ]
      },
      romantic_relationships: {
        title: 'Romantic Relationships',
        introduction: "Architects approach romance the way they do most things: with a strategic and goal-oriented mindset. They are not interested in fleeting attractions or casual flings. Instead, they seek a partner who can meet them on an intellectual level and who shares their commitment to self-improvement. They value directness and honesty in a relationship and have little patience for games or manipulation.",
        conclusion: "Finding a compatible partner can be a challenge for Architects, but when they do, they are loyal and devoted. They are willing to put in the effort to build a strong and lasting relationship, and they are committed to helping their partner grow and develop. For Architects, a successful relationship is a true partnership of equals."
      },
      friendships: {
        title: 'Friendships',
        introduction: "Architects don't have a wide circle of friends, but the friendships they do have are often deep and long-lasting. They are drawn to people who are intelligent, independent, and who share their love of ideas. They are not interested in superficial relationships and prefer to spend their time with people who can engage them in meaningful conversations.",
        conclusion: "For Architects, friendship is a meeting of the minds. They are loyal and supportive friends who are always willing to help their friends think through complex problems. They may not be the most emotionally expressive friends, but they show their care through their actions and their unwavering support."
      },
      parenthood: {
        title: 'Parenthood',
        introduction: "As parents, Architects are focused on raising children who are independent, self-sufficient, and capable of thinking for themselves. They encourage their children to be curious and to ask questions, and they provide them with the resources and support they need to learn and grow. They are not overly authoritarian parents and prefer to treat their children as rational individuals who are capable of making their own decisions.",
        conclusion: "Architects take their role as parents very seriously. They are committed to providing their children with the best possible start in life, and they are willing to put in the time and effort to help their children reach their full potential. They are proud of their children's accomplishments and are always there to offer them guidance and support."
      },
      career_paths: {
        title: 'Career Paths',
        introduction: "Architects are drawn to careers that allow them to use their analytical skills and their love of knowledge to solve complex problems. They are not interested in routine or repetitive work and prefer careers that offer them a great deal of autonomy and intellectual challenge. They are often found in fields such as science, technology, engineering, and mathematics (STEM), but they can also be successful in any field that requires strategic thinking and a deep understanding of complex systems.",
        conclusion: "Whatever career path they choose, Architects are likely to be successful. Their intelligence, determination, and innovative thinking make them valuable assets in any organization. They are not content to simply do their job; they are always looking for ways to improve processes, solve problems, and make a lasting impact."
      }
    }
  },
  // ... all other 15 personality types will be added here in the same format
];

async function main() {
  try {
    // It's safer to delete all existing data to avoid conflicts on re-running
    await prisma.personalityDetails.deleteMany({});
    const result = await prisma.personalityDetails.createMany({
      data: personalityDetails,
      skipDuplicates: true, // This will skip if a record with the same primary key already exists
    });
    console.log(`Successfully inserted ${result.count} records.`);
  } catch (e) {
    console.error('Error populating database:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 