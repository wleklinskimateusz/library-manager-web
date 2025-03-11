import { z } from "zod";

export const configApiSchema = z.object({
  API_BASE_URL: z.string().default("http://localhost:8080"),
});
