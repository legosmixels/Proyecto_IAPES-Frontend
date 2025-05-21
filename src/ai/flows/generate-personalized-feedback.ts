'use server';

/**
 * @fileOverview Generates personalized feedback and study recommendations based on IAPES simulation test results.
 *
 * - generatePersonalizedFeedback - A function that generates personalized feedback.
 * - PersonalizedFeedbackInput - The input type for the generatePersonalizedFeedback function.
 * - PersonalizedFeedbackOutput - The return type for the generatePersonalizedFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFeedbackInputSchema = z.object({
  testResults: z
    .string()
    .describe('The IAPES simulation test results, provided as a string.'),
  userGoals: z
    .string()
    .describe('The user goals and aspirations related to the test.'),
});
export type PersonalizedFeedbackInput = z.infer<typeof PersonalizedFeedbackInputSchema>;

const PersonalizedFeedbackOutputSchema = z.object({
  feedback: z
    .string()
    .describe('Personalized feedback based on the test results and user goals.'),
  recommendations: z
    .string()
    .describe('Study recommendations to improve performance in specific areas.'),
});
export type PersonalizedFeedbackOutput = z.infer<typeof PersonalizedFeedbackOutputSchema>;

export async function generatePersonalizedFeedback(
  input: PersonalizedFeedbackInput
): Promise<PersonalizedFeedbackOutput> {
  return generatePersonalizedFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFeedbackPrompt',
  input: {schema: PersonalizedFeedbackInputSchema},
  output: {schema: PersonalizedFeedbackOutputSchema},
  prompt: `You are an expert IAPES (pre-cifes) test advisor.

  Based on the user's test results and goals, provide personalized feedback and study recommendations.

  Test Results: {{{testResults}}}
  User Goals: {{{userGoals}}}

  Provide feedback that is specific, actionable, and encouraging.  Focus on areas where the user can improve and suggest concrete steps they can take to enhance their understanding and skills.

  Format your response as follows:

  Feedback: [Personalized feedback based on the test results and user goals]
  Recommendations: [Study recommendations to improve performance in specific areas]
  `,
});

const generatePersonalizedFeedbackFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedFeedbackFlow',
    inputSchema: PersonalizedFeedbackInputSchema,
    outputSchema: PersonalizedFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
