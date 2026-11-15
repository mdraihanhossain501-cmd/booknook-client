import type { Metadata } from "next";
import PrivateRoute from "@/components/PrivateRoute";
import MyBooks from "@/components/MyBooks";

export const metadata: Metadata = {
  title: "My Books",
};

export default function MyBooksPage() {
  return (
    <main className="flex-1 px-4 py-12">
      <PrivateRoute>
        <MyBooks />
      </PrivateRoute>
    </main>
  );
}