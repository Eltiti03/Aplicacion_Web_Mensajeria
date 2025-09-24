import z from "zod";
export const userSchema = z.object({
    ID: z.string().uuid().optional(),
    MAIL: z.string(),
    PASS: z.string(),
});
export function validateUser(obj) {
    return userSchema.safeParse(obj);
}
