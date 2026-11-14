"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SectionHeading from "@/components/SectionHeading";
import type { Borrow } from "@/lib/types";

const API = process.env.NEXT_PUBLIC_API_URL;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MyBorrows() {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(
          `${API}/borrows?email=${encodeURIComponent(email)}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to load");
        const data: Borrow[] = await res.json();
        if (!cancelled) setBorrows(data);
      } catch {
        if (!cancelled) toast.error("Failed to load your borrowed books");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [email]);

  async function handleReturn(id: string) {
    setReturningId(id);
    try {
      const res = await fetch(`${API}/borrows/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to return the book");

      setBorrows((prev) => prev.filter((borrow) => borrow._id !== id));
      toast.success("Book returned successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setReturningId(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <SectionHeading
        title="My Borrows"
        subtitle="The books you have borrowed. Return them when you are done."
      />

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : borrows.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-base-content/70">
            You have not borrowed any books yet.
          </p>
          <Link href="/books" className="btn btn-primary">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((borrow) => (
                <tr key={borrow._id}>
                  <td>
                    <div className="h-20 w-14 overflow-hidden rounded-md bg-base-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={borrow.bookImage}
                        alt={borrow.bookTitle}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </td>
                  <td className="font-semibold">{borrow.bookTitle}</td>
                  <td>{formatDate(borrow.borrowDate)}</td>
                  <td>{formatDate(borrow.returnDate)}</td>
                  <td className="text-right">
                    <button
                      type="button"
                      onClick={() => handleReturn(borrow._id)}
                      disabled={returningId === borrow._id}
                      className="btn btn-primary btn-sm"
                    >
                      {returningId === borrow._id
                        ? "Returning..."
                        : "Return Book"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}