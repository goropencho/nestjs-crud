import { EnvKeys } from '@lib/enums';
import { z } from 'zod';

export const envSchema = z.object({
  [EnvKeys.NODE_ENV]: z.enum(['development', 'staging', 'production']),
  [EnvKeys.DATABASE_URL]: z.string().url(),
  [EnvKeys.PORT]: z.coerce.number(),
  [EnvKeys.LOG_LEVEL]: z
    .enum(['debug', 'info', 'warn', 'error'])
    .default('debug'),
});

export type EnvEnum = (typeof EnvKeys)[keyof typeof EnvKeys];

export type Env = z.infer<typeof envSchema>;
