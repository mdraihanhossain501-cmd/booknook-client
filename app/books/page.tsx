import type { Metadata } from "next";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import SectionHeading from "@/components/SectionHeading";
import { getBooks } from "@/lib/api";

export const metadata: Metadata = {
  title: "All Books",
};

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BooksPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const active = categories.includes(category ?? "") ? category : undefined;
  const books = await getBooks(
    `?sort=newest${active ? `&category=${active}` : ""}`
  );

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12">
      <SectionHeading
        title="All Books"
        subtitle="Browse every book shared by the BookNook community."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <Link
          href="/books"
          className={`btn btn-sm ${active ? "btn-outline btn-primary" : "btn-primary"}`}
        >
          All
        </Link>
        {categories.map((name) => (
          <Link
            key={name}
            href={`/books?category=${name}`}
            className={`btn btn-sm ${active === name ? "btn-primary" : "btn-outline btn-primary"}`}
          >
            {name}
          </Link>
        ))}
      </div>

      {books.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-center text-base-content/70">
          {active
            ? `No ${active} books have been added yet.`
            : "No books have been added yet."}
        </p>
      )}
    </main>
  );
}