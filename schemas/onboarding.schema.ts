import { z } from 'zod';

export const accountFormSchema = z
  .object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof accountFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof accountFormSchema>;

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
  role: z.string().min(1, 'Role required'),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export const profileFormSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),

  role: z.string().min(2, 'Please enter your role'),

  teamSize: z.enum(['solo', '2-10', '11-50', '50+'], {
    message: 'Please select team size',
  }),
});

export const workspaceFormSchema = z.object({
  name: z.string().min(2, 'Workspace name must be at least 2 characters'),
});

export const teammateFormSchema = z.object({
  email: z.string().email('Invalid email').optional(),
});

export const focusFormSchema = z.object({
  focusId: z.string().min(1, 'Please select a focus area'),
});
