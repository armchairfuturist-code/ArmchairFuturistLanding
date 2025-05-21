'use server';

import { generateIntroductoryEmail, type GenerateIntroductoryEmailInput, type GenerateIntroductoryEmailOutput } from '@/ai/flows/generate-introductory-email';
import { z } from 'zod';

const FormSchema = z.object({
  linkedinProfileUrl: z.string().url({ message: "Please enter a valid LinkedIn profile URL." }).min(1, "LinkedIn profile URL is required."),
  recentPosts: z.string().min(1, "Recent posts are required."),
  companyNews: z.string().min(1, "Company news is required."),
  tone: z.string().optional(),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: GenerateIntroductoryEmailOutput;
};

export async function submitEmailGeneration(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten();
    return {
      message: "Validation failed. Please check the fields.",
      fields: errors.fieldErrors as Record<string, string>,
      issues: errors.formErrors,
    };
  }
  
  const inputData: GenerateIntroductoryEmailInput = {
    linkedinProfileUrl: validatedFields.data.linkedinProfileUrl,
    recentPosts: validatedFields.data.recentPosts,
    companyNews: validatedFields.data.companyNews,
  };

  if (validatedFields.data.tone) {
    inputData.tone = validatedFields.data.tone;
  }

  try {
    const result = await generateIntroductoryEmail(inputData);
    if (result && result.email) {
      return { message: "Email generated successfully!", data: result };
    } else {
      return { message: "AI failed to generate an email. The result was empty." };
    }
  } catch (error) {
    console.error("Error generating email:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { message: `Email generation failed: ${errorMessage}` };
  }
}
