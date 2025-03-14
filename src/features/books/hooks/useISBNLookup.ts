import { z } from "zod";
import { useState } from "react";

const lookupBookSchema = z.object({
  title: z.string(),
  authors: z.array(z.string().nullable()),
  publishedAt: z.string(),
});

export async function fetchLookup(isbn: string) {
  const response = await fetch(`/books/api/lookup/${isbn}`, {
    cache: "force-cache",
  });
  if (!response.ok) return null;
  const data = lookupBookSchema.parse(await response.json());
  return data;
}

export function useISBNLookup({
  onError,
}: {
  onError?: (error: Error) => void;
}) {
  const [isLookupLoading, setIsLookupLoading] = useState(false);

  const getLookupValues = async (isbn: string) => {
    setIsLookupLoading(true);
    try {
      const data = await fetchLookup(isbn);
      if (!data) throw new Error("No data found");
      return data;
    } catch (e) {
      console.error(e);
      onError?.(e as Error);
    } finally {
      setIsLookupLoading(false);
    }
  };

  return { isLookupLoading, getLookupValues };
}
