import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import SectionHeading from "@/components/SectionHeading";
import { getBooks } from "@/lib/api";

export const metadata: Metadata = {
  title: "All Books",
};

export default async function BooksPage() {
  const books = await getBooks("?sort=newest");

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12">
      <SectionHeading
        title="All Books"
        subtitle="Browse every book shared by the BookNook community."
      />

      {books.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-center text-base-content/70">
          No books have been added yet.
        </p>
      )}
    </main>
  );
}