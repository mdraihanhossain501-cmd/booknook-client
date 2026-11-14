import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import BookDetails from "@/components/BookDetails";
import { getBook } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const book = await getBook(id);
  return { title: book ? book.title : "Book Not Found" };
}

export default async function BookDetailsPage({ params }: Props) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <main className="flex-1 px-4 py-12">
      <PrivateRoute>
        <BookDetails book={book} />
      </PrivateRoute>
    </main>
  );
}