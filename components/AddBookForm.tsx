"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SectionHeading from "@/components/SectionHeading";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

async function uploadImage(file: File): Promise<string> {
  const data = new FormData();
  data.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body: data }
  );
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error("Image upload failed");
  }
  return json.data.display_url as string;
}

export default function AddBookForm() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    const file = form.get("image") as File;
    if (!file || file.size === 0) {
      toast.error("Please choose a book image");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("The selected file is not an image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      return;
    }

    const copies = Number(form.get("copies"));
    if (!Number.isInteger(copies) || copies < 1) {
      toast.error("Total copies must be at least 1");
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage(file);

      const book = {
        title: String(form.get("title")).trim(),
        author: String(form.get("author")).trim(),
        category: String(form.get("category")),
        image: imageUrl,
        description: String(form.get("description")).trim(),
        copies,
        userName: user?.name,
        userEmail: user?.email,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (!res.ok) {
        throw new Error("Failed to save the book");
      }

      toast.success("Book added successfully!");
      formElement.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <SectionHeading
        title="Add a New Book"
        subtitle="Share a book with other readers of BookNook."
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm md:p-8"
      >
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="title">
            Book Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Enter the book title"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="author">
            Author Name
          </label>
          <input
            id="author"
            name="author"
            type="text"
            required
            placeholder="Enter the author name"
            className="input input-bordered w-full"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue=""
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="copies">
              Total Copies
            </label>
            <input
              id="copies"
              name="copies"
              type="number"
              min={1}
              step={1}
              required
              placeholder="e.g. 3"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="image">
            Book Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor="description"
          >
            Short Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            placeholder="Write a short description of the book"
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="userName">
              Your Name
            </label>
            <input
              id="userName"
              type="text"
              value={user?.name ?? ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="userEmail"
            >
              Your Email
            </label>
            <input
              id="userEmail"
              type="email"
              value={user?.email ?? ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Adding book..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}