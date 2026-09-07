import { z } from 'zod'

export const registrationSchema = z.object({
  trainerName: z.string().trim().min(1).max(50),
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(12, 'Password must contain at least 12 characters').max(128),
  confirmPassword: z.string().max(128),
  betaCode: z.string().min(1).max(256),
  kidMode: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
