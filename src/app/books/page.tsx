import { BookList } from "@/features/books/components/book-list";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; pageSize: string; search: string }>;
}) {
  const { page, pageSize, search } = await searchParams;
  return (
    <BookList
      page={parseInt(page)}
      pageSize={parseInt(pageSize)}
      search={search}
    />
  );
}
