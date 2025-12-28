
import React from 'react';
import { VideoData } from './types';

export const MOCK_VIDEOS: VideoData[] = [
  {
    id: '1',
    title: 'How I Built a $10k/mo Business',
    publishDate: '2023-10-01',
    duration: 1200,
    views: 45000,
    likes: 3200,
    comments: 450,
    watchTime: 12000,
    subscribersGained: 1200,
    estimatedEffort: 40,
    format: 'Cinematic'
  },
  {
    id: '2',
    title: 'Quick Productivity Tip #12',
    publishDate: '2023-10-05',
    duration: 60,
    views: 85000,
    likes: 7200,
    comments: 120,
    watchTime: 1400,
    subscribersGained: 450,
    estimatedEffort: 2,
    format: 'Shorts'
  },
  {
    id: '3',
    title: 'My Morning Routine (Uncut)',
    publishDate: '2023-10-10',
    duration: 900,
    views: 12000,
    likes: 800,
    comments: 90,
    watchTime: 3000,
    subscribersGained: 120,
    estimatedEffort: 8,
    format: 'Talking Head'
  },
  {
    id: '4',
    title: 'Deep Dive: AI in 2024',
    publishDate: '2023-10-15',
    duration: 1800,
    views: 35000,
    likes: 2900,
    comments: 670,
    watchTime: 18000,
    subscribersGained: 2100,
    estimatedEffort: 55,
    format: 'Deep Dive'
  },
  {
    id: '5',
    title: 'The Future of Remote Work',
    publishDate: '2023-10-20',
    duration: 1100,
    views: 22000,
    likes: 1500,
    comments: 210,
    watchTime: 8000,
    subscribersGained: 560,
    estimatedEffort: 30,
    format: 'Talking Head'
  }
];

export const SYSTEM_PROMPT = `
You are AI Chief of Staff for YouTube. Your mission is to maximize sustainable growth and prevent burnout.
You analyze creator data and provide calm, ROI-driven executive advice.

OUTPUT FORMAT (JSON):
{
  "burnoutRisk": "Low" | "Medium" | "High",
  "keyInsights": ["string"],
  "roiFindings": [{ "label": "string", "value": "string", "isPositive": boolean }],
  "recommendations": ["string"],
  "sustainablePlan": "string",
  "energySaved": "string"
}

Principles:
- Sustainability > speed
- Rest is leverage
- Less content != less growth
- Burnout prevention = revenue protection
`;
