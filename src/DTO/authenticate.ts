import { z } from 'zod';

export const authenticateBodySchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  password: z.string({
    required_error: 'Password is required',
  }),
});

export type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

export const tokenSchema = z.object({
  sub: z.string().uuid(),
});

export type TokenSchema = z.infer<typeof tokenSchema>;
