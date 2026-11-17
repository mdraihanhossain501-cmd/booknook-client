import Link from "next/link";
import type { Book } from "@/lib/types";
import FadeIn from "@/components/FadeIn";

export default function BookCard({ book }: { book: Book }) {
  return (
    <FadeIn className="h-full">
      <div className="card h-full border border-base-300 bg-base-100 shadow-sm">
        <figure className="h-64 w-full bg-base-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </figure>
        <div className="card-body">
          <span className="badge badge-primary badge-outline">
            {book.category}
          </span>
          <h3 className="card-title line-clamp-1">{book.title}</h3>
          <p className="line-clamp-1 text-sm text-base-content/70">
            by {book.author}
          </p>
          <div className="card-actions mt-auto pt-2">
            <Link href={`/books/${book._id}`} className="btn btn-primary w-full">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}