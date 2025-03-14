import { Book } from "../schema/book";
import { getAllBooks } from "../server/get-all";
import { Pagination } from "@/components/pagination";
import { Search } from "@/components/search";
import Link from "next/link";
import Image from "next/image";

export async function BookList({
  page = 1,
  pageSize = 10,
  search,
}: {
  page: number | undefined;
  pageSize: number | undefined;
  search: string | undefined;
}) {
  const { books, pagination } = await getAllBooks({ page, pageSize, search });
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <Link href="/books/add">Add New Book</Link>
        <Search />
      </div>
      <ul className="flex flex-wrap gap-2">
        {books.map((book) => (
          <BookItemCard key={book.id} book={book} />
        ))}
      </ul>
      <Pagination {...pagination} />
    </div>
  );
}

const BookItemCard = ({ book }: { book: Book }) => {
  const coverUrl = getCoverUrl(book.isbn);
  return (
    <li className="flex gap-2 w-96 p-4 border rounded-md">
      <div className="w-fit">
        <Image
          src={coverUrl}
          alt={book.title}
          width={115}
          height={160}
          className="w-full h-40 object-cover rounded-md"
        />
      </div>
      <div>
        <h2 className="text-lg font-bold">{book.title}</h2>
        <p className="text-sm text-gray-500">{book.author}</p>
      </div>
    </li>
  );
};

const getCoverUrl = (isbn: string) => {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
};
