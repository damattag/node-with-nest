import { z } from 'zod';

// test
export const createAccountBodySchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required',
  }),
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email format',
    }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required',
    })
    .min(6, {
      message: 'Password must have at least 6 characters',
    }),
});

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;
