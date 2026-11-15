"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "@/lib/imgbb";
import type { Book } from "@/lib/types";
import { authFetch } from "@/lib/api-client";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

type Props = {
  book: Book;
  onClose: () => void;
  onSaved: (book: Book) => void;
};

export default function EditBookModal({ book, onClose, onSaved }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const copies = Number(form.get("copies"));
    if (!Number.isInteger(copies) || copies < 0) {
      toast.error("Total copies must be 0 or more");
      return;
    }

    const file = form.get("image") as File;
    const hasNewImage = file && file.size > 0;
    if (hasNewImage) {
      if (!file.type.startsWith("image/")) {
        toast.error("The selected file is not an image");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be smaller than 5 MB");
        return;
      }
    }

    setLoading(true);
    try {
      const imageUrl = hasNewImage ? await uploadImage(file) : book.image;

      const updates = {
        title: String(form.get("title")).trim(),
        author: String(form.get("author")).trim(),
        category: String(form.get("category")),
        image: imageUrl,
        description: String(form.get("description")).trim(),
        copies,
      };

      const res = await authFetch(`/books/${book._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update the book");

      toast.success("Book updated successfully!");
      onSaved({ ...book, ...updates });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="mb-4 text-xl font-bold">Edit book</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="editTitle">
              Book Title
            </label>
            <input
              id="editTitle"
              name="title"
              type="text"
              required
              defaultValue={book.title}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="editAuthor">
              Author Name
            </label>
            <input
              id="editAuthor"
              name="author"
              type="text"
              required
              defaultValue={book.author}
              className="input input-bordered w-full"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="editCategory"
              >
                Category
              </label>
              <select
                id="editCategory"
                name="category"
                required
                defaultValue={book.category}
                className="select select-bordered w-full"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="editCopies"
              >
                Total Copies
              </label>
              <input
                id="editCopies"
                name="copies"
                type="number"
                min={0}
                step={1}
                required
                defaultValue={book.copies}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="editImage">
              Book Image
            </label>
            <div className="mb-2 h-24 w-16 overflow-hidden rounded-md bg-base-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.image}
                alt={book.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <input
              id="editImage"
              name="image"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
            <p className="mt-1 text-xs text-base-content/60">
              Leave empty to keep the current image.
            </p>
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="editDescription"
            >
              Short Description
            </label>
            <textarea
              id="editDescription"
              name="description"
              required
              rows={4}
              defaultValue={book.description}
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      <div
        className="modal-backdrop"
        role="presentation"
        onClick={loading ? undefined : onClose}
      />
    </div>
  );
}