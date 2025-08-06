'use server';

/**
 * @fileOverview This file defines a Genkit flow for predicting signal strength for various mobile operators.
 *
 * - predictSignalStrength - A function that takes a location and returns signal predictions.
 * - PredictSignalStrengthInput - The input type for the predictSignalStrength function.
 * - PredictSignalStrengthOutput - The return type for the predictSignalStrength function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PredictSignalStrengthInputSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
});
export type PredictSignalStrengthInput = z.infer<typeof PredictSignalStrengthInputSchema>;

const OperatorPredictionSchema = z.object({
    operator: z.string().describe('The name of the mobile operator (e.g., Jio, Airtel, Vi, BSNL).'),
    rating: z.number().min(1).max(5).describe('The predicted signal quality rating from 1 (worst) to 5 (best).'),
    downloadSpeed: z.number().describe('The predicted download speed in Mbps.'),
    uploadSpeed: z.number().describe('The predicted upload speed in Mbps.'),
});

const PredictSignalStrengthOutputSchema = z.object({
  predictions: z.array(OperatorPredictionSchema),
});
export type PredictSignalStrengthOutput = z.infer<typeof PredictSignalStrengthOutputSchema>;


export async function predictSignalStrength(input: PredictSignalStrengthInput): Promise<PredictSignalStrengthOutput> {
  return predictSignalStrengthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictSignalStrengthPrompt',
  input: { schema: PredictSignalStrengthInputSchema },
  output: { schema: PredictSignalStrengthOutputSchema },
  prompt: `You are a telecom signal prediction expert for India. Based on the provided latitude and longitude, predict the signal quality for the main mobile network operators: Jio, Airtel, Vi, and BSNL.

Consider typical coverage patterns, population density, and infrastructure variability across India. Provide a rating from 1 to 5, where 5 is the best. Also provide a realistic download and upload speed in Mbps.

Return a JSON object containing a 'predictions' array. Each object in the array should have fields for 'operator', 'rating', 'downloadSpeed', and 'uploadSpeed'.

Location:
Latitude: {{{latitude}}}
Longitude: {{{longitude}}}
`,
});

const predictSignalStrengthFlow = ai.defineFlow(
  {
    name: 'predictSignalStrengthFlow',
    inputSchema: PredictSignalStrengthInputSchema,
    outputSchema: PredictSignalStrengthOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
