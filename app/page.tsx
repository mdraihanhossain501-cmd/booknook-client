import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import HowItWorks from "@/components/HowItWorks";
import TopCategories from "@/components/TopCategories";
import BookCard from "@/components/BookCard";
import SectionHeading from "@/components/SectionHeading";
import type { Book } from "@/lib/types";

async function getLatestBooks(): Promise<Book[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books?sort=newest&limit=6`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const books = await getLatestBooks();

  return (
    <main className="flex-1">
      <HeroSlider />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          title="New Arrivals"
          subtitle="The latest books added by our readers."
        />

        {books.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-base-content/70">
            No books have been added yet. Be the first to add one!
          </p>
        )}

        <div className="mt-10 text-center">
          <Link href="/books" className="btn btn-primary btn-lg">
            See All Books
          </Link>
        </div>
      </section>

      <HowItWorks />
      <TopCategories />
    </main>
  );
}