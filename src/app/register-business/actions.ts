'use server';

import { z } from 'zod';
import { validateBusinessSubmission } from '@/ai/flows/validate-business-submissions';

const formSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  ownerName: z.string().min(2, { message: 'Owner name must be at least 2 characters.' }),
  businessAddress: z.string().min(5, { message: 'Please enter a valid address.' }),
  city: z.enum(['Pune', 'Nagpur', 'Mumbai'], { errorMap: () => ({ message: "Please select a city." }) }),
  category: z.enum(['Restaurant', 'Electronics', 'Medical', 'Clothing', 'Services'], { errorMap: () => ({ message: "Please select a category." }) }),
  gstNumber: z.string().optional(),
  shopRegistrationNumber: z.string().optional(),
  contactNumber: z.string().regex(/^\d{10}$/, { message: 'Please enter a valid 10-digit contact number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
}

export async function registerBusiness(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = formSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const { errors } = validatedFields.error;
    return {
      message: "Invalid form data. Please check the fields below.",
      fields:  Object.fromEntries(formData.entries()),
      issues: errors.map((e) => e.message),
      success: false
    };
  }

  try {
    const aiValidation = await validateBusinessSubmission(validatedFields.data);
    
    if (!aiValidation.isValid) {
      return {
        message: `AI Validation Failed: ${aiValidation.reason || 'Submission seems incomplete or invalid.'}`,
        success: false,
        fields: validatedFields.data,
      };
    }
    
    // Here you would typically save the data to a database.
    // For now, we'll just simulate a successful submission.
    console.log('Business registered successfully:', validatedFields.data);

    return {
      message: 'Your business has been submitted for review! Our AI has given a preliminary approval. You will be notified once it is live.',
      success: true,
    };
  } catch (error) {
    console.error('Error during business registration:', error);
    return {
      message: 'An unexpected error occurred on the server. Please try again later.',
      success: false,
    };
  }
}
