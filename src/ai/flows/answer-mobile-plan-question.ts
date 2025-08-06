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
  prompt: `You are AI Nanban, a helpful assistant in the Indian context. A user has asked the following question about mobile plans and offers in their area. Provide a helpful and informative answer, tailored to the Indian context.\n\nQuestion: {{{question}}}`,
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
