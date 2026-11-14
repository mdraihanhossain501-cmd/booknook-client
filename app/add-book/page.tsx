import type { Metadata } from "next";
import PrivateRoute from "@/components/PrivateRoute";
import AddBookForm from "@/components/AddBookForm";

export const metadata: Metadata = {
  title: "Add Book",
};

export default function AddBookPage() {
  return (
    <main className="flex-1 px-4 py-12">
      <PrivateRoute>
        <AddBookForm />
      </PrivateRoute>
    </main>
  );
}