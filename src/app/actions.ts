'use server';

import { answerMobilePlanQuestion } from '@/ai/flows/answer-mobile-plan-question';
import { predictSignalStrength, PredictSignalStrengthOutput } from '@/ai/flows/predict-signal-strength';

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

/**
 * Gets AI-powered signal strength predictions for a given location.
 * @param latitude The latitude of the location.
 * @param longitude The longitude of the location.
 * @returns A promise that resolves to the signal strength predictions.
 */
export async function getSignalPredictions(latitude: number, longitude: number): Promise<PredictSignalStrengthOutput> {
    try {
        const response = await predictSignalStrength({ latitude, longitude });
        return response;
    } catch (error) {
        console.error("Signal Prediction Error:", error);
        throw new Error("I'm sorry, but I encountered an error while predicting the signal strength. Please try again.");
    }
}
