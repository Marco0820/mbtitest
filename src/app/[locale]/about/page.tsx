import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

// Generate metadata for SEO
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('seo_title'),
    description: t('seo_description'),
    keywords: ['MBTI test', '16 personalities', 'free personality test', 'accurate MBTI', 'personality types', 'find friends by personality', 'personality compatibility'],
  };
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-16 text-gray-800 dark:text-gray-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
            About MBTITEST: Your Guide to Self-Discovery and Connection
          </h1>

          <p className="text-lg leading-relaxed mb-6">
            Welcome to MBTITEST, the premier destination for anyone looking to explore their personality and connect with others. In a world of fleeting interactions, we believe that understanding yourself is the first step toward building deeper, more meaningful relationships. Our platform is built on this principle, offering one of the most <strong className="font-semibold">accurate free 16 personalities tests</strong> available online.
          </p>

          <div className="prose lg:prose-xl max-w-none dark:prose-invert">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-12 mb-4">Our Mission: Accuracy Meets Innovation</h2>
            <p>
              The journey of self-discovery is personal and profound. That's why we've dedicated ourselves to creating an <strong className="font-semibold">MBTI test</strong> that is not only free and accessible but also deeply insightful and reliable. Our assessment is meticulously crafted based on the foundational principles of the Myers-Briggs Type Indicator, leveraging modern psychometric analysis to ensure you receive a result that truly resonates. We don't just tell you your type; we provide a comprehensive breakdown of your cognitive functions, helping you understand the "why" behind your "who."
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-12 mb-4">More Than a Test: A Community for Connection</h2>
            <p>
              What truly sets MBTITEST apart is our vibrant and growing community. We believe your personality type is a key, unlocking new ways to connect with people. Our unique <strong className="font-semibold">social features</strong> allow you to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li><strong className="font-semibold">Find Friends by Personality:</strong> Search and filter for people who share your personality type, or explore types you're curious about, both locally and globally.</li>
              <li><strong className="font-semibold">Explore Compatibility:</strong> Discover how your personality type interacts with others in friendships, romance, and the workplace. Our insights can help you navigate your social world with greater confidence.</li>
              <li><strong className="font-semibold">Share and Compare:</strong> Connect with friends, share your detailed results, and discover fascinating new perspectives on your relationships.</li>
            </ul>
            <p>
              Whether you're looking for an <strong className="font-semibold">INTJ</strong> collaborator for your next big project or an <strong className="font-semibold">ENFP</strong> friend to explore the city with, our platform is designed to make that connection happen.
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-12 mb-4">Join Us on the Journey</h2>
            <p>
              Your personality is your unique blueprint. Understanding it is a lifelong adventure, and we're here to be your guide. Take our <strong className="font-semibold">free 16 personalities test</strong> today to receive your detailed profile and unlock a world of self-awareness and social discovery.
            </p>
          </div>

          <div className="text-center mt-12">
            <a href="/test" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all text-lg">
              Take the Free Test Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 