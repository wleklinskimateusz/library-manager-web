import Link from "next/link";
import { getAllBooks } from "./server/get-all";

export async function BookList({
  page = 1,
  pageSize = 10,
}: {
  page: number | undefined;
  pageSize: number | undefined;
}) {
  const { books, pagination } = await getAllBooks({ page, pageSize });
  return (
    <div>
      {books.map((book) => book.title)}
      <Pagination
        total={pagination.total}
        page={pagination.page}
        pageSize={pagination.pageSize}
      />
    </div>
  );
}

function Pagination({
  total,
  page,
  pageSize,
}: {
  total: number;
  page: number;
  pageSize: number;
}) {
  const totalPages = Math.ceil(total / pageSize);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  return (
    <div>
      {hasPreviousPage && (
        <Link href={{ query: { page: page - 1, pageSize } }}>Previous</Link>
      )}
      {hasNextPage && (
        <Link href={{ query: { page: page + 1, pageSize } }}>Next</Link>
      )}
      {Array.from({ length: totalPages }).map((_, index) => (
        <Link key={index} href={{ query: { page: index + 1, pageSize } }}>
          {index + 1}
        </Link>
      ))}
    </div>
  );
}
