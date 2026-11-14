"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import type { Book } from "@/lib/types";

export default function BorrowButton({ book }: { book: Book }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);
  const available = book.copies > 0;

  async function handleConfirm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book._id, userEmail: user.email }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to borrow the book");
      }

      toast.success("Book borrowed! You can keep it for 7 days.");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
      dialogRef.current?.close();
    }
  }

  return (
    <>
      <button
        type="button"
        disabled={!available}
        onClick={() => dialogRef.current?.showModal()}
        className="btn btn-primary btn-lg w-full md:w-auto"
      >
        {available ? "Borrow This Book" : "Not Available"}
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="mb-1 text-xl font-bold">Borrow this book</h3>
          <p className="mb-4 text-sm text-base-content/70">
            {book.title} by {book.author}
          </p>

          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="borrowName"
              >
                Your Name
              </label>
              <input
                id="borrowName"
                type="text"
                value={user?.name ?? ""}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="borrowEmail"
              >
                Your Email
              </label>
              <input
                id="borrowEmail"
                type="email"
                value={user?.email ?? ""}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => dialogRef.current?.close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Borrowing..." : "Confirm Borrow"}
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </>
  );
}