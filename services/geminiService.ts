
// services/geminiService.ts
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { API_KEY } from '../constants';

/**
 * Sends a text prompt to the Gemini API and returns the generated text.
 * @param prompt The user's text prompt.
 * @returns A promise that resolves with the generated text.
 */
export const generateTextWithGemini = async (prompt: string): Promise<string> => {
  if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY') {
    console.error('API_KEY is not set. Please configure it in constants.ts or environment variables.');
    return 'Error: Gemini API Key is not configured.';
  }

  // Create a new GoogleGenAI instance right before making an API call
  // to ensure it always uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Using a suitable model for text tasks
      contents: prompt,
      config: {
        systemInstruction: 'You are a helpful study assistant for university students. Provide concise and accurate information, and be polite.',
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 500, // Limit output for concise responses
        thinkingConfig: { thinkingBudget: 100 }, // Allocate thinking budget for flash model
      },
    });

    const text = response.text;
    if (!text) {
      console.warn('Gemini API returned an empty response text.');
      return 'No response from AI.';
    }
    return text;

  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    if (error.message && error.message.includes("Requested entity was not found")) {
      // This is a specific error often related to API key issues for Veo models,
      // but good to handle generically if the key becomes invalid for other models too.
      // In a real app with Veo, you'd trigger window.aistudio.openSelectKey() here.
      return 'Error: Gemini API key might be invalid or environment issue. Please check API key configuration.';
    }
    return `Error: Failed to get response from AI. ${error.message || 'Unknown error.'}`;
  }
};
