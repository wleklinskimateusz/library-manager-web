import { z } from "zod";

const openLibraryApi = "https://openlibrary.org";

const bookResponseSchema = z.object({
  title: z.string(),
  authors: z.array(z.object({ key: z.string() })).optional(),
  publish_date: z.string(),
});

const authorResponseSchema = z.object({
  name: z.string(),
});

export async function lookupIsbn(isbn: string) {
  const bookResponse = await fetch(`${openLibraryApi}/isbn/${isbn}`, {
    cache: "force-cache",
    headers: {
      accept: "application/json",
    },
  });

  if (!bookResponse.ok) return null;
  const bookData = bookResponseSchema.parse(await bookResponse.json());

  const authors = await Promise.all(
    bookData.authors?.map(async (author) => {
      const authorResponse = await fetch(`${openLibraryApi}${author.key}.json`);
      if (!authorResponse.ok) return null;
      const authorData = authorResponseSchema.parse(
        await authorResponse.json()
      );
      return authorData;
    }) ?? []
  );

  return {
    title: bookData.title,
    authors: authors.map((author) => (author ? author.name : null)),
    publishedAt: bookData.publish_date,
  };
}
