'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { calculateMbtiResult } from '@/lib/mbtiCalculator';
import { UserResponse } from '@/types/mbti';

type Question = {
  id: string;
};

type Props = {
  questions: Question[];
};

export function Questionnaire({ questions }: Props) {
  const t_test = useTranslations('test');
  const router = useRouter();
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<
    Record<string, { answer: number; timestamp: Date }>
  >({});
  const [gender, setGender] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const questionsPerPage = 6;
  
  const topRef = useRef<HTMLDivElement>(null);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const currentQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    return questions.slice(startIndex, startIndex + questionsPerPage);
  }, [currentPage, questions]);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { answer: value, timestamp: new Date() },
    }));

    // Auto-scroll to next unanswered question
    const currentIndex = currentQuestions.findIndex((q) => q.id === questionId);
    if (currentIndex < currentQuestions.length - 1) {
      const nextQuestion = currentQuestions[currentIndex + 1];
      if (answers[nextQuestion.id] === undefined) {
        questionRefs.current[nextQuestion.id]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setIsCalculating(true);
      
      const userResponses: UserResponse[] = Object.entries(answers).map(
        ([key, value]) => ({
          questionId: parseInt(key.slice(1)), // "q1" -> 1
          answer: value.answer,
          timestamp: value.timestamp,
        }),
      );

      const result = calculateMbtiResult(userResponses);

      // Store result in sessionStorage to pass it to the result page
      sessionStorage.setItem('mbtiResult', JSON.stringify(result));

      router.push(`/${locale}/results/${result.type}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const areAllQuestionsOnPageAnswered = useMemo(() => {
    return currentQuestions.every((q) => answers[q.id] !== undefined);
  }, [currentQuestions, answers]);

  const progress = useMemo(() => {
    const answeredCount = Object.keys(answers).length;
    return (answeredCount / questions.length) * 100;
  }, [answers, questions]);

  const optionStyles = [
    { size: 'w-12 h-12', bg: 'bg-gradient-to-br from-green-400 to-green-600', value: 3 },
    { size: 'w-10 h-10', bg: 'bg-gradient-to-br from-green-300 to-green-500', value: 2 },
    { size: 'w-8 h-8', bg: 'bg-gradient-to-br from-green-200 to-green-400', value: 1 },
    { size: 'w-8 h-8', bg: 'bg-gradient-to-br from-gray-300 to-gray-400', value: 0 },
    { size: 'w-8 h-8', bg: 'bg-gradient-to-br from-red-200 to-red-400', value: -1 },
    { size: 'w-10 h-10', bg: 'bg-gradient-to-br from-red-300 to-red-500', value: -2 },
    { size: 'w-12 h-12', bg: 'bg-gradient-to-br from-red-400 to-red-600', value: -3 },
  ];

  const isLastPage = currentPage === totalPages;
  const canFinish = areAllQuestionsOnPageAnswered && gender !== '';

  return (
    <>
      <div className="w-full max-w-4xl mx-auto py-12" ref={topRef}>
        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
          {t_test('title')}
        </h1>
        <p className="text-center text-gray-500 mb-12">{t_test('subtitle')}</p>

        <div className="space-y-16">
          {currentQuestions.map((question, index) => (
            <div 
              key={question.id}
              ref={el => { questionRefs.current[question.id] = el; }}
              className="text-center scroll-mt-24"
            >
              <p className="text-2xl font-semibold text-gray-800 mb-8 leading-relaxed">
                {(currentPage - 1) * questionsPerPage + index + 1}. {t_test(question.id as any)}
              </p>
              <div className="flex justify-center items-center space-x-4 md:space-x-6">
                <span className="text-lg font-bold text-green-600">{t_test('agree')}</span>
                {optionStyles.map((style, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(question.id, style.value)}
                    className={`${style.size} ${style.bg} rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                      answers[question.id]?.answer === style.value
                        ? 'ring-4 ring-purple-500 ring-offset-2'
                        : 'ring-transparent'
                    }`}
                    aria-label={`Option ${style.value}`}
                  />
                ))}
                <span className="text-lg font-bold text-red-600">{t_test('disagree')}</span>
              </div>
            </div>
          ))}
        </div>

        {isLastPage && (
          <div className="mt-16 text-center">
            <label htmlFor="gender" className="block text-lg font-medium text-gray-700 mb-2">
              {t_test('gender_select')}
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full max-w-xs mx-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>{t_test('gender_select')}</option>
              <option value="male">{t_test('male')}</option>
              <option value="female">{t_test('female')}</option>
              <option value="other">{t_test('other')}</option>
            </select>
          </div>
        )}

        <div className="mt-8 text-center text-gray-500 text-lg">
          {t_test('page_indicator', { currentPage, totalPages })}
        </div>

        <div className="flex justify-center items-center mt-8 space-x-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-700 font-bold py-3 px-10 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t_test('back')}
          </button>
          <button
            onClick={handleNextPage}
            disabled={
              isCalculating ||
              (isLastPage ? !canFinish : !areAllQuestionsOnPageAnswered)
            }
            className="bg-purple-600 text-white font-bold py-4 px-12 rounded-full hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-xl"
          >
            {isLastPage
              ? isCalculating
                ? t_test('calculating')
                : t_test('finish_test')
              : t_test('next')}
          </button>
        </div>
      </div>
      
      <aside className="fixed top-1/2 -translate-y-1/2 right-8 hidden lg:flex flex-col items-center space-y-4">
        <h4 className="font-semibold text-lg text-gray-800">{t_test('progress_title')}</h4>
        <div className="relative w-2 h-64 bg-gray-200 rounded-full">
          <div
            className="absolute bottom-0 left-0 w-full bg-purple-600 rounded-full transition-all duration-500 ease-in-out"
            style={{ height: `${progress}%` }}
          ></div>
        </div>
        <div className="text-sm font-medium text-purple-700">
          {t_test('progress', { progress: Math.round(progress) })}
        </div>
      </aside>
    </>
  );
} 