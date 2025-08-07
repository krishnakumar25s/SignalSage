'use server';

import { answerMobilePlanQuestion } from '@/ai/flows/answer-mobile-plan-question';
import { predictSignalStrength, PredictSignalStrengthOutput } from '@/ai/flows/predict-signal-strength';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: Timestamp;
}

/**
 * Gets an AI-generated response for a user's question about mobile plans and saves the conversation.
 * @param question The user's question.
 * @param userId The ID of the current user.
 * @returns A promise that resolves to the AI's answer as a string.
 */
export async function getAIResponse(question: string, userId: string): Promise<string> {
  if (!question) {
    return "Please provide a question.";
  }
  if (!userId) {
    // This should not happen if the user is logged in
    return "User not authenticated.";
  }

  try {
    // Save user message
    const userMessage: Omit<Message, 'id'> = { role: 'user', content: question, createdAt: serverTimestamp() as Timestamp };
    await addDoc(collection(db, 'users', userId, 'chats'), userMessage);
    
    // Get AI response
    const response = await answerMobilePlanQuestion({ question });
    
    // Save AI response
    const assistantMessage: Omit<Message, 'id'> = { role: 'assistant', content: response.answer, createdAt: serverTimestamp() as Timestamp };
    await addDoc(collection(db, 'users', userId, 'chats'), assistantMessage);

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

/**
 * Retrieves the chat history for a given user.
 * @param userId The ID of the user.
 * @returns A promise that resolves to an array of chat messages.
 */
export async function getChatHistory(userId: string): Promise<Message[]> {
  if (!userId) {
    return [];
  }
  try {
    const q = query(collection(db, 'users', userId, 'chats'), orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(q);
    const history: Message[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
    return history;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
}
