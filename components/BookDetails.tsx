import Link from "next/link";
import type { Book } from "@/lib/types";
import BorrowButton from "@/components/BorrowButton";

export default function BookDetails({ book }: { book: Book }) {
    const available = book.copies > 0;
    const addedDate = new Date(book.addedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="mx-auto w-full max-w-6xl">
            <Link
                href="/books"
                className="mb-6 inline-block text-sm font-medium text-primary hover:underline"
            >
                ← Back to All Books
            </Link>

            <div className="grid gap-8 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm md:grid-cols-2 md:p-8">
                <div className="h-96 w-full overflow-hidden rounded-xl bg-base-200 md:h-[480px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={book.image}
                        alt={book.title}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <span className="badge badge-primary badge-outline">
                        {book.category}
                    </span>
                    <h1 className="text-3xl font-bold md:text-4xl">{book.title}</h1>
                    <p className="text-lg text-base-content/70">by {book.author}</p>

                    <p className="leading-relaxed text-base-content/80">
                        {book.description}
                    </p>

                    <div className="space-y-1 text-sm text-base-content/70">
                        <p>
                            <span className="font-semibold text-base-content">Added by:</span>{" "}
                            {book.userName}
                        </p>
                        <p>
                            <span className="font-semibold text-base-content">Added on:</span>{" "}
                            {addedDate}
                        </p>
                        <p>
                            <span className="font-semibold text-base-content">
                                Availability:
                            </span>{" "}
                            {available
                                ? `${book.copies} ${book.copies === 1 ? "copy" : "copies"} available`
                                : "No copies left"}
                        </p>
                    </div>

                    <div className="mt-auto pt-4">
                        <BorrowButton book={book} />
                    </div>
                </div>
            </div>
        </div>
    );
}