import { z } from "zod";

export function getConfig<T extends z.ZodSchema>(configSchema: T) {
  return configSchema.parse(process.env);
}
