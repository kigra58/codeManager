import { z } from 'zod';
import { validationMessageHandler } from '../utils/helper';


export const loginSchema = z.object({
  email: z
    .string({ required_error: validationMessageHandler("Email", "emptyField") })
    .email(validationMessageHandler("Email", "invalidField")),
  password: z
    .string({
      required_error: validationMessageHandler("Password", "emptyField"),
    })
    .min(8, validationMessageHandler("Password", "fieldLength")),
});

export const signupSchema = z.object({
  email: z
    .string({ required_error: validationMessageHandler("Email", "emptyField") })
    .email(validationMessageHandler("Email", "invalidField")),

  password: z
    .string({
      required_error: validationMessageHandler("Password", "emptyField"),
    })
    .min(8, validationMessageHandler("Password", "fieldLength")),
});