import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce
    .number({
      invalid_type_error: 'PORT must be a number',
    })
    .default(3001),
  DATABASE_URL: z
    .string({
      invalid_type_error: 'DATABASE_URL must be a string',
      required_error: 'DATABASE_URL is required',
    })
    .url({
      message: 'DATABASE_URL must be a valid URL',
    }),
});

export type Env = z.infer<typeof envSchema>;
