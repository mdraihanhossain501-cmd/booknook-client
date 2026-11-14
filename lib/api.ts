import type { Book } from "@/lib/types";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getBooks(query = ""): Promise<Book[]> {
  try {
    const res = await fetch(`${API}/books${query}`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function getBook(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`${API}/books/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}