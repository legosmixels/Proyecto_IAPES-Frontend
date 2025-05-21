
"use server";

import { z } from "zod";
import { generatePersonalizedFeedback, PersonalizedFeedbackInput } from "@/ai/flows/generate-personalized-feedback";

const FormSchema = z.object({
  testResults: z.string().min(50, {
    message: "Test results must be at least 50 characters.",
  }).max(5000, { message: "Test results must be at most 5000 characters." }),
  userGoals: z.string().min(20, {
    message: "User goals must be at least 20 characters.",
  }).max(1000, { message: "User goals must be at most 1000 characters." }),
});

export type FeedbackState = {
  message?: string | null;
  feedback?: string | null;
  recommendations?: string | null;
  errors?: {
    testResults?: string[];
    userGoals?: string[];
    form?: string[]; 
  } | null;
};

export async function handleGenerateFeedback(
  prevState: FeedbackState,
  formData: FormData
): Promise<FeedbackState> {
  const validatedFields = FormSchema.safeParse({
    testResults: formData.get("testResults"),
    userGoals: formData.get("userGoals"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  const inputData: PersonalizedFeedbackInput = validatedFields.data;

  try {
    const result = await generatePersonalizedFeedback(inputData);
    if (result.feedback && result.recommendations) {
      return {
        message: "Feedback generated successfully!",
        feedback: result.feedback,
        recommendations: result.recommendations,
        errors: null,
      };
    } else {
      return {
        message: "AI could not generate feedback with the provided input.",
        errors: { form: ["AI could not generate feedback with the provided input."] },
      };
    }
  } catch (error) {
    console.error("Error generating feedback:", error);
    let errorMessage = "An unexpected error occurred while generating feedback.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return {
      message: errorMessage,
      errors: { form: [errorMessage] },
    };
  }
}
