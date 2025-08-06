'use server';

import { answerMobilePlanQuestion } from '@/ai/flows/answer-mobile-plan-question';

/**
 * Gets an AI-generated response for a user's question about mobile plans.
 * @param question The user's question.
 * @returns A promise that resolves to the AI's answer as a string.
 */
export async function getAIResponse(question: string): Promise<string> {
  if (!question) {
    return "Please provide a question.";
  }
  try {
    const response = await answerMobilePlanQuestion({ question });
    return response.answer;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm sorry, but I encountered an error. Please try again.";
  }
}
