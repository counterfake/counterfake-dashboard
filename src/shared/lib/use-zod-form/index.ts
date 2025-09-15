import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * @example
 * const form = useZodForm(schema, options);
 * return (
 *    <form onSubmit={form.handleSubmit(onSubmit)}>
 *      <input
 *        type="email"
 *        {...form.register("email")}
 *      />
 *      {form.formState.errors.email && (
 *        <p className="text-red-500">{form.formState.errors.email.message}</p>
 *      )}

 *      <input
 *        type="password"
 *        {...form.register("password")}
 *      />
 *      {form.formState.errors.password && (
 *        <p className="text-red-500">{form.formState.errors.password.message}</p>
 *      )}

 *      <button type="submit">
 *        Submit
 *      </button>
    </form>
  );
 */
export function useZodForm<TSchema extends ZodType>(
  schema: TSchema,
  options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">
): UseFormReturn<z.infer<TSchema>> {
  return useForm<z.infer<TSchema>>({
    ...options,
    resolver: zodResolver(schema),
  });
}
