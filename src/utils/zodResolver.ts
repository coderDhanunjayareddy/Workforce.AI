import type { FieldErrors, Resolver } from "react-hook-form";
import type { z } from "zod";

export function zodResolver<TSchema extends z.ZodType<Record<string, unknown>>>(schema: TSchema): Resolver<z.infer<TSchema>> {
  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) return { values: result.data, errors: {} };
    const errors = Object.fromEntries(result.error.issues.map((issue) => [issue.path.join("."), { type: issue.code, message: issue.message }]));
    return { values: {}, errors: errors as FieldErrors<z.infer<TSchema>> };
  };
}
