import { UserResponse } from '@/types/mbti';

// Weights determine the direction of scoring. 
// 1.0 for direct questions (e.g., agree -> a trait)
// -1.0 for reverse-scored questions (e.g., agree -> opposite trait)
// These weights are based on a standard interpretation of MBTI questions.

const weights_E_I = [1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, 1]; // E vs I
const weights_S_N = [-1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1]; // S vs N
const weights_T_F = [1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, -1]; // T vs F
const weights_J_P = [1, -1, 1, -1, 1, -1, 1, -1, -1, 1, 1, -1]; // J vs P
const weights_A_T = [-1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, -1]; // A vs T

export const DimensionWeights = {
  E_I: { questions: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45], weights: weights_E_I },
  S_N: { questions: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46], weights: weights_S_N },
  T_F: { questions: [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47], weights: weights_T_F },
  J_P: { questions: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48], weights: weights_J_P },
  A_T: {
    questions: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    weights: weights_A_T,
  },
};

export function calculateDimensionScore(
  responses: UserResponse[],
  dimension: keyof typeof DimensionWeights,
) {
  const config = DimensionWeights[dimension];
  let totalScore = 0;
  let totalWeight = 0;

  config.questions.forEach((questionId, index) => {
    const response = responses.find((r) => r.questionId === questionId);
    if (response) {
      // The weights array might not be as long as the questions array
      const weight = config.weights[index] ?? 1.0;

      const adjustedScore = response.answer * weight;

      totalScore += adjustedScore;
      totalWeight += weight;
    }
  });

  if (totalWeight === 0) return 50;

  const normalizedScore = ((totalScore / totalWeight + 3) / 6) * 100;
  return Math.max(0, Math.min(100, normalizedScore));
}

export function determinePersonalityType(dimensionScores: {
  extraversion: number;
  intuition: number;
  feeling: number;
  judging: number;
  assertive: number;
}) {
  const type = [
    dimensionScores.extraversion >= 50 ? 'E' : 'I',
    dimensionScores.intuition >= 50 ? 'N' : 'S',
    dimensionScores.feeling >= 50 ? 'F' : 'T',
    dimensionScores.judging >= 50 ? 'J' : 'P',
  ].join('');

  const subtype = dimensionScores.assertive >= 50 ? 'A' : 'T';

  return `${type}-${subtype}`;
}

export function calculateConfidence(dimensionScores: {
  extraversion: number;
  intuition: number;
  feeling: number;
  judging: number;
  assertive: number;
}) {
  const distances = Object.values(dimensionScores).map(
    (score) => Math.abs(score - 50) / 50,
  );

  const avgDistance =
    distances.reduce((a, b) => a + b, 0) / distances.length;
  return Math.min(1.0, avgDistance * 1.2); // Multiply by 1.2 to enhance differentiation
}

export function checkConsistency(responses: UserResponse[]) {
  // Example pairs of semantically similar questions
  const similarQuestionPairs = [
    [1, 25],
    [3, 27],
    [7, 31],
    // ... add more pairs for a real test
  ];

  let consistencyScore = 0;
  let validPairs = 0;

  similarQuestionPairs.forEach(([q1, q2]) => {
    const resp1 = responses.find((r) => r.questionId === q1);
    const resp2 = responses.find((r) => r.questionId === q2);

    if (resp1 && resp2) {
      // Assuming questions are phrased so direct answers should be similar
      const similarity = 1 - Math.abs(resp1.answer - resp2.answer) / 6;
      consistencyScore += similarity;
      validPairs++;
    }
  });

  return validPairs > 0 ? consistencyScore / validPairs : 0;
}

export function detectAnomalies(responses: UserResponse[]) {
  const issues: string[] = [];
  const totalResponses = responses.length;
  if (totalResponses === 0) return [];

  // Check for extreme response patterns
  const extremeAnswers = responses.filter(
    (r) => Math.abs(r.answer) === 3,
  ).length;
  if (extremeAnswers / totalResponses > 0.8) {
    issues.push('extreme_response_pattern');
  }

  // Check for excessive neutral responses
  const neutralAnswers = responses.filter((r) => r.answer === 0).length;
  if (neutralAnswers / totalResponses > 0.6) {
    issues.push('excessive_neutral_responses');
  }

  // Check for abnormal response times (requires timestamp data)
  const responseTimes = responses.map(r => r.timestamp.getTime());
  const timeDiffs = [];
  for(let i = 1; i < responseTimes.length; i++) {
    timeDiffs.push(responseTimes[i] - responseTimes[i-1]);
  }
  
  if (timeDiffs.length > 0) {
    const avgTime = timeDiffs.reduce((sum, time) => sum + time, 0) / timeDiffs.length;
    if (avgTime < 2000) { // Less than 2 seconds per question
      issues.push('too_fast_completion');
    }
  }

  return issues;
}

export function calculateMbtiResult(responses: UserResponse[]) {
  const dimensionScores = {
    extraversion: calculateDimensionScore(responses, 'E_I'),
    intuition: calculateDimensionScore(responses, 'S_N'),
    feeling: calculateDimensionScore(responses, 'T_F'),
    judging: calculateDimensionScore(responses, 'J_P'),
    assertive: calculateDimensionScore(responses, 'A_T'),
  };

  const type = determinePersonalityType(dimensionScores);
  const confidence = calculateConfidence(dimensionScores);
  const consistency = checkConsistency(responses);
  const anomalies = detectAnomalies(responses);

  return {
    type,
    scores: dimensionScores,
    confidence,
    consistency,
    anomalies,
  };
} 