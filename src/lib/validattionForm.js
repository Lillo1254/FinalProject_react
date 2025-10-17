import z from "zod";

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;
const passwordError = "La password deve avere almeno una lettera maiuscola, una minuscola e un numero";

export const FormSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    userName: z.string().min(1),
    password: z.string().min(8).regex(passwordRegex, passwordError),
})

export const ConfirmSchema = FormSchema.refine((data) => data);

export function getFieldError(property, value) {
  const fieldSchema = FormSchema.pick({ [property]: true });
  const { error } = fieldSchema.safeParse({ [property]: value });
  return error 
    ? error.issues.map((issue) => issue.message).join(", ")
    : undefined;
}


export const getErrors = (error) => error.issues.reduce((all, issue) => {
    const path = issue.path.join("");
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
})

