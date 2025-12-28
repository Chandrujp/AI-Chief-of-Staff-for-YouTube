
export enum BurnoutLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface VideoData {
  id: string;
  title: string;
  publishDate: string;
  duration: number; // in seconds
  views: number;
  likes: number;
  comments: number;
  watchTime: number; // in hours
  subscribersGained: number;
  estimatedEffort: number; // in hours
  format: 'Shorts' | 'Talking Head' | 'Deep Dive' | 'Cinematic';
}

export interface AnalysisResult {
  burnoutRisk: BurnoutLevel;
  keyInsights: string[];
  roiFindings: {
    label: string;
    value: string;
    isPositive: boolean;
  }[];
  recommendations: string[];
  sustainablePlan: string;
  energySaved: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  analysis?: AnalysisResult;
}
