"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SectionHeading from "@/components/SectionHeading";
import EditBookModal from "@/components/EditBookModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import type { Book } from "@/lib/types";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MyBooks() {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!email) return;
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(
          `${API}/books?email=${encodeURIComponent(email)}&sort=newest`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to load");
        const data: Book[] = await res.json();
        if (!cancelled) setBooks(data);
      } catch {
        if (!cancelled) toast.error("Failed to load your books");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [email]);

  function handleSaved(updated: Book) {
    setBooks((prev) =>
      prev.map((book) => (book._id === updated._id ? updated : book))
    );
    setEditingBook(null);
  }

  async function handleDelete() {
    if (!deletingBook) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API}/books/${deletingBook._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete the book");

      setBooks((prev) => prev.filter((book) => book._id !== deletingBook._id));
      toast.success("Book deleted successfully!");
      setDeletingBook(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <SectionHeading
        title="My Books"
        subtitle="The books you added. Edit the details or remove a book."
      />

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : books.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-base-content/70">
            You have not added any books yet.
          </p>
          <Link href="/add-book" className="btn btn-primary">
            Add a Book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Copies</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <div className="h-20 w-14 overflow-hidden rounded-md bg-base-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={book.image}
                        alt={book.title}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </td>
                  <td className="font-semibold">{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <span className="badge badge-primary badge-outline">
                      {book.category}
                    </span>
                  </td>
                  <td>{book.copies}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingBook(book)}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingBook(book)}
                        className="btn btn-error btn-outline btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingBook && (
        <EditBookModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSaved={handleSaved}
        />
      )}

      {deletingBook && (
        <DeleteConfirmModal
          book={deletingBook}
          loading={deleting}
          onCancel={() => setDeletingBook(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}