import type { FieldErrors, Resolver } from "react-hook-form";
import type { z } from "zod";

export function zodResolver<TSchema extends z.ZodType<Record<string, unknown>>>(
  schema: TSchema
): Resolver<z.infer<TSchema>> {
  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const flatErrors = result.error.issues.reduce<Record<string, { type: string; message: string }>>((accumulator, issue) => {
      const key = issue.path.join(".");
      accumulator[key] = {
        type: issue.code,
        message: issue.message
      };
      return accumulator;
    }, {});

    return { values: {}, errors: flatErrors as unknown as FieldErrors<z.infer<TSchema>> };
  };
}
