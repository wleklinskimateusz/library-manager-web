import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BooksFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen justify-center max-w-sm mx-auto gap-4">
      <Link
        href="/books"
        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Books
      </Link>
      {children}
    </div>
  );
}
