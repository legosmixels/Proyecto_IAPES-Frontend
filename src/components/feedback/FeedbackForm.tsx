
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateFeedback, type FeedbackState } from "@/lib/actions/feedbackActions";
import { useFormState } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";

const FormSchema = z.object({
  testResults: z.string().min(50, {
    message: "Test results must be at least 50 characters.",
  }).max(5000, { message: "Test results must be at most 5000 characters." }),
  userGoals: z.string().min(20, {
    message: "User goals must be at least 20 characters.",
  }).max(1000, { message: "User goals must be at most 1000 characters." }),
});

const initialState: FeedbackState = {
  message: null,
  feedback: null,
  recommendations: null,
  errors: null,
};

export default function FeedbackForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(handleGenerateFeedback, initialState);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      testResults: "",
      userGoals: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // The formAction will be called by useFormState
  }
  
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center text-primary text-shadow-neon-primary">
          <Sparkles className="h-6 w-6 mr-2 text-primary text-shadow-neon-primary" />
          Get Personalized AI Feedback
        </CardTitle>
        <CardDescription>
          Enter your IAPES simulation test results and your study goals to receive tailored advice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="testResults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Test Results</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your performance, scores, and areas you struggled with..."
                      className="resize-y min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Goals & Aspirations</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What do you hope to achieve? Which subjects or careers are you aiming for?"
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Feedback
            </Button>
          </form>
        </Form>

        {state?.message && !state.errors && !state.feedback && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-md">
            {state.message}
          </div>
        )}

        {state?.errors && (
           <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-md">
            <p className="font-semibold">Error:</p>
            <ul className="list-disc list-inside">
              {Object.entries(state.errors).map(([key, value]) => (
                value && value.map((errorMsg: string, index: number) => (
                    <li key={`${key}-${index}`}>{errorMsg}</li>
                ))
              ))}
              {state.message && !state.errors.form && <li>{state.message}</li>}
            </ul>
          </div>
        )}

        {state?.feedback && state?.recommendations && (
          <div className="mt-8 space-y-6">
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-xl text-primary text-shadow-neon-primary">Personalized Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{state.feedback}</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-xl text-primary text-shadow-neon-primary">Study Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{state.recommendations}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
