
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";
import { AnalysisResult } from "../types";

// Note: Using Gemini 3 Pro for Search Grounding capabilities
export const analyzeYouTubeChannel = async (channelId: string): Promise<AnalysisResult & { channelName: string }> => {
  // Use import.meta.env.AI_Chief_of_Staff_YouTube directly as per guidelines
const ai = new GoogleGenAI({ apiKey: import.meta.env.AI_Chief_of_Staff_YouTube });  
  const prompt = `
    Find and analyze the YouTube channel with handle or ID: ${channelId}.
    1. Use Google Search to find their most recent 5-7 videos (titles, views, estimated duration).
    2. Estimate the 'effort' for each video based on production quality (Cinematic, Talking Head, etc.).
    3. Perform a Chief of Staff ROI analysis.
    
    IMPORTANT: You MUST return a JSON object that matches the required schema.
    Also include a "channelName" field in the root of the JSON.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          channelName: { type: Type.STRING },
          burnoutRisk: { type: Type.STRING },
          keyInsights: { type: Type.ARRAY, items: { type: Type.STRING } },
          roiFindings: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                value: { type: Type.STRING },
                isPositive: { type: Type.BOOLEAN }
              },
              required: ["label", "value", "isPositive"]
            }
          },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          sustainablePlan: { type: Type.STRING },
          energySaved: { type: Type.STRING }
        },
        required: ["channelName", "burnoutRisk", "keyInsights", "roiFindings", "recommendations", "sustainablePlan", "energySaved"]
      }
    }
  });

  // response.text is a property, not a method.
  const data = JSON.parse(response.text || '{}');
  return data;
};

export const chatWithChiefOfStaff = async (history: any[], userPrompt: string, currentData: any): Promise<string> => {
  // Use import.meta.env.AI_Chief_of_Staff_YouTube directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: import.meta.env.AI_Chief_of_Staff_YouTube });
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: SYSTEM_PROMPT + "\n\nContext for current channel: " + JSON.stringify(currentData),
    }
  });

  const response = await chat.sendMessage({ message: userPrompt });
  // response.text is a property, not a method.
  return response.text || "I apologize, I couldn't process that request.";
};
