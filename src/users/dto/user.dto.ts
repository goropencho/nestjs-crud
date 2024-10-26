import { z } from 'zod';

export const CreateUserSchema = z.object({
  username: z.string().min(1),
  age: z.number().nonnegative(),
  hobbies: z.array(z.string().min(1)),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial();

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
