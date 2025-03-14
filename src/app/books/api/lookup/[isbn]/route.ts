import { lookupIsbn } from "@/features/books/server/lookup-isbn";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ isbn: string }> }
) {
  const { isbn } = await params;
  try {
    const book = await lookupIsbn(isbn);
    if (!book) return new Response("Book not found", { status: 404 });
    return Response.json(book);
  } catch (error) {
    console.error(error);
    return new Response("Failed to lookup ISBN", { status: 500 });
  }
}
