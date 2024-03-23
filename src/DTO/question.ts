import { z } from 'zod';

export const createQuestionBodySchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required',
  }),
  content: z.string({
    invalid_type_error: 'Content must be a string',
    required_error: 'Content is required',
  }),
});

export type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;
