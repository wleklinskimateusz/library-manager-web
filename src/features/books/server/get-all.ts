import { ApiClient } from "@/server/api-client";
import { z } from "zod";
import { bookSchema } from "../schema/book";

export async function getAllBooks({
  page = 1,
  pageSize = 10,
  search = "",
}: {
  page: number | undefined;
  pageSize: number | undefined;
  search: string | undefined;
}) {
  const apiClient = new ApiClient();

  const { data: books, pagination } = await apiClient.get(
    `/books?page=${page}&pageSize=${pageSize}&search=${search}`,
    z.object({
      data: z.array(bookSchema),
      pagination: z.object({
        total: z.number(),
        page: z.number(),
        pageSize: z.number(),
      }),
    }),
    {
      cache: "force-cache",
      next: {
        tags: ["books"],
      },
    }
  );
  return { books, pagination };
}
