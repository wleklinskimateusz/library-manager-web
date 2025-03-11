import { Book } from "../schema/book";
import { getAllBooks } from "../server/get-all";
import { Pagination } from "@/components/pagination";

export async function BookList({
  page = 1,
  pageSize = 10,
}: {
  page: number | undefined;
  pageSize: number | undefined;
}) {
  const { books, pagination } = await getAllBooks({ page, pageSize });
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <ul className="flex flex-col gap-2">
        {books.map((book) => (
          <BookItemCard key={book.id} book={book} />
        ))}
      </ul>
      <Pagination
        total={pagination.total}
        page={pagination.page}
        pageSize={pagination.pageSize}
      />
    </div>
  );
}

const BookItemCard = ({ book }: { book: Book }) => {
  return (
    <li className="flex flex-col gap-2 p-4 border rounded-md">
      <h2 className="text-lg font-bold">{book.title}</h2>
      <p className="text-sm text-gray-500">{book.author}</p>
    </li>
  );
};
