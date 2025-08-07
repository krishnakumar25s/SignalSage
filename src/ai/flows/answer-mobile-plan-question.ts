'use server';
/**
 * @fileOverview This file defines a Genkit flow for answering user questions about mobile plans and offers.
 *
 * - answerMobilePlanQuestion - A function that takes a user's question as input and returns an answer about mobile plans and offers.
 * - AnswerMobilePlanQuestionInput - The input type for the answerMobilePlanQuestion function.
 * - AnswerMobilePlanQuestionOutput - The return type for the answerMobilePlanQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerMobilePlanQuestionInputSchema = z.object({
  question: z.string().describe('The user question about mobile plans and offers.'),
});
export type AnswerMobilePlanQuestionInput = z.infer<typeof AnswerMobilePlanQuestionInputSchema>;

const AnswerMobilePlanQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question about mobile plans and offers.'),
});
export type AnswerMobilePlanQuestionOutput = z.infer<typeof AnswerMobilePlanQuestionOutputSchema>;

export async function answerMobilePlanQuestion(input: AnswerMobilePlanQuestionInput): Promise<AnswerMobilePlanQuestionOutput> {
  return answerMobilePlanQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerMobilePlanQuestionPrompt',
  input: {schema: AnswerMobilePlanQuestionInputSchema},
  output: {schema: AnswerMobilePlanQuestionOutputSchema},
  prompt: `You are AI Nanban, a helpful and friendly AI assistant for telecom-related queries in India. Your goal is to provide comprehensive and detailed answers.

- When a user asks a question, provide a thorough answer with relevant details about mobile plans, operators, or concepts.
- If the user's question is a simple greeting (e.g., "hi", "hello"), respond with a warm and friendly greeting, and then ask how you can help with their telecom needs.
- If the user's query is vague, provide a general, informative response on the topic and then ask if they would like more specific details. Avoid asking a list of clarifying questions.

User's message: {{{question}}}`,
});

const answerMobilePlanQuestionFlow = ai.defineFlow(
  {
    name: 'answerMobilePlanQuestionFlow',
    inputSchema: AnswerMobilePlanQuestionInputSchema,
    outputSchema: AnswerMobilePlanQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
