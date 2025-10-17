import z from "zod";

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;
const passwordError = "La password deve avere almeno una lettera maiuscola, una minuscola e un numero";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).regex(passwordRegex, passwordError),
});

export const ConfirmSchemaLogin = LoginSchema.refine((data) => data);

export const getErrors = (error) => error.issues.reduce((all, issue) => {
    const path = issue.path.join("");
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
})

export function getFieldError(property, value) {
    const { error } = LoginSchema.safeParse({ [property]: value });
    return error 
    ? error.issues.map((issues) => issues.message).join(", ") 
    : undefined;
}