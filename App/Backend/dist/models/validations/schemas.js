// App/Backend/src/models/validations/schemas.ts
import z from "zod";
export const userSchema = z.object({
    ID: z.string().uuid().optional(),
    MAIL: z.string().email().trim(),
    PASS_HASH: z.string(),
    /*.regex(/!@#$%^&*()/, "Debe contener almenos un caracter especial"),*/
    CREATED_AT: z.date().optional(),
});
export const loginSchema = z.object({
    MAIL: z.string().email().trim(),
    PASS_HASH: z.string(),
});
export function validateUser(obj) {
    return userSchema.safeParse(obj);
}
export function validateLogin(obj) {
    return loginSchema.safeParse(obj);
}
