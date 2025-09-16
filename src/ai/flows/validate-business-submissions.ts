'use server';

/**
 * @fileOverview Business submission validation flow using an LLM.
 *
 * - validateBusinessSubmission - Validates a business submission for completeness and potential fraud.
 * - ValidateBusinessSubmissionInput - The input type for the validateBusinessSubmission function.
 * - ValidateBusinessSubmissionOutput - The return type for the validateBusinessSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateBusinessSubmissionInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  ownerName: z.string().describe('The name of the business owner.'),
  businessAddress: z.string().describe('The address of the business.'),
  city: z.string().describe('The city where the business is located.'),
  category: z.string().describe('The category of the business (e.g., Restaurant, Electronics).'),
  gstNumber: z.string().optional().describe('The GST number of the business (if applicable).'),
  shopRegistrationNumber: z
    .string()
    .optional()
    .describe('The shop registration number of the business (if applicable).'),
  contactNumber: z.string().describe('The contact number of the business.'),
  email: z.string().email().describe('The email address of the business.'),
});
export type ValidateBusinessSubmissionInput = z.infer<
  typeof ValidateBusinessSubmissionInputSchema
>;

const ValidateBusinessSubmissionOutputSchema = z.object({
  isValid: z
    .boolean()
    .describe(
      'Whether the business submission is valid and does not appear to be fraudulent.'
    ),
  reason: z
    .string()
    .optional()
    .describe('The reason why the business submission is not valid.'),
});
export type ValidateBusinessSubmissionOutput = z.infer<
  typeof ValidateBusinessSubmissionOutputSchema
>;

export async function validateBusinessSubmission(
  input: ValidateBusinessSubmissionInput
): Promise<ValidateBusinessSubmissionOutput> {
  return validateBusinessSubmissionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateBusinessSubmissionPrompt',
  input: {schema: ValidateBusinessSubmissionInputSchema},
  output: {schema: ValidateBusinessSubmissionOutputSchema},
  prompt: `You are an expert in identifying fraudulent business submissions.
  Given the following business submission data, determine if the submission is valid.
  Consider factors such as completeness of information, consistency of data, and any red flags that may indicate fraud.

  Business Name: {{{businessName}}}
  Owner Name: {{{ownerName}}}
  Business Address: {{{businessAddress}}}
  City: {{{city}}}
  Category: {{{category}}}
  GST Number: {{{gstNumber}}}
  Shop Registration Number: {{{shopRegistrationNumber}}}
  Contact Number: {{{contactNumber}}}
  Email: {{{email}}}

  Respond with a JSON object. The "isValid" field should be true if the submission appears legitimate, and false otherwise.
  If "isValid" is false, provide a brief "reason" explaining why the submission is considered invalid.
  Do not output anything other than the JSON object.
  `,
});

const validateBusinessSubmissionFlow = ai.defineFlow(
  {
    name: 'validateBusinessSubmissionFlow',
    inputSchema: ValidateBusinessSubmissionInputSchema,
    outputSchema: ValidateBusinessSubmissionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
