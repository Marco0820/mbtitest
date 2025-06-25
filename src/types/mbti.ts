export interface UserResponse {
  questionId: number;      // 问题ID
  answer: number;          // 答案值 (-3 到 +3)
  timestamp: Date;         // 答题时间
}

export interface PersonalityResult {
  type: string;           // 最终类型代码 (如: "ENFJ-T")
  scores: {
    extraversion: number; // 0-100 百分比
    intuition: number;    // 0-100 百分比
    feeling: number;      // 0-100 百分比
    judging: number;      // 0-100 百分比
    assertive: number;    // 0-100 百分比
  };
  confidence: number;     // 结果置信度 0-1
  consistency: number;    // 答题一致性 0-1
  anomalies: string[];
} 