import z from "zod";

export const userSchema = z.object({
  ID: z.string().uuid().optional(),
  MAIL: z.string().email().trim(),
  PASS: z.string(),
  /*.regex(/!@#$%^&*()/, "Debe contener almenos un caracter especial"),*/
});

export const loginSchema = z.object({
  MAIL: z.string().email().trim(),
  PASS: z.string(),
});

export function validateUser(obj: object) {
  return userSchema.safeParse(obj);
}

export function validateLogin(obj: object) {
  return loginSchema.safeParse(obj);
}
